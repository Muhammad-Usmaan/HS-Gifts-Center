import { createFileRoute } from '@tanstack/react-router'
import { Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { featuredProductsQuery, trendingProductsQuery, reviewsQuery, settingsQuery } from "@/lib/queries";
import { waLink } from "@/lib/whatsapp";
import { Gift, Sparkles, ShieldCheck, MessageCircle, Star, Instagram, Facebook } from "lucide-react";
import heroImg from "@/assets/hero-gifts.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HS Gift Shop | Personalized Gifts and Gift Hampers" },
      { name: "description", content: "Discover personalized gifts, beautiful hampers, and memorable surprises for birthdays, anniversaries, weddings, and special occasions." },
      { property: "og:title", content: "HS Gift Shop | Personalized Gifts and Gift Hampers" },
      { property: "og:description", content: "Thoughtful gifts and hampers for every special moment." },
    ],
  }),
  loader: ({ context }) => Promise.all([

    context.queryClient.ensureQueryData(featuredProductsQuery),
    context.queryClient.ensureQueryData(trendingProductsQuery),
    context.queryClient.ensureQueryData(reviewsQuery),
    context.queryClient.ensureQueryData(settingsQuery),
  ]),
  component: HomePage,
});

function HomePage() {

  const { data: featured } = useSuspenseQuery(featuredProductsQuery);
  const { data: trending } = useSuspenseQuery(trendingProductsQuery);
  const { data: reviews } = useSuspenseQuery(reviewsQuery);
  const { data: settings } = useSuspenseQuery(settingsQuery);
  const wa = settings.whatsapp_number ?? "923427010206";

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-14 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gold-foreground bg-gold/30 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" /> Curated with love
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-tight text-foreground">
              {settings.hero_heading ?? "Gifts Made to Be Remembered"}
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              {settings.hero_description ?? "Thoughtfully selected gifts, customized hampers, and beautiful surprises for every special moment."}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/shop" className="btn-primary inline-flex items-center gap-2"><Gift className="w-4 h-4" /> Shop Gifts</Link>
              <a href={waLink("Hello HS Gift Shop, I would like to place an order.", wa)} target="_blank" rel="noreferrer" className="btn-outline inline-flex items-center gap-2">
                <MessageCircle className="w-4 h-4" /> Order on WhatsApp
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-gold/20 to-primary/10 blur-2xl rounded-3xl" />
            <img src={heroImg} alt="Beautifully wrapped gift boxes with gold ribbons" width={1600} height={1200} className="relative rounded-2xl shadow-elegant w-full aspect-[4/3] object-cover" />
          </div>
        </div>
      </section>



      {/* Featured */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <SectionTitle eyebrow="Featured Gifts" title="Handpicked favourites" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-8">
          {featured.map((p) => <ProductCard key={p.id} p={p as never} />)}
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="rounded-2xl bg-primary text-primary-foreground p-8 md:p-14 grid md:grid-cols-[1fr_auto] gap-6 items-center shadow-elegant">
          <div>
            <h3 className="font-serif text-2xl md:text-4xl">Turn Your Ideas into a Personalized Gift</h3>
            <p className="mt-3 text-primary-foreground/80 max-w-2xl">Send us your photos, names, messages, and gift ideas. We will help you create something special.</p>
          </div>
          <a href={waLink("Hello HS Gift Shop, I want to discuss a personalized gift.", wa)} target="_blank" rel="noreferrer" className="btn-gold inline-flex items-center gap-2 whitespace-nowrap">
            <MessageCircle className="w-4 h-4" /> Discuss on WhatsApp
          </a>
        </div>
      </section>

      {/* Trending */}
      {trending.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-14">
          <SectionTitle eyebrow="Trending Now" title="Loved by our customers" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-8">
            {trending.map((p) => <ProductCard key={p.id} p={p as never} />)}
          </div>
        </section>
      )}

      {/* Why choose */}
      <section className="bg-accent/30 py-14">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle eyebrow="Why HS Gift Shop" title="Thoughtful gifting, made simple" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {[
              { icon: Gift, title: "Carefully Selected Gifts", text: "Every item is chosen with intention and care." },
              { icon: Sparkles, title: "Customization Available", text: "Personalize gifts with names, photos, and messages." },
              { icon: ShieldCheck, title: "Secure Order Processing", text: "Your details are handled safely at every step." },
              { icon: MessageCircle, title: "Friendly WhatsApp Support", text: "Chat with us for personal help before you order." },
            ].map((f) => (
              <div key={f.title} className="text-center p-6 rounded-xl bg-card border border-border">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
                  <f.icon className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-lg">{f.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How ordering works */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <SectionTitle eyebrow="How it works" title="Three simple steps" />
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {["Choose Your Gift", "Add Details and Place Your Order", "Receive Order Confirmation"].map((step, i) => (
            <div key={step} className="p-6 rounded-xl bg-card border border-border">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-serif text-lg">{i + 1}</div>
              <h4 className="font-serif text-lg mt-3">{step}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-accent/30 py-14">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle eyebrow="Kind Words" title="What our customers say" />
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {reviews.slice(0, 6).map((r) => (
              <div key={r.id} className="p-6 rounded-xl bg-card border border-border">
                <div className="flex text-gold mb-3">
                  {Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="w-4 h-4" fill="currentColor" />)}
                </div>
                <p className="text-sm text-foreground italic">&ldquo;{r.review_text}&rdquo;</p>
                <p className="mt-3 text-xs font-semibold text-primary">{r.customer_name}{r.customer_city ? ` — ${r.customer_city}` : ""}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <SectionTitle eyebrow="Follow Along" title="Stay Connected with HS Gift Shop" />
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {[
            { name: "Instagram", url: settings.instagram_url, handle: settings.instagram_handle ?? "@hsgiftshop", Icon: Instagram },
            { name: "Facebook", url: settings.facebook_url, handle: settings.facebook_handle ?? "HS Gift Shop", Icon: Facebook },
            { name: "TikTok", url: settings.tiktok_url, handle: settings.tiktok_handle ?? "@hsgiftshop", Icon: null },
          ].map((s) => (
            <a key={s.name} href={s.url ?? "#"} target="_blank" rel="noreferrer" className="card-elegant p-8 text-center block">
              {s.Icon ? <s.Icon className="w-8 h-8 mx-auto text-primary" /> : <span className="text-2xl font-bold text-primary">TT</span>}
              <p className="mt-3 font-serif text-lg">{s.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.handle}</p>
            </a>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="text-center">
      <span className="text-xs uppercase tracking-widest text-gold-foreground">{eyebrow}</span>
      <h2 className="font-serif text-3xl md:text-4xl text-foreground mt-2">{title}</h2>
      <div className="w-16 h-0.5 bg-gold mx-auto mt-3" />
    </div>
  );
}
