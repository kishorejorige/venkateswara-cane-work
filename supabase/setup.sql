-- ============================================================================
-- VENKATESWARA CANE WORK - SUPABASE DATABASE & STORAGE SETUP
-- ============================================================================

-- ============================================================================
-- 1. ADMIN USERS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.admin_users (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow authenticated users to read admin_users"
ON public.admin_users;

CREATE POLICY "Allow authenticated users to read admin_users"
ON public.admin_users
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);


-- ============================================================================
-- 2. PRODUCTS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en TEXT NOT NULL,
  name_te TEXT,
  description_en TEXT,
  description_te TEXT,
  image_path TEXT NOT NULL,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_products_visible_sort
ON public.products (
  is_visible,
  sort_order ASC,
  created_at ASC
);

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_products_updated_at
ON public.products;

CREATE TRIGGER set_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;


-- Public visible products

DROP POLICY IF EXISTS "Public users can view visible products"
ON public.products;

CREATE POLICY "Public users can view visible products"
ON public.products
FOR SELECT
TO public
USING (is_visible = true);


-- Admin SELECT

DROP POLICY IF EXISTS "Admins can view all products"
ON public.products;

CREATE POLICY "Admins can view all products"
ON public.products
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.admin_users
    WHERE user_id = auth.uid()
  )
);


-- Admin INSERT

DROP POLICY IF EXISTS "Admins can insert products"
ON public.products;

CREATE POLICY "Admins can insert products"
ON public.products
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.admin_users
    WHERE user_id = auth.uid()
  )
);


-- Admin UPDATE

DROP POLICY IF EXISTS "Admins can update products"
ON public.products;

CREATE POLICY "Admins can update products"
ON public.products
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.admin_users
    WHERE user_id = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.admin_users
    WHERE user_id = auth.uid()
  )
);


-- Admin DELETE

DROP POLICY IF EXISTS "Admins can delete products"
ON public.products;

CREATE POLICY "Admins can delete products"
ON public.products
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.admin_users
    WHERE user_id = auth.uid()
  )
);


-- ============================================================================
-- 3. PRODUCT IMAGES STORAGE BUCKET
-- ============================================================================

INSERT INTO storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
VALUES (
  'product-images',
  'product-images',
  true,
  5242880,
  ARRAY[
    'image/jpeg',
    'image/png',
    'image/webp'
  ]
)
ON CONFLICT (id)
DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY[
    'image/jpeg',
    'image/png',
    'image/webp'
  ];


-- ============================================================================
-- STORAGE POLICIES
-- ============================================================================

-- Remove old policies first so this setup script can safely be rerun.

DROP POLICY IF EXISTS "Public read access for product-images"
ON storage.objects;

DROP POLICY IF EXISTS "Admin insert access for product-images"
ON storage.objects;

DROP POLICY IF EXISTS "Admin update access for product-images"
ON storage.objects;

DROP POLICY IF EXISTS "Admin delete access for product-images"
ON storage.objects;


-- SELECT
-- Useful for authenticated admin operations and upload return metadata.

CREATE POLICY "Public read access for product-images"
ON storage.objects
FOR SELECT
TO public
USING (
  bucket_id = 'product-images'
);


-- INSERT

CREATE POLICY "Admin insert access for product-images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'product-images'
  AND EXISTS (
    SELECT 1
    FROM public.admin_users
    WHERE user_id = auth.uid()
  )
);


-- UPDATE

CREATE POLICY "Admin update access for product-images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'product-images'
  AND EXISTS (
    SELECT 1
    FROM public.admin_users
    WHERE user_id = auth.uid()
  )
)
WITH CHECK (
  bucket_id = 'product-images'
  AND EXISTS (
    SELECT 1
    FROM public.admin_users
    WHERE user_id = auth.uid()
  )
);


-- DELETE

CREATE POLICY "Admin delete access for product-images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'product-images'
  AND EXISTS (
    SELECT 1
    FROM public.admin_users
    WHERE user_id = auth.uid()
  )
);