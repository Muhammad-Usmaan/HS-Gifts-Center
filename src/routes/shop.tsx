import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { allProductsQuery, categoriesQuery } from "@/lib/queries";
import { Search } from "lucide-react";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop All Gifts | HS Gift Shop" },
      { name: "description", content: "Browse our full collection of personalized gifts, hampers, and surprises." },
      { property: "og:title", content: "Shop All Gifts | HS Gift Shop" },
      { property: "og:description", content: "Browse our full collection of gifts and hampers." },
    ],
  }),
  loader: ({ context }) => Promise.all([
    context.queryClient.ensureQueryData(allProductsQuery),
    context.queryClient.ensureQueryData(categoriesQuery),
  ]),
  component: ShopPage,
});

function ShopPage() {
  const { data: products } = useSuspenseQuery(allProductsQuery);
  const { data: cats } = useSuspenseQuery(categoriesQuery);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const [sort, setSort] = useState<"newest" | "price_asc" | "price_desc" | "alpha">("newest");
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);

  const filtered = useMemo(() => {
    let list = [...products];
    if (q) {
      const term = q.toLowerCase();
      list = list.filter((p) =>
        p.name.toLowerCase().includes(term) ||
        p.short_description?.toLowerCase().includes(term) ||
        p.full_description?.toLowerCase().includes(term) ||
        p.categories?.name.toLowerCase().includes(term)
      );
    }
    if (cat) list = list.filter((p) => p.categories?.slug === cat);
    if (featuredOnly) list = list.filter((p) => p.is_featured);
    if (inStockOnly) list = list.filter((p) => p.stock_status === "in_stock");
    switch (sort) {
      case "price_asc": list.sort((a, b) => Number(a.price) - Number(b.price)); break;
      case "price_desc": list.sort((a, b) => Number(b.price) - Number(a.price)); break;
      case "alpha": list.sort((a, b) => a.name.localeCompare(b.name)); break;
      default: list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }
    return list;
  }, [products, q, cat, sort, featuredOnly, inStockOnly]);

  return (
    <SiteLayout>
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl">Shop All Gifts</h1>
          <p className="text-muted-foreground mt-1">{filtered.length} of {products.length} products</p>
        </div>

        <div className="grid md:grid-cols-[260px_1fr] gap-8">
          <aside className="space-y-5 md:sticky md:top-32 md:self-start">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search gifts..." className="w-full pl-9 pr-3 py-2 rounded-md border border-border bg-card" />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Category</label>
              <select value={cat} onChange={(e) => setCat(e.target.value)} className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm">
                <option value="">All Categories</option>
                {cats.map((c) => <option key={c.id} value={c.slug}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">Sort</label>
              <select value={sort} onChange={(e) => setSort(e.target.value as never)} className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm">
                <option value="newest">Newest</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="alpha">Alphabetical</option>
              </select>
            </div>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={featuredOnly} onChange={(e) => setFeaturedOnly(e.target.checked)} /> Featured only</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} /> In stock only</label>
            <button onClick={() => { setQ(""); setCat(""); setSort("newest"); setFeaturedOnly(false); setInStockOnly(false); }} className="text-sm text-primary underline">Clear filters</button>
          </aside>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <p>No products match your filters.</p>
              <Link to="/shop" className="text-primary underline mt-2 inline-block">Reset</Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filtered.map((p) => <ProductCard key={p.id} p={p as never} />)}
            </div>
          )}
        </div>
      </div>
    </SiteLayout>
  );
}
