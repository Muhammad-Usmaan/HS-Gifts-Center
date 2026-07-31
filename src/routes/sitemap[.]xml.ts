import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";

const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const [{ data: prods }, { data: cats }] = await Promise.all([
          supabase.from("products").select("slug, updated_at").eq("is_active", true),
          supabase.from("categories").select("slug, updated_at").eq("is_active", true),
        ]);
        const entries: Array<{ path: string; lastmod?: string; priority?: string }> = [
          { path: "/", priority: "1.0" },
          { path: "/shop", priority: "0.9" },
          { path: "/about" },
          { path: "/contact" },
          { path: "/privacy-policy" },
          { path: "/terms-and-conditions" },
          { path: "/shipping-returns" },
        ];
        (cats ?? []).forEach((c) => entries.push({ path: `/category/${c.slug}`, priority: "0.7" }));
        (prods ?? []).forEach((p) => entries.push({ path: `/product/${p.slug}`, priority: "0.6" }));

        const urls = entries.map((e) => [
          `  <url>`,
          `    <loc>${BASE_URL}${e.path}</loc>`,
          e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
          e.priority ? `    <priority>${e.priority}</priority>` : null,
          `  </url>`,
        ].filter(Boolean).join("\n"));

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, { headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" } });
      },
    },
  },
});
