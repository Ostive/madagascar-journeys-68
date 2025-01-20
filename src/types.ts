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
  custom_highlights?: string[];
  itinerary?: Array<{
    day: number;
    title: string;
    description: string;
    coordinates?: [number, number];
  }>;
  reviews?: Array<{
    id: number;
    rating: number;
    review_text: string;
    author: string;
    date: string;
  }>;
  highlights?: string[];
  departure_location?: string;
  departure_time?: string;
  clothing_advisor?: {
    essential_items: string[];
    recommended_items: string[];
  };
  practical_info?: {
    health_safety: string[];
    best_time_to_visit: string[];
    accommodation: string[];
    transportation: string[];
  };
}