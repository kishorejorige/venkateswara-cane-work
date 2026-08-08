-- ============================================================================
-- VENKATESWARA CANE WORK - SUPABASE SEED DATA
-- ============================================================================
-- Run this in Supabase SQL Editor after setup.sql to populate initial products.

INSERT INTO public.products (
  id,
  name_en,
  name_te,
  description_en,
  description_te,
  image_path,
  is_visible,
  sort_order
) VALUES
(
  'a1b2c3d4-e5f6-7890-abcd-111111111111',
  'Classic Handcrafted Cane Chair',
  'క్లాసిక్ చేతిపని కేన్ కుర్చీ',
  'Ergonomically designed traditional cane arm chair with intricate hand-woven rattan backing and sturdy structure.',
  'వరాండా మరియు ఇంట్లో కూర్చోవడానికి సౌకర్యవంతమైన సాంప్రదాయ కేన్ కుర్చీ.',
  'chair.png',
  true,
  1
),
(
  'a1b2c3d4-e5f6-7890-abcd-222222222222',
  'Handmade Cane Swing (Jhula)',
  'చేతితో చేసిన కేన్ ఉయ్యాల (ఊయల)',
  'Luxurious drop-shaped hanging cane swing designed for balcony, patio, or living room relaxation.',
  'బాల్కనీ మరియు లివింగ్ రూమ్ కోసం డిజైన్ చేసిన అందమైన కేన్ ఉయ్యాల.',
  'hanging-chair.png',
  true,
  2
)
ON CONFLICT (id) DO NOTHING;
