import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { waLink } from "@/lib/whatsapp";
import { Heart, Sparkles, MessageCircle, Gift } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About Us | HS Gift Shop" },
    { name: "description", content: "HS Gift Shop helps you celebrate meaningful moments with thoughtful and personalized gifts." },
    { property: "og:title", content: "About Us | HS Gift Shop" },
    { property: "og:description", content: "Meet HS Gift Shop — thoughtful gifts for meaningful moments." },
  ] }),
  component: About,
});

function About() {
  return (
    <SiteLayout>
      <section className="max-w-4xl mx-auto px-6 py-14">
        <span className="text-xs uppercase tracking-widest text-gold-foreground">Our Story</span>
        <h1 className="font-serif text-4xl md:text-5xl mt-2">Not just a gift, it&apos;s a memory</h1>
        <p className="mt-6 text-lg text-muted-foreground">
          HS Gift Shop helps people celebrate meaningful relationships through carefully selected and personalized gifts.
          We believe a thoughtful gift is more than an item — it becomes part of a memory.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {[
            { icon: Heart, title: "Made with care", text: "Every hamper is prepared thoughtfully with quality materials." },
            { icon: Sparkles, title: "Personalization", text: "Add names, messages, and photos to make gifts truly yours." },
            { icon: Gift, title: "For every occasion", text: "Birthdays, anniversaries, weddings, Nikkah, and surprises." },
          ].map((f) => (
            <div key={f.title} className="p-6 rounded-lg bg-card border border-border">
              <f.icon className="w-6 h-6 text-primary" />
              <h3 className="font-serif text-lg mt-3">{f.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{f.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 rounded-xl bg-primary text-primary-foreground text-center">
          <h2 className="font-serif text-2xl">Have a special gift in mind?</h2>
          <p className="text-primary-foreground/80 mt-2">Message us on WhatsApp and we&apos;ll help you create something memorable.</p>
          <a href={waLink("Hello HS Gift Shop, I would like to plan a special gift.")} target="_blank" rel="noreferrer" className="btn-gold inline-flex items-center gap-2 mt-4">
            <MessageCircle className="w-4 h-4" /> Chat with us
          </a>
        </div>
      </section>
    </SiteLayout>
  );
}
