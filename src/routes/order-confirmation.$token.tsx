import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { SiteLayout } from "@/components/SiteLayout";
import { getOrderByToken } from "@/lib/orders.functions";
import { formatPKR } from "@/lib/format";
import { waLink } from "@/lib/whatsapp";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { settingsQuery } from "@/lib/queries";

export const Route = createFileRoute("/order-confirmation/$token")({
  head: () => ({ meta: [{ title: "Order Confirmation | HS Gift Shop" }, { name: "description", content: "Thank you for your order." }, { name: "robots", content: "noindex" }] }),
  component: ConfirmPage,
});

function ConfirmPage() {
  const { token } = Route.useParams();
  const lookup = useServerFn(getOrderByToken);
  const { data: settings } = useQuery(settingsQuery);
  const { data: order, isLoading, error } = useQuery({
    queryKey: ["order-lookup", token],
    queryFn: () => lookup({ data: { token } }),
    retry: false,
  });

  if (isLoading) return <SiteLayout><div className="max-w-2xl mx-auto py-20 text-center">Loading…</div></SiteLayout>;
  if (error || !order) {
    return (
      <SiteLayout>
        <div className="max-w-2xl mx-auto py-20 text-center px-6">
          <h1 className="font-serif text-3xl">Order not found</h1>
          <p className="text-muted-foreground mt-2">This confirmation link is invalid or has expired.</p>
          <Link to="/" className="btn-primary inline-block mt-6">Back to Home</Link>
        </div>
      </SiteLayout>
    );
  }

  const items = (order.order_items ?? []) as Array<{ id: string; product_name_snapshot: string; quantity: number; line_total: number }>;
  const waMsg = [
    `Hello HS Gift Shop, I just placed order ${order.order_number}.`,
    `Name: ${order.customer_name}`,
    `City: ${order.city}`,
    `Total: ${formatPKR(Number(order.total))}`,
    `Items: ${items.map((i) => `${i.product_name_snapshot} × ${i.quantity}`).join(", ")}`,
    order.customer_notes ? `Notes: ${order.customer_notes}` : "",
  ].filter(Boolean).join("\n");

  return (
    <SiteLayout>
      <div className="max-w-3xl mx-auto px-6 py-14">
        <div className="text-center">
          <CheckCircle2 className="w-16 h-16 text-primary mx-auto" />
          <h1 className="font-serif text-4xl mt-4">Thank you!</h1>
          <p className="text-muted-foreground mt-2">Your order has been received.</p>
          <p className="mt-4 text-xl">Order Number: <span className="font-semibold text-primary">{order.order_number}</span></p>
        </div>

        <div className="mt-8 p-6 bg-card border border-border rounded-lg">
          <h2 className="font-serif text-lg mb-3">Order Summary</h2>
          <ul className="text-sm divide-y divide-border">
            {items.map((i) => (
              <li key={i.id} className="py-2 flex justify-between">
                <span>{i.product_name_snapshot} × {i.quantity}</span>
                <span>{formatPKR(Number(i.line_total))}</span>
              </li>
            ))}
          </ul>
          <div className="pt-3 border-t border-border mt-2 text-sm space-y-1">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatPKR(Number(order.subtotal))}</span></div>
            <div className="flex justify-between"><span>Delivery</span><span>{formatPKR(Number(order.delivery_fee))}</span></div>
            <div className="flex justify-between font-semibold text-base"><span>Total</span><span>{formatPKR(Number(order.total))}</span></div>
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            <p><strong>Delivery to:</strong> {order.customer_name}, {order.city}</p>
            <p><strong>Status:</strong> {order.order_status}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mt-6">
          <a href={waLink(waMsg, settings?.whatsapp_number)} target="_blank" rel="noreferrer" className="btn-primary inline-flex items-center gap-2">
            <MessageCircle className="w-4 h-4" /> Send Order on WhatsApp
          </a>
          <Link to="/shop" className="btn-outline">Continue Shopping</Link>
        </div>
      </div>
    </SiteLayout>
  );
}
