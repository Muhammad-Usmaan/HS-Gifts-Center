import { Header } from "./Header";
import { Footer } from "./Footer";
import { FloatingWhatsApp } from "./FloatingWhatsApp";
import { Toaster } from "sonner";

export function SiteLayout({ children, waMessage }: { children: React.ReactNode; waMessage?: string }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingWhatsApp message={waMessage} />
      <Toaster position="top-center" richColors />
    </div>
  );
}
