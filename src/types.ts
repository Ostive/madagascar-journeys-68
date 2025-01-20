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
  custom_highlights?: string[];
  itinerary?: Array<{
    day: number;
    title: string;
    description: string;
    coordinates?: [number, number];  // Explicitly typed as tuple
  }>;
  reviews?: Array<{
    id: number;
    rating: number;
    review_text: string;
    author: string;
    date: string;
  }>;
}