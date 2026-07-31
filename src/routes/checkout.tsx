import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { SiteLayout } from "@/components/SiteLayout";
import { useCart, cart } from "@/lib/cart";
import { formatPKR } from "@/lib/format";
import { placeOrder } from "@/lib/orders.functions";
import { settingsQuery } from "@/lib/queries";
import { toast } from "sonner";

const schema = z.object({
  customer_name: z.string().trim().min(2, "Name is required"),
  phone: z.string().trim().min(7, "Phone is required"),
  email: z.string().trim().email("Invalid email").optional().or(z.literal("")),
  city: z.string().trim().min(2, "City is required"),
  delivery_address: z.string().trim().min(5, "Full address required"),
  landmark: z.string().trim().optional(),
  customer_notes: z.string().trim().optional(),
  payment_method: z.enum(["cod", "whatsapp"]),
});
type FormData = z.infer<typeof schema>;

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout | HS Gift Shop" }, { name: "description", content: "Complete your order." }, { property: "og:title", content: "Checkout | HS Gift Shop" }, { property: "og:description", content: "Complete your order." }] }),
  loader: ({ context }) => context.queryClient.ensureQueryData(settingsQuery),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { data: settings } = useSuspenseQuery(settingsQuery);
  const deliveryFee = Number(settings.delivery_fee ?? 0);
  const { items, subtotal, hydrated } = useCart();
  const navigate = useNavigate();
  const submitOrder = useServerFn(placeOrder);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { payment_method: "cod" },
  });

  async function onSubmit(data: FormData) {
    if (items.length === 0) return toast.error("Your cart is empty");
    setSubmitting(true);
    try {
      const result = await submitOrder({
        data: {
          ...data,
          items: items.map((i) => ({ productId: i.productId, quantity: i.quantity, customization: i.customization })),
        },
      });
      cart.clear();
      toast.success(`Order ${result.order_number} placed successfully!`);
      navigate({ to: "/order-confirmation/$token", params: { token: result.confirmation_token } });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to place order");
    } finally {
      setSubmitting(false);
    }
  }

  if (hydrated && items.length === 0) {
    return (
      <SiteLayout>
        <div className="max-w-3xl mx-auto px-6 py-24 text-center">
          <h1 className="font-serif text-3xl">Your cart is empty</h1>
          <Link to="/shop" className="btn-primary inline-block mt-6">Shop Gifts</Link>
        </div>
      </SiteLayout>
    );
  }

  const total = subtotal + deliveryFee;

  return (
    <SiteLayout>
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="font-serif text-3xl mb-6">Checkout</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="grid lg:grid-cols-[1fr_360px] gap-8">
          <div className="space-y-4 bg-card border border-border rounded-lg p-6">
            <h2 className="font-serif text-lg">Delivery Details</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <Field label="Full name*" error={errors.customer_name?.message}><input {...register("customer_name")} className="input" /></Field>
              <Field label="Phone*" error={errors.phone?.message}><input {...register("phone")} className="input" /></Field>
              <Field label="Email" error={errors.email?.message}><input type="email" {...register("email")} className="input" /></Field>
              <Field label="City*" error={errors.city?.message}><input {...register("city")} className="input" /></Field>
              <Field label="Landmark"><input {...register("landmark")} className="input" /></Field>
              <div className="sm:col-span-2">
                <Field label="Full delivery address*" error={errors.delivery_address?.message}>
                  <textarea rows={2} {...register("delivery_address")} className="input" />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field label="Order notes / customization instructions">
                  <textarea rows={3} {...register("customer_notes")} className="input" placeholder="Anything else we should know?" />
                </Field>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <h3 className="font-medium mb-2">Payment Method</h3>
              <label className="flex items-start gap-2 p-3 rounded-md border border-border cursor-pointer has-[:checked]:border-primary has-[:checked]:bg-accent/30">
                <input type="radio" value="cod" {...register("payment_method")} className="mt-1" />
                <span><span className="font-medium">Cash on Delivery</span><br /><span className="text-xs text-muted-foreground">Pay when the order arrives.</span></span>
              </label>
              <label className="flex items-start gap-2 p-3 rounded-md border border-border cursor-pointer mt-2 has-[:checked]:border-primary has-[:checked]:bg-accent/30">
                <input type="radio" value="whatsapp" {...register("payment_method")} className="mt-1" />
                <span><span className="font-medium">Payment Arrangement Through WhatsApp</span><br /><span className="text-xs text-muted-foreground">We&apos;ll coordinate payment over WhatsApp.</span></span>
              </label>
            </div>
          </div>

          <aside className="p-6 bg-card border border-border rounded-lg h-fit space-y-3">
            <h2 className="font-serif text-lg">Order Summary</h2>
            <div className="space-y-2 max-h-64 overflow-auto">
              {items.map((i) => (
                <div key={i.productId + (i.customization ?? "")} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{i.name} × {i.quantity}</span>
                  <span>{formatPKR(i.price * i.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-3 space-y-1 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>{formatPKR(subtotal)}</span></div>
              <div className="flex justify-between"><span>Delivery</span><span>{formatPKR(deliveryFee)}</span></div>
              <div className="flex justify-between font-semibold pt-2 border-t border-border"><span>Total</span><span>{formatPKR(total)}</span></div>
            </div>
            <button type="submit" disabled={submitting} className="btn-primary w-full mt-2 disabled:opacity-60">
              {submitting ? "Placing Order…" : "Place Order"}
            </button>
            <p className="text-xs text-muted-foreground">By placing your order you agree to our <Link to="/terms-and-conditions" className="underline">Terms</Link>.</p>
          </aside>
        </form>
        <style>{`
          .input { width:100%; padding:0.5rem 0.75rem; border:1px solid var(--color-border); border-radius:0.5rem; background:var(--color-background); font-size:0.875rem; }
          .input:focus { outline:none; border-color:var(--color-primary); box-shadow:0 0 0 3px color-mix(in oklab, var(--color-primary) 20%, transparent); }
        `}</style>
      </div>
    </SiteLayout>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-medium block mb-1">{label}</span>
      {children}
      {error && <span className="text-xs text-destructive mt-1 block">{error}</span>}
    </label>
  );
}
