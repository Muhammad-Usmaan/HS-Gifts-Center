import { useEffect, useState, useSyncExternalStore } from "react";

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string | null;
  quantity: number;
  customization?: string;
};

const KEY = "hsg_cart_v1";
const listeners = new Set<() => void>();

function read(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch { return []; }
}

function write(items: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(items));
  listeners.forEach((l) => l());
}

export const cart = {
  get: read,
  subscribe(cb: () => void) { listeners.add(cb); return () => { listeners.delete(cb); }; },
  add(item: CartItem) {
    const items = read();
    const idx = items.findIndex((i) => i.productId === item.productId && (i.customization ?? "") === (item.customization ?? ""));
    if (idx >= 0) items[idx].quantity += item.quantity;
    else items.push(item);
    write(items);
  },
  update(productId: string, quantity: number, customization?: string) {
    const items = read().map((i) =>
      i.productId === productId && (i.customization ?? "") === (customization ?? "")
        ? { ...i, quantity: Math.max(1, quantity) }
        : i
    );
    write(items);
  },
  remove(productId: string, customization?: string) {
    write(read().filter((i) => !(i.productId === productId && (i.customization ?? "") === (customization ?? ""))));
  },
  clear() { write([]); },
};

export function useCart() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  const items = useSyncExternalStore(
    (cb) => cart.subscribe(cb),
    () => JSON.stringify(read()),
    () => "[]"
  );
  const parsed: CartItem[] = hydrated ? JSON.parse(items) : [];
  const count = parsed.reduce((s, i) => s + i.quantity, 0);
  const subtotal = parsed.reduce((s, i) => s + i.price * i.quantity, 0);
  return { items: parsed, count, subtotal, hydrated };
}
