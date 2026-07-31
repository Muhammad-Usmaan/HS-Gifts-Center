
-- ============ STORAGE FOR SITE ASSETS ============
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('site-assets', 'site-assets', true, 5242880, ARRAY['image/jpeg','image/png','image/webp','image/gif'])
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "public read site assets" ON storage.objects
  FOR SELECT USING (bucket_id = 'site-assets');

CREATE POLICY "admins upload site assets" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'site-assets' AND public.is_admin());

CREATE POLICY "admins update site assets" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'site-assets' AND public.is_admin());

CREATE POLICY "admins delete site assets" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'site-assets' AND public.is_admin());

-- ============ DEFAULT SITE SETTINGS ============
INSERT INTO public.site_settings (setting_key, setting_value) VALUES
  ('logo_url', '/logo.png'),
  ('hero_heading', 'Thoughtful Gifts for Every Occasion'),
  ('hero_description', 'Discover personalized gifts that turn moments into memories. From custom hampers to elegant keepsakes.'),
  ('whatsapp_number', '923427010206'),
  ('whatsapp_display', '+92 342 7010206'),
  ('whatsapp_default_message', 'Hi HS Gift Shop! I would like to place an order.'),
  ('announcement', 'Make every occasion unforgettable with HS Gift Shop'),
  ('footer_description', 'HS Gift Shop helps you celebrate meaningful moments with thoughtful and personalized gifts.'),
  ('business_email', 'hello@hsgiftshop.pk'),
  ('business_address', 'Karachi, Pakistan'),
  ('instagram_url', 'https://instagram.com/hsgiftshop'),
  ('instagram_handle', '@hsgiftshop'),
  ('facebook_url', 'https://facebook.com/hsgiftshop'),
  ('facebook_handle', 'HS Gift Shop'),
  ('tiktok_url', 'https://tiktok.com/@hsgiftshop'),
  ('tiktok_handle', '@hsgiftshop'),
  ('delivery_fee', '200')
ON CONFLICT (setting_key) DO NOTHING;

-- ============ SAMPLE CATEGORIES ============
INSERT INTO public.categories (name, slug, description, is_active, is_featured, sort_order) VALUES
  ('Gift Hampers', 'gift-hampers', 'Curated gift hampers for every occasion', true, true, 1),
  ('Customized Gifts', 'customized-gifts', 'Personalized gifts made just for them', true, true, 2),
  ('Occasion Gifts', 'occasion-gifts', 'Birthday, anniversary, and celebration gifts', true, false, 3),
  ('Corporate Gifts', 'corporate-gifts', 'Professional gifting solutions', true, false, 4)
ON CONFLICT (slug) DO NOTHING;

-- ============ SAMPLE REVIEWS ============
INSERT INTO public.reviews (customer_name, customer_city, rating, review_text, is_published, sort_order) VALUES
  ('Ayesha K.', 'Karachi', 5, 'Absolutely loved the customized hamper! Beautiful packaging and fast delivery.', true, 1),
  ('Hassan R.', 'Lahore', 5, 'Perfect gift for my wife''s birthday. She was thrilled!', true, 2),
  ('Fatima M.', 'Islamabad', 4, 'Great quality products and excellent customer service on WhatsApp.', true, 3)
ON CONFLICT DO NOTHING;
