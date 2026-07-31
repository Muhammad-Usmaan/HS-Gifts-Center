export function formatPKR(amount: number | string | null | undefined): string {
  const n = typeof amount === "string" ? parseFloat(amount) : (amount ?? 0);
  if (isNaN(n as number)) return "Rs. 0";
  return "Rs. " + (n as number).toLocaleString("en-PK", { maximumFractionDigits: 0 });
}

export function salePercent(price: number, compareAt?: number | null): number | null {
  if (!compareAt || compareAt <= price) return null;
  return Math.round(((compareAt - price) / compareAt) * 100);
}
