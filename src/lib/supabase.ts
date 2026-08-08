import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabasePublishableKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
      supabasePublishableKey &&
      !supabaseUrl.includes('your-supabase-project-id') &&
      !supabasePublishableKey.includes('your-supabase-publishable-key')
  );
};

// Fallback values prevent the app from crashing when
// Supabase environment variables have not been configured yet.
const validUrl = isSupabaseConfigured()
  ? supabaseUrl
  : 'https://placeholder.supabase.co';

const validKey = isSupabaseConfigured()
  ? supabasePublishableKey
  : 'placeholder-key';

export const supabase = createClient(validUrl, validKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export const STORAGE_BUCKET = 'product-images';

/**
 * Construct the public URL for a product image.
 *
 * Supports:
 * - Full external URLs
 * - Local public paths
 * - Supabase Storage paths
 */
export const getPublicImageUrl = (imagePath: string): string => {
  if (!imagePath) {
    return '';
  }

  // Already a complete URL or local public path.
  if (
    imagePath.startsWith('http://') ||
    imagePath.startsWith('https://') ||
    imagePath.startsWith('/')
  ) {
    return imagePath;
  }

  // If Supabase isn't configured yet, return the original path.
  if (!isSupabaseConfigured()) {
    return imagePath;
  }

  const { data } = supabase.storage
    .from(STORAGE_BUCKET)
    .getPublicUrl(imagePath);

  return data.publicUrl;
};

/**
 * Determines whether an image_path is a file stored in Supabase Storage.
 * Returns false for local public assets (e.g. /images/..., chair.png, hanging-chair.png)
 * and external HTTP/HTTPS URLs.
 */
export const isStorageImagePath = (imagePath: string): boolean => {
  if (!imagePath) return false;
  const path = imagePath.trim();
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('/') ||
    path.startsWith('images/') ||
    path === 'chair.png' ||
    path === 'hanging-chair.png'
  ) {
    return false;
  }
  return true;
};