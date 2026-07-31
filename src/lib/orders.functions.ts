import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const itemSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().min(1).max(50),
  customization: z.string().max(1000).optional(),
});

const placeOrderSchema = z.object({
  customer_name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(7).max(30),
  email: z.string().trim().email().max(200).optional().or(z.literal("")),
  city: z.string().trim().min(2).max(80),
  delivery_address: z.string().trim().min(5).max(500),
  landmark: z.string().trim().max(200).optional().or(z.literal("")),
  customer_notes: z.string().trim().max(1000).optional().or(z.literal("")),
  payment_method: z.enum(["cod", "whatsapp"]),
  items: z.array(itemSchema).min(1).max(50),
});

export const placeOrder = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => placeOrderSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Load products by ID and verify active
    const productIds = data.items.map((i) => i.productId);
    const { data: products, error: prodErr } = await supabaseAdmin
      .from("products")
      .select("id, name, price, is_active, stock_status")
      .in("id", productIds);
    if (prodErr) throw new Error("Failed to load products");
    if (!products || products.length !== new Set(productIds).size) {
      throw new Error("One or more products are unavailable");
    }
    const byId = new Map(products.map((p) => [p.id, p]));
    for (const p of products) {
      if (!p.is_active || p.stock_status === "out_of_stock") {
        throw new Error(`${p.name} is currently unavailable`);
      }
    }

    // Server-side totals — never trust client prices
    let subtotal = 0;
    const items = data.items.map((i) => {
      const p = byId.get(i.productId)!;
      const price = Number(p.price);
      const line = price * i.quantity;
      subtotal += line;
      return {
        product_id: p.id,
        product_name_snapshot: p.name,
        product_price_snapshot: price,
        quantity: i.quantity,
        customization_details: i.customization ? { note: i.customization } : null,
        line_total: line,
      };
    });

    // Delivery fee from settings
    const { data: settings } = await supabaseAdmin
      .from("site_settings")
      .select("setting_key, setting_value")
      .in("setting_key", ["delivery_fee"]);
    const deliveryFee = Number(settings?.find((s) => s.setting_key === "delivery_fee")?.setting_value ?? 0) || 0;
    const total = subtotal + deliveryFee;

    let orderNumber = "";
    try {
      const { data: orderNumberData, error: numErr } = await supabaseAdmin.rpc("next_order_number" as never);
      if (numErr || !orderNumberData) {
        console.error("Supabase next_order_number RPC failed:", numErr);
        // Fallback: Generate custom order number using timestamp and random digit
        orderNumber = `HSG-${Date.now().toString().slice(-6)}${Math.floor(10 + Math.random() * 90)}`;
      } else {
        orderNumber = orderNumberData as unknown as string;
      }
    } catch (e) {
      console.error("Order number RPC threw exception:", e);
      orderNumber = `HSG-${Date.now().toString().slice(-6)}${Math.floor(10 + Math.random() * 90)}`;
    }

    const { data: order, error: orderErr } = await supabaseAdmin
      .from("orders")
      .insert({
        order_number: orderNumber,
        customer_name: data.customer_name,
        phone: data.phone,
        email: data.email || null,
        city: data.city,
        delivery_address: data.delivery_address,
        landmark: data.landmark || null,
        customer_notes: data.customer_notes || null,
        subtotal,
        delivery_fee: deliveryFee,
        total,
        payment_method: data.payment_method,
      })
      .select("id, order_number, confirmation_token")
      .single();
    if (orderErr || !order) {
      console.error("Supabase order insert error:", orderErr);
      throw new Error(`Failed to create order: ${orderErr?.message || "Unknown error"}`);
    }

    const { error: itemsErr } = await supabaseAdmin
      .from("order_items")
      .insert(items.map((i) => ({ ...i, order_id: order.id })));
    if (itemsErr) {
      console.error("Supabase order items insert error:", itemsErr);
      await supabaseAdmin.from("orders").delete().eq("id", order.id);
      throw new Error(`Failed to create order items: ${itemsErr.message}`);
    }

    return {
      order_number: order.order_number,
      confirmation_token: order.confirmation_token,
      total,
      subtotal,
      delivery_fee: deliveryFee,
    };
  });

export const getOrderByToken = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => z.object({ token: z.string().min(10).max(200) }).parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: order, error } = await supabaseAdmin
      .from("orders")
      .select("*, order_items(*)")
      .eq("confirmation_token", data.token)
      .maybeSingle();
    if (error) throw new Error("Lookup failed");
    if (!order) throw new Error("Order not found");
    return order;
  });
