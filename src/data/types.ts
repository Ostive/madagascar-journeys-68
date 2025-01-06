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
  longDescription: string;
  duration: string;
  persons: string;
  price: string;
  rating: string;
  dateRange: string;
  image: string;
  gallery: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
  }[];
  included: string[];
  notIncluded: string[];
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