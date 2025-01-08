export interface SiteSettings {
  id: number;
  hero_images: string[];
  hero_title: string;
  hero_subtitle: string;
  show_destinations: boolean;
  destinations_count: number;
  show_circuits: boolean;
  circuits_count: number;
  show_blog: boolean;
  blog_count: number;
  created_at?: string;
  updated_at?: string;
}

export interface HighlightOption {
  id: number;
  description: string;
  created_at?: string;
  updated_at?: string;
}

export interface PackageOption {
  id: number;
  description: string;
  is_included: boolean;
  created_at?: string;
  updated_at?: string;
}