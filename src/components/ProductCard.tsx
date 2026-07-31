import { Link } from "@tanstack/react-router";
import { formatPKR, salePercent } from "@/lib/format";
import { waLink, waProductMessage } from "@/lib/whatsapp";
import { cart } from "@/lib/cart";
import { MessageCircle, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import placeholder from "@/assets/product-placeholder.jpg";

type Product = {
  id: string;
  slug: string;
  name: string;
  price: number | string;
  compare_at_price: number | string | null;
  product_images?: { image_url: string; sort_order: number }[];
  categories?: { name: string; slug: string } | null;
};

export function ProductCard({ p }: { p: Product }) {
  const price = Number(p.price);
  const compare = p.compare_at_price != null ? Number(p.compare_at_price) : null;
  const sale = salePercent(price, compare);
  const img = p.product_images?.sort((a, b) => a.sort_order - b.sort_order)[0]?.image_url ?? placeholder;

  function handleAdd() {
    cart.add({ productId: p.id, slug: p.slug, name: p.name, price, image: img, quantity: 1 });
    toast.success(`${p.name} added to cart`);
  }

  return (
    <div className="card-elegant overflow-hidden flex flex-col group">
      <Link to="/product/$slug" params={{ slug: p.slug }} className="relative aspect-square bg-muted overflow-hidden">
        <img src={img} alt={p.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        {sale && (
          <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded">
            -{sale}%
          </span>
        )}
      </Link>
      <div className="p-4 flex flex-col flex-1">
        {p.categories && (
          <span className="text-[11px] uppercase tracking-wider text-muted-foreground">{p.categories.name}</span>
        )}
        <Link to="/product/$slug" params={{ slug: p.slug }} className="font-medium text-foreground hover:text-primary line-clamp-2 mt-1">
          {p.name}
        </Link>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-primary font-semibold">{formatPKR(price)}</span>
          {compare && compare > price && (
            <span className="text-xs line-through text-muted-foreground">{formatPKR(compare)}</span>
          )}
        </div>
        <div className="mt-3 flex items-center gap-2">
          <button onClick={handleAdd} className="btn-primary flex-1 !py-2 !px-3 text-sm inline-flex items-center justify-center gap-1.5">
            <ShoppingBag className="w-4 h-4" /> Add to Cart
          </button>
          <a
            href={waLink(waProductMessage(p.name))}
            target="_blank" rel="noreferrer"
            aria-label={`Ask about ${p.name} on WhatsApp`}
            className="p-2 rounded-md border border-border hover:border-primary hover:text-primary text-muted-foreground"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
