import { useQuery } from "@tanstack/react-query";
import { settingsQuery } from "@/lib/queries";
import { WHATSAPP_NUMBER, waLink } from "@/lib/whatsapp";
import { MessageCircle } from "lucide-react";

export function FloatingWhatsApp({ message }: { message?: string }) {
  const { data: settings } = useQuery(settingsQuery);
  const number = settings?.whatsapp_number ?? WHATSAPP_NUMBER;
  const msg = message ?? settings?.whatsapp_default_message ?? "Hello HS Gift Shop, I would like to know more about your gifts.";
  return (
    <a
      href={waLink(msg, number)}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-[#25D366] text-white rounded-full shadow-elegant hover:scale-105 transition-transform p-3 sm:p-4"
      style={{ boxShadow: "0 10px 30px -8px rgba(37,211,102,0.5)" }}
    >
      <MessageCircle className="w-6 h-6" fill="currentColor" />
      <span className="hidden sm:inline-block pr-2 text-sm font-medium">Chat with us</span>
    </a>
  );
}
