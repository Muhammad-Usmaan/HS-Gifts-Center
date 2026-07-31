import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const categoriesQuery = queryOptions({
  queryKey: ["categories"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("is_active", true)
      .order("sort_order");
    if (error) throw error;
    return data;
  },
});

export const featuredProductsQuery = queryOptions({
  queryKey: ["products", "featured"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*, product_images(image_url,sort_order), categories(name,slug)")
      .eq("is_active", true).eq("is_featured", true).order("sort_order").limit(8);
    if (error) throw error;
    return data;
  },
});

export const trendingProductsQuery = queryOptions({
  queryKey: ["products", "trending"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*, product_images(image_url,sort_order), categories(name,slug)")
      .eq("is_active", true).eq("is_trending", true).order("sort_order").limit(8);
    if (error) throw error;
    return data;
  },
});

export const allProductsQuery = queryOptions({
  queryKey: ["products", "all"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*, product_images(image_url,sort_order), categories(name,slug)")
      .eq("is_active", true).order("sort_order");
    if (error) throw error;
    return data;
  },
});

export const reviewsQuery = queryOptions({
  queryKey: ["reviews"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("reviews").select("*").eq("is_published", true).order("sort_order");
    if (error) throw error;
    return data;
  },
});

export const settingsQuery = queryOptions({
  queryKey: ["site_settings"],
  queryFn: async () => {
    const { data, error } = await supabase.from("site_settings").select("*");
    if (error) throw error;
    const map: Record<string, string> = {};
    (data ?? []).forEach((r) => { if (r.setting_value != null) map[r.setting_key] = r.setting_value; });
    return map;
  },
});

export function productBySlugQuery(slug: string) {
  return queryOptions({
    queryKey: ["product", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*, product_images(image_url,alt_text,sort_order), categories(id,name,slug)")
        .eq("slug", slug).eq("is_active", true).maybeSingle();
      if (error) throw error;
      return data;
    },
  });
}

export function categoryBySlugQuery(slug: string) {
  return queryOptions({
    queryKey: ["category", slug],
    queryFn: async () => {
      const { data, error } = await supabase.from("categories").select("*").eq("slug", slug).eq("is_active", true).maybeSingle();
      if (error) throw error;
      return data;
    },
  });
}

export function productsByCategoryQuery(categoryId: string | undefined) {
  return queryOptions({
    queryKey: ["products", "category", categoryId ?? ""],
    queryFn: async () => {
      if (!categoryId) return [];
      const { data, error } = await supabase
        .from("products")
        .select("*, product_images(image_url,sort_order), categories(name,slug)")
        .eq("is_active", true).eq("category_id", categoryId).order("sort_order");
      if (error) throw error;
      return data;
    },
    enabled: !!categoryId,
  });
}
