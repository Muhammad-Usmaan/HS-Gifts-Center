import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { categoriesQuery, settingsQuery } from "@/lib/queries";
import { useCart } from "@/lib/cart";
import { ShoppingBag, Menu, X, Search, Instagram, Facebook } from "lucide-react";

export function Header() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const { data: cats } = useQuery(categoriesQuery);
  const { data: settings } = useQuery(settingsQuery);
  const announcement = settings?.announcement ?? "Make every occasion unforgettable with HS Gift Shop";

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
      <div className="bg-primary text-primary-foreground text-xs sm:text-sm text-center py-2 px-4">
        {announcement}
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          {settings?.logo_url ? (
            <img src={settings.logo_url} alt="HS Gift Shop" className="h-10 w-auto object-contain" />
          ) : (
            <span className="font-serif text-xl sm:text-2xl font-bold text-primary tracking-tight">HS Gift Shop</span>
          )}
        </Link>
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-foreground">
          <Link to="/" className="hover:text-primary transition-colors" activeOptions={{ exact: true }} activeProps={{ className: "text-primary" }}>Home</Link>
          <Link to="/shop" className="hover:text-primary transition-colors" activeProps={{ className: "text-primary" }}>Shop</Link>
          <Link to="/shop" search={{ }} className="hover:text-primary transition-colors">Categories</Link>
          <Link to="/category/$slug" params={{ slug: "customized-gifts" }} className="hover:text-primary transition-colors">Customized Gifts</Link>
          <Link to="/about" className="hover:text-primary transition-colors" activeProps={{ className: "text-primary" }}>About Us</Link>
          <Link to="/contact" className="hover:text-primary transition-colors" activeProps={{ className: "text-primary" }}>Contact</Link>
        </nav>
        <div className="flex items-center gap-2 sm:gap-4">
          <Link to="/shop" aria-label="Search products" className="p-2 hover:text-primary"><Search className="w-5 h-5" /></Link>
          <Link to="/cart" aria-label="View cart" className="relative p-2 hover:text-primary">
            <ShoppingBag className="w-5 h-5" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-gold text-gold-foreground text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                {count}
              </span>
            )}
          </Link>
          <button onClick={() => setOpen((v) => !v)} className="lg:hidden p-2" aria-label="Menu">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-card px-4 py-4 space-y-3">
          {[["/", "Home"], ["/shop", "Shop"], ["/about", "About Us"], ["/contact", "Contact"]].map(([to, label]) => (
            <Link key={to} to={to} onClick={() => setOpen(false)} className="block py-1 text-foreground hover:text-primary">{label}</Link>
          ))}
          {(cats ?? []).slice(0, 6).map((c) => (
            <Link key={c.id} to="/category/$slug" params={{ slug: c.slug }} onClick={() => setOpen(false)} className="block py-1 text-sm text-muted-foreground hover:text-primary">
              {c.name}
            </Link>
          ))}
          <div className="flex gap-3 pt-3">
            <a href={settings?.instagram_url ?? "#"} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram className="w-5 h-5 text-primary" /></a>
            <a href={settings?.facebook_url ?? "#"} target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook className="w-5 h-5 text-primary" /></a>
          </div>
        </div>
      )}
    </header>
  );
}
