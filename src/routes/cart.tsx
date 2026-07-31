import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useCart, cart } from "@/lib/cart";
import { formatPKR } from "@/lib/format";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import placeholder from "@/assets/product-placeholder.jpg";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Cart | HS Gift Shop" }, { name: "description", content: "Review your selected gifts." }, { property: "og:title", content: "Your Cart | HS Gift Shop" }, { property: "og:description", content: "Review your selected gifts." }] }),
  component: CartPage,
});

function CartPage() {
  const { items, subtotal, hydrated } = useCart();

  if (!hydrated) {
    return <SiteLayout><div className="max-w-3xl mx-auto px-6 py-20"><p className="text-center text-muted-foreground">Loading cart…</p></div></SiteLayout>;
  }
  if (items.length === 0) {
    return (
      <SiteLayout>
        <div className="max-w-3xl mx-auto px-6 py-24 text-center">
          <ShoppingBag className="w-12 h-12 mx-auto text-primary" />
          <h1 className="font-serif text-3xl mt-4">Your cart is empty</h1>
          <p className="text-muted-foreground mt-2">Add a few beautiful gifts to get started.</p>
          <Link to="/shop" className="btn-primary inline-block mt-6">Shop Gifts</Link>
        </div>
      </SiteLayout>
    );
  }
  return (
    <SiteLayout>
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="font-serif text-3xl mb-6">Your Cart</h1>
        <div className="grid lg:grid-cols-[1fr_360px] gap-8">
          <div className="space-y-3">
            {items.map((i) => (
              <div key={i.productId + (i.customization ?? "")} className="flex gap-4 p-4 bg-card border border-border rounded-lg">
                <img src={i.image ?? placeholder} alt={i.name} className="w-20 h-20 object-cover rounded" />
                <div className="flex-1">
                  <Link to="/product/$slug" params={{ slug: i.slug }} className="font-medium hover:text-primary">{i.name}</Link>
                  {i.customization && <p className="text-xs text-muted-foreground mt-1">Note: {i.customization}</p>}
                  <p className="text-sm text-primary font-semibold mt-1">{formatPKR(i.price)}</p>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button onClick={() => cart.remove(i.productId, i.customization)} className="text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
                  <div className="inline-flex items-center border border-border rounded">
                    <button onClick={() => cart.update(i.productId, i.quantity - 1, i.customization)} className="p-1.5"><Minus className="w-3 h-3" /></button>
                    <span className="w-8 text-center text-sm">{i.quantity}</span>
                    <button onClick={() => cart.update(i.productId, i.quantity + 1, i.customization)} className="p-1.5"><Plus className="w-3 h-3" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <aside className="p-6 bg-card border border-border rounded-lg h-fit space-y-3">
            <h2 className="font-serif text-lg">Order Summary</h2>
            <div className="flex justify-between text-sm"><span>Subtotal</span><span>{formatPKR(subtotal)}</span></div>
            <div className="flex justify-between text-sm text-muted-foreground"><span>Delivery fee</span><span>Calculated at checkout</span></div>
            <div className="border-t border-border pt-3 flex justify-between font-semibold">
              <span>Estimated Total</span><span>{formatPKR(subtotal)}</span>
            </div>
            <Link to="/checkout" className="btn-primary w-full text-center block">Proceed to Checkout</Link>
            <Link to="/shop" className="text-center block text-sm text-muted-foreground hover:text-primary">← Continue Shopping</Link>
          </aside>
        </div>
      </div>
    </SiteLayout>
  );
}
