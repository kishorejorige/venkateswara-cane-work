export interface Product {
  id: string;
  name_en: string;
  name_te: string | null;
  description_en: string | null;
  description_te: string | null;
  image_path: string;
  is_visible: boolean;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface ProductFormData {
  name_en: string;
  name_te: string;
  description_en: string;
  description_te: string;
  is_visible: boolean;
  sort_order: number;
  image_file?: File | null;
}

export interface AdminUser {
  user_id: string;
}
