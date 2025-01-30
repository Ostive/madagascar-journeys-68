export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
  author?: string;
  readTime?: string;
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
  tour_location?: string;
  highlights?: string[];
  itinerary?: Array<{
    day: number;
    title: string;
    description: string;
    coordinates?: [number, number];
    activities?: string[];
    accommodation?: string;
    meals?: string[];
  }>;
  reviews?: Array<{
    id: number;
    rating: number;
    review_text: string;
    traveler_name: string;
  }>;
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
  coordinates?: [number, number];
  altitude?: string;
  short_description?: string;
  reviews?: Array<{
    id: number;
    rating: number;
    review_text: string;
    author: string;
    date: string;
  }>;
}