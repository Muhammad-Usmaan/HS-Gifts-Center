import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({ meta: [
    { title: "Privacy Policy | HS Gift Shop" },
    { name: "description", content: "How HS Gift Shop collects, uses, and protects your information." },
    { property: "og:title", content: "Privacy Policy | HS Gift Shop" },
    { property: "og:description", content: "How HS Gift Shop handles your information." },
  ] }),
  component: () => (
    <SiteLayout>
      <article className="max-w-3xl mx-auto px-6 py-14 prose prose-neutral">
        <h1 className="font-serif text-4xl">Privacy Policy</h1>
        <p className="text-muted-foreground">This page is maintained by HS Gift Shop and describes how we handle your information.</p>
        <h2 className="font-serif text-xl mt-8">Information we collect</h2>
        <p>Name, contact number, delivery address, and any order notes you share during checkout or over WhatsApp.</p>
        <h2 className="font-serif text-xl mt-6">How we use it</h2>
        <p>We use your details only to process orders, arrange delivery, and follow up on your inquiry. We do not sell your information.</p>
        <h2 className="font-serif text-xl mt-6">Storage</h2>
        <p>Order data is stored securely in our managed database. Access is restricted to authorized team members.</p>
        <h2 className="font-serif text-xl mt-6">Contact</h2>
        <p>For privacy questions, reach out on WhatsApp or via the Contact page.</p>
      </article>
    </SiteLayout>
  ),
});
