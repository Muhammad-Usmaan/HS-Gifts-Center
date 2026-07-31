import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/SiteLayout";
import { settingsQuery } from "@/lib/queries";
import { waLink } from "@/lib/whatsapp";
import { MessageCircle, Instagram, Facebook, Mail, MapPin } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(7).max(30),
  email: z.string().trim().email().max(200).optional().or(z.literal("")),
  inquiry_type: z.enum(["product", "custom", "existing", "bulk", "general"]),
  message: z.string().trim().min(5).max(1000),
});
type FormData = z.infer<typeof schema>;

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [
    { title: "Contact HS Gift Shop" },
    { name: "description", content: "Chat with us on WhatsApp or send us a message. We're happy to help with any inquiry." },
    { property: "og:title", content: "Contact HS Gift Shop" },
    { property: "og:description", content: "Chat with us on WhatsApp or send us a message." },
  ] }),
  component: Contact,
});

function Contact() {
  const { data: settings } = useQuery(settingsQuery);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { inquiry_type: "general" },
  });

  function onSubmit(data: FormData) {
    const typeLabel: Record<FormData["inquiry_type"], string> = {
      product: "Product Question", custom: "Custom Gift", existing: "Existing Order", bulk: "Bulk Order", general: "General Inquiry",
    };
    const msg = `Hello HS Gift Shop,\n\nInquiry Type: ${typeLabel[data.inquiry_type]}\nName: ${data.name}\nPhone: ${data.phone}${data.email ? `\nEmail: ${data.email}` : ""}\n\n${data.message}`;
    window.open(waLink(msg, settings?.whatsapp_number), "_blank");
    reset();
  }

  return (
    <SiteLayout>
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="text-center">
          <h1 className="font-serif text-4xl">Contact HS Gift Shop</h1>
          <p className="text-muted-foreground mt-2">We&apos;d love to hear from you. The fastest way to reach us is WhatsApp.</p>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mt-10">
          {[
            { Icon: MessageCircle, label: "WhatsApp", value: settings?.whatsapp_display ?? "+92 342 7010206", href: waLink("Hello HS Gift Shop!", settings?.whatsapp_number) },
            { Icon: Instagram, label: "Instagram", value: settings?.instagram_handle ?? "@hsgiftshop", href: settings?.instagram_url ?? "#" },
            { Icon: Facebook, label: "Facebook", value: settings?.facebook_handle ?? "HS Gift Shop", href: settings?.facebook_url ?? "#" },
            { Icon: null, label: "TikTok", value: settings?.tiktok_handle ?? "@hsgiftshop", href: settings?.tiktok_url ?? "#" },
          ].map((c) => (
            <a key={c.label} href={c.href} target="_blank" rel="noreferrer" className="card-elegant p-5 text-center block">
              {c.Icon ? <c.Icon className="w-6 h-6 mx-auto text-primary" /> : <span className="text-xl font-bold text-primary">TT</span>}
              <p className="font-serif text-lg mt-2">{c.label}</p>
              <p className="text-xs text-muted-foreground">{c.value}</p>
            </a>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mt-12">
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 bg-card border border-border rounded-lg space-y-3">
            <h2 className="font-serif text-2xl">Send us a message</h2>
            <p className="text-sm text-muted-foreground">This form opens WhatsApp with your message pre-filled.</p>
            <div>
              <label className="text-sm">Name</label>
              <input {...register("name")} className="w-full mt-1 px-3 py-2 border border-border rounded" />
              {errors.name && <span className="text-xs text-destructive">{errors.name.message}</span>}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm">Phone</label>
                <input {...register("phone")} className="w-full mt-1 px-3 py-2 border border-border rounded" />
              </div>
              <div>
                <label className="text-sm">Email</label>
                <input type="email" {...register("email")} className="w-full mt-1 px-3 py-2 border border-border rounded" />
              </div>
            </div>
            <div>
              <label className="text-sm">Inquiry type</label>
              <select {...register("inquiry_type")} className="w-full mt-1 px-3 py-2 border border-border rounded bg-background">
                <option value="product">Product Question</option>
                <option value="custom">Custom Gift</option>
                <option value="existing">Existing Order</option>
                <option value="bulk">Bulk Order</option>
                <option value="general">General Inquiry</option>
              </select>
            </div>
            <div>
              <label className="text-sm">Message</label>
              <textarea rows={4} {...register("message")} className="w-full mt-1 px-3 py-2 border border-border rounded" />
              {errors.message && <span className="text-xs text-destructive">{errors.message.message}</span>}
            </div>
            <button type="submit" className="btn-primary w-full inline-flex justify-center items-center gap-2">
              <MessageCircle className="w-4 h-4" /> Send via WhatsApp
            </button>
          </form>

          <div className="space-y-4">
            <div className="p-6 bg-card border border-border rounded-lg">
              <h3 className="font-serif text-lg">Business Info</h3>
              <p className="text-sm text-muted-foreground mt-2 flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5" /> {settings?.business_address ?? "Karachi, Pakistan"}</p>
              <p className="text-sm text-muted-foreground mt-2 flex items-start gap-2"><Mail className="w-4 h-4 mt-0.5" /> {settings?.business_email ?? "hello@hsgiftshop.pk"}</p>
              <p className="text-sm text-muted-foreground mt-2 flex items-start gap-2"><MessageCircle className="w-4 h-4 mt-0.5" /> {settings?.whatsapp_display ?? "+92 342 7010206"}</p>
            </div>
            <div className="p-6 bg-card border border-border rounded-lg">
              <h3 className="font-serif text-lg">Business Hours</h3>
              <p className="text-sm text-muted-foreground mt-2">{settings?.business_hours_weekdays ?? "Mon – Sat: 10:00 AM – 8:00 PM"}</p>
              <p className="text-sm text-muted-foreground">{settings?.business_hours_sunday ?? "Sunday: By WhatsApp appointment"}</p>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
