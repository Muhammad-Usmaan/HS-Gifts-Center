import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { settingsQuery, categoriesQuery } from "@/lib/queries";
import { Instagram, Facebook } from "lucide-react";

export function Footer() {
  const { data: settings } = useQuery(settingsQuery);
  const { data: cats } = useQuery(categoriesQuery);
  const wa = settings?.whatsapp_display ?? "+92 342 7010206";

  return (
    <footer className="mt-16 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="space-y-3">
          <h3 className="font-serif text-2xl">HS Gift Shop</h3>
          <p className="text-sm text-primary-foreground/80 italic">Not just a gift, it&apos;s a memory</p>
          <p className="text-sm text-primary-foreground/70">
            {settings?.footer_description ?? "HS Gift Shop helps you celebrate meaningful moments with thoughtful and personalized gifts."}
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-gold">Quick Links</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li><Link to="/shop" className="hover:text-gold">Shop All</Link></li>
            <li><Link to="/about" className="hover:text-gold">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
            <li><Link to="/shipping-returns" className="hover:text-gold">Delivery Information</Link></li>
            <li><Link to="/shipping-returns" className="hover:text-gold">Returns &amp; Exchanges</Link></li>
            <li><a href="#" className="hover:text-gold">Custom Order Policy</a></li>
            <li><Link to="/privacy-policy" className="hover:text-gold">Privacy Policy</Link></li>
            <li><Link to="/terms-and-conditions" className="hover:text-gold">Terms &amp; Conditions</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-gold">Categories</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            {(cats ?? []).slice(0, 6).map((c) => (
              <li key={c.id}><Link to="/category/$slug" params={{ slug: c.slug }} className="hover:text-gold">{c.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-gold">Contact</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li>WhatsApp: {wa}</li>
            <li>Email: {settings?.business_email ?? "hello@hsgiftshop.pk"}</li>
            <li>{settings?.business_address ?? "Karachi, Pakistan"}</li>
          </ul>
          <div className="flex gap-3 mt-4">
            <a href={settings?.instagram_url ?? "#"} target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-gold"><Instagram className="w-5 h-5" /></a>
            <a href={settings?.facebook_url ?? "#"} target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:text-gold"><Facebook className="w-5 h-5" /></a>
            <a href={settings?.tiktok_url ?? "#"} target="_blank" rel="noreferrer" aria-label="TikTok" className="hover:text-gold text-lg font-bold">TT</a>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/20 py-6 text-center text-xs text-primary-foreground/70">
        © HS Gift Shop. All rights reserved.
      </div>
    </footer>
  );
}
