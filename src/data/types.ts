export interface Destination {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  price: string;
  image: string;
  gallery: string[];
  highlights: string[];
  included: string[];
  notIncluded: string[];
  location: string;
  duration: string;
  bestTimeToVisit: string;
}

export interface Circuit {
  id: string;
  title: string;
  description: string;
  long_description: string | null;
  duration: string;
  persons: string;
  price: string;
  rating: string;
  date_range: string;
  image: string;
  gallery: string[] | null;
  itinerary: {
    day: number;
    title: string;
    description: string;
  }[] | null;
  included: string[] | null;
  not_included: string[] | null;
  difficulty: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
  content: string;
}

export interface CarouselSlide {
  image: string;
  title: string;
  description: string;
}