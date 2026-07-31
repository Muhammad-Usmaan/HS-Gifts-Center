import { createFileRoute, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { categoryBySlugQuery, productsByCategoryQuery } from "@/lib/queries";

export const Route = createFileRoute("/category/$slug")({
  loader: async ({ context, params }) => {
    const cat = await context.queryClient.ensureQueryData(categoryBySlugQuery(params.slug));
    if (!cat) throw notFound();
    await context.queryClient.ensureQueryData(productsByCategoryQuery(cat.id));
    return { cat };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.cat.name} | HS Gift Shop` },
      { name: "description", content: loaderData.cat.description ?? `Shop ${loaderData.cat.name} at HS Gift Shop.` },
      { property: "og:title", content: `${loaderData.cat.name} | HS Gift Shop` },
      { property: "og:description", content: loaderData.cat.description ?? "Shop this collection." },
    ] : [{ title: "Category | HS Gift Shop" }],
  }),
  component: CategoryPage,
  notFoundComponent: () => (
    <SiteLayout>
      <div className="max-w-3xl mx-auto text-center py-24 px-6">
        <h1 className="font-serif text-3xl">Category not found</h1>
      </div>
    </SiteLayout>
  ),
});

function CategoryPage() {
  const { cat } = Route.useLoaderData();
  const { data: products } = useSuspenseQuery(productsByCategoryQuery(cat.id));

  return (
    <SiteLayout>
      <section className="relative bg-accent/40 py-14">
        {cat.banner_url && (
          <div className="absolute inset-0 opacity-30">
            <img src={cat.banner_url} alt="" className="w-full h-full object-cover" />
          </div>
        )}
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-foreground">{cat.name}</h1>
          {cat.description && <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">{cat.description}</p>}
          <p className="mt-3 text-sm text-primary">{products.length} products</p>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-6 py-10">
        {products.length === 0 ? (
          <p className="text-center py-16 text-muted-foreground">No products in this category yet.</p>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((p) => <ProductCard key={p.id} p={p as never} />)}
          </div>
        )}
      </div>
    </SiteLayout>
  );
}
