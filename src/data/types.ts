export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
  user_id?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface CarouselSlide {
  id: number;
  title: string;
  description: string;
  image: string;
  link?: string;
}

export interface Destination {
  id: number;
  name: string;
  description: string;
  long_description: string;
  price: number;
  main_image: string;
  gallery: string[];
  highlights: string[];
  included: string[];
  not_included: string[];
  location: string;
  duration: string;
  best_time_to_visit: string;
  location_id?: number;
  user_id?: string;
}

export interface Circuit {
  id: number;
  name: string;
  description: string;
  duration_days: number;
  price: number;
  short_description?: string;
  long_description?: string;
  persons?: string;
  rating?: number;
  date_range?: string;
  main_image?: string;
  difficulty?: string;
  user_id?: string;
  gallery?: string[];
  included?: string[];
  not_included?: string[];
  created_at?: string | Date;
  updated_at?: string | Date;
  itinerary?: Array<{
    day: number;
    title: string;
    description: string;
  }>;
}