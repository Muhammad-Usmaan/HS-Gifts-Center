import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { productBySlugQuery, allProductsQuery } from "@/lib/queries";
import { ProductCard } from "@/components/ProductCard";
import { formatPKR, salePercent } from "@/lib/format";
import { waLink, waProductMessage } from "@/lib/whatsapp";
import { cart } from "@/lib/cart";
import { Gift, MessageCircle, ShieldCheck, Truck, Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import placeholder from "@/assets/product-placeholder.jpg";

export const Route = createFileRoute("/product/$slug")({
  loader: async ({ context, params }) => {
    const p = await context.queryClient.ensureQueryData(productBySlugQuery(params.slug));
    if (!p) throw notFound();
    await context.queryClient.ensureQueryData(allProductsQuery);
    return { product: p };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.product.name} | HS Gift Shop` },
      { name: "description", content: loaderData.product.short_description ?? "A beautiful gift from HS Gift Shop." },
      { property: "og:title", content: `${loaderData.product.name} | HS Gift Shop` },
      { property: "og:description", content: loaderData.product.short_description ?? "A beautiful gift from HS Gift Shop." },
      { property: "og:type", content: "product" },
    ] : [{ title: "Product | HS Gift Shop" }],
  }),
  component: ProductPage,
  notFoundComponent: () => (
    <SiteLayout><div className="max-w-3xl mx-auto text-center py-24 px-6"><h1 className="font-serif text-3xl">Product not found</h1></div></SiteLayout>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { data: allProducts } = useSuspenseQuery(allProductsQuery);
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [customization, setCustomization] = useState("");
  const images = ((product.product_images ?? []) as Array<{ image_url: string; alt_text: string | null; sort_order: number }>).sort((a, b) => a.sort_order - b.sort_order);
  const [activeImg, setActiveImg] = useState(images[0]?.image_url ?? placeholder);
  const price = Number(product.price);
  const compare = product.compare_at_price != null ? Number(product.compare_at_price) : null;
  const sale = salePercent(price, compare);
  const inStock = product.stock_status !== "out_of_stock";

  const related = allProducts
    .filter((p) => p.id !== product.id && p.categories?.slug === product.categories?.slug)
    .slice(0, 4);

  function handleAdd() {
    if (!inStock) return toast.error("This product is currently unavailable");
    cart.add({ productId: product.id, slug: product.slug, name: product.name, price, image: activeImg, quantity: qty, customization: customization || undefined });
    toast.success(`${product.name} added to cart`);
  }
  function handleBuyNow() {
    handleAdd();
    navigate({ to: "/checkout" });
  }

  return (
    <SiteLayout waMessage={waProductMessage(product.name)}>
      <div className="max-w-7xl mx-auto px-6 py-10">
        <nav className="text-xs text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link> / <Link to="/shop" className="hover:text-primary">Shop</Link>
          {product.categories && <> / <Link to="/category/$slug" params={{ slug: product.categories.slug }} className="hover:text-primary">{product.categories.name}</Link></>}
          {" / "}<span>{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <div className="aspect-square rounded-xl overflow-hidden bg-muted border border-border">
              <img src={activeImg} alt={product.name} className="w-full h-full object-cover" />
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 mt-3">
                {images.map((im: { image_url: string; alt_text: string | null }) => (
                  <button key={im.image_url} onClick={() => setActiveImg(im.image_url)} className={`w-20 h-20 rounded border ${activeImg === im.image_url ? "border-primary" : "border-border"}`}>
                    <img src={im.image_url} alt={im.alt_text ?? ""} className="w-full h-full object-cover rounded" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-4">
            {product.categories && <span className="text-xs uppercase tracking-widest text-gold-foreground">{product.categories.name}</span>}
            <h1 className="font-serif text-3xl md:text-4xl">{product.name}</h1>
            <div className="flex items-baseline gap-3">
              <span className="text-primary text-2xl font-semibold">{formatPKR(price)}</span>
              {compare && compare > price && <>
                <span className="text-base line-through text-muted-foreground">{formatPKR(compare)}</span>
                <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">-{sale}%</span>
              </>}
            </div>
            <p className="text-muted-foreground">{product.short_description}</p>

            <div className="flex items-center gap-2 text-sm">
              <span className={`w-2 h-2 rounded-full ${inStock ? "bg-green-600" : "bg-destructive"}`} />
              <span>{inStock ? "In stock — ships in 1-3 days" : "Currently unavailable"}</span>
            </div>

            {product.customization_available && (
              <div className="p-4 rounded-lg bg-accent/40 border border-border">
                <label className="text-sm font-medium">Customization details</label>
                <p className="text-xs text-muted-foreground mb-2">{product.personalization_instructions ?? "Enter names, message, or preferences. You may also share photos via WhatsApp after ordering."}</p>
                <textarea value={customization} onChange={(e) => setCustomization(e.target.value)} rows={3} className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm" placeholder="e.g. Name: Ayesha, Message: Happy Birthday!" />
              </div>
            )}

            <div className="flex items-center gap-3">
              <div className="inline-flex items-center border border-border rounded-md">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-2 hover:text-primary" aria-label="Decrease"><Minus className="w-4 h-4" /></button>
                <span className="w-10 text-center">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="p-2 hover:text-primary" aria-label="Increase"><Plus className="w-4 h-4" /></button>
              </div>
              <button onClick={handleAdd} className="btn-primary flex-1 inline-flex justify-center items-center gap-2"><Gift className="w-4 h-4" /> Add to Cart</button>
            </div>
            <div className="flex gap-3">
              <button onClick={handleBuyNow} className="btn-gold flex-1">Buy Now</button>
              <a href={waLink(waProductMessage(product.name, typeof window !== "undefined" ? window.location.href : undefined))} target="_blank" rel="noreferrer" className="btn-outline inline-flex items-center gap-2">
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
            </div>

            {product.full_description && (
              <div className="pt-6 border-t border-border">
                <h3 className="font-serif text-lg mb-2">Description</h3>
                <p className="text-sm text-muted-foreground whitespace-pre-line">{product.full_description}</p>
              </div>
            )}
            {product.features && product.features.length > 0 && (
              <div>
                <h3 className="font-serif text-lg mb-2">Features</h3>
                <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                  {(product.features as string[]).map((f: string) => <li key={f}>{f}</li>)}
                </ul>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 pt-4 text-xs">
              <div className="flex items-start gap-2 p-3 rounded-md bg-accent/30"><Truck className="w-4 h-4 text-primary mt-0.5" /><span>Delivery info shared on WhatsApp after order.</span></div>
              <div className="flex items-start gap-2 p-3 rounded-md bg-accent/30"><ShieldCheck className="w-4 h-4 text-primary mt-0.5" /><span>Careful packaging &amp; secure processing.</span></div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="font-serif text-2xl mb-6">You might also like</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {related.map((p) => <ProductCard key={p.id} p={p as never} />)}
            </div>
          </section>
        )}
      </div>
    </SiteLayout>
  );
}
