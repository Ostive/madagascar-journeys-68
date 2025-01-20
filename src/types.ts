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
  custom_highlights?: string[];
  coordinates?: [number, number];
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
}

export interface CircuitMapProps {
  circuit: Circuit;
  cities?: Array<{
    name: string;
    coordinates: [number, number];
    day: number;
  }>;
  className?: string;
}

export interface Destination {
  id: number;
  name: string;
  description: string;
  short_description?: string;
  long_description?: string;
  price: number;
  main_image: string;
  gallery?: string[];
  highlights?: string[];
  included?: string[];
  not_included?: string[];
  location: string;
  coordinates?: [number, number];
  altitude?: string;
  duration: string;
  best_time_to_visit: string;
  location_id?: number;
  user_id?: string;
}

export interface ReservationCardProps {
  price: string;
  duration?: string;
  persons?: string;
  bestTimeToVisit?: string;
  title?: string;
  description?: string;
  destinationId?: string;
  className?: string;
}

export interface RecommendationFormData {
  region?: string[];
  duration?: string;
  groupSize?: string;
  seasonPreference?: string;
  interests?: string[];
  travelStyle?: string;
  activityLevel?: string;
}

export type RecommendationFormFields = keyof RecommendationFormData;