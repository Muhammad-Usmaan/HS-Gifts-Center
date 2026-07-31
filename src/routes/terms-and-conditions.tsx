import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/terms-and-conditions")({
  head: () => ({ meta: [
    { title: "Terms & Conditions | HS Gift Shop" },
    { name: "description", content: "Terms of use for shopping with HS Gift Shop." },
    { property: "og:title", content: "Terms & Conditions | HS Gift Shop" },
    { property: "og:description", content: "Terms of use for shopping with HS Gift Shop." },
  ] }),
  component: () => (
    <SiteLayout>
      <article className="max-w-3xl mx-auto px-6 py-14">
        <h1 className="font-serif text-4xl">Terms &amp; Conditions</h1>
        <p className="text-muted-foreground mt-2">These terms apply to all orders placed with HS Gift Shop.</p>
        <h2 className="font-serif text-xl mt-8">Orders</h2>
        <p>All orders are confirmed by our team via WhatsApp before dispatch. Prices are in PKR and inclusive of applicable charges unless stated.</p>
        <h2 className="font-serif text-xl mt-6">Payments</h2>
        <p>We accept Cash on Delivery and WhatsApp-coordinated payment methods (bank transfer / mobile wallet).</p>
        <h2 className="font-serif text-xl mt-6">Customization</h2>
        <p>Personalized items are non-returnable once production has started.</p>
        <h2 className="font-serif text-xl mt-6">Liability</h2>
        <p>We are not responsible for delays caused by courier partners or incorrect address details provided by the customer.</p>
      </article>
    </SiteLayout>
  ),
});
