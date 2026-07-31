import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/shipping-returns")({
  head: () => ({ meta: [
    { title: "Shipping & Returns | HS Gift Shop" },
    { name: "description", content: "Delivery timelines and return policy for HS Gift Shop orders." },
    { property: "og:title", content: "Shipping & Returns | HS Gift Shop" },
    { property: "og:description", content: "Delivery timelines and return policy for HS Gift Shop orders." },
  ] }),
  component: () => (
    <SiteLayout>
      <article className="max-w-3xl mx-auto px-6 py-14">
        <h1 className="font-serif text-4xl">Shipping &amp; Returns</h1>
        <h2 className="font-serif text-xl mt-8">Delivery</h2>
        <p>We deliver nationwide across Pakistan. Standard orders are dispatched within 1–3 working days after confirmation. Same-day delivery may be available in Karachi (subject to availability — please confirm on WhatsApp).</p>
        <h2 className="font-serif text-xl mt-6">Delivery charges</h2>
        <p>A flat delivery fee applies at checkout. Free delivery over PKR 5,000.</p>
        <h2 className="font-serif text-xl mt-6">Returns</h2>
        <p>Standard (non-personalized) items may be returned within 3 days of delivery if unused and in original packaging. Personalized items are non-returnable.</p>
        <h2 className="font-serif text-xl mt-6">Damaged items</h2>
        <p>If your gift arrives damaged, please contact us on WhatsApp within 24 hours with photos. We will make it right.</p>
      </article>
    </SiteLayout>
  ),
});
