export const WHATSAPP_NUMBER = "923427010206";
export const WHATSAPP_DISPLAY = "+92 342 7010206";

export function waLink(message: string, number = WHATSAPP_NUMBER): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function waProductMessage(productName: string, url?: string): string {
  return `Hello HS Gift Shop, I am interested in ${productName}.${url ? ` Product link: ${url}.` : ""} Please share more details.`;
}
