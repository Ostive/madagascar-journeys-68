import { Destination } from '../types';

export const southDestinations: Destination[] = [
  {
    id: "toliara",
    title: "Toliara et l'Ifaty",
    description: "Lagons turquoise et récifs coralliens",
    longDescription: "Découvrez Toliara et Ifaty, où lagons turquoise, récifs coralliens et villages de pêcheurs se mêlent pour offrir un séjour relaxant et authentique. Idéal pour le snorkeling et la plongée sous-marine.",
    price: "700",
    image: "https://images.unsplash.com/photo-1496204624025-1e693e6f6c5b?auto=format&fit=crop&w=2000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1582206744498-1d204e448b3c?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1533685214317-3ba644f8d0e4?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1568384704953-8efb59d4cf9f?auto=format&fit=crop&w=2000&q=80",
    ],
    highlights: [
      "Snorkeling et plongée",
      "Découverte des villages Vezo",
      "Lagons paisibles",
      "Couchers de soleil incroyables",
    ],
    included: [
      "Transport depuis Toliara",
      "Hébergement en bungalow",
      "Guide local",
      "Excursions en pirogue",
    ],
    notIncluded: [
      "Vols internationaux",
      "Repas",
      "Location d'équipement de plongée",
      "Pourboires",
    ],
    location: "Sud-ouest de Madagascar",
    duration: "3-5 jours recommandés",
    bestTimeToVisit: "Avril à Novembre",
  },
  {
    id: "sud-route",
    title: "Route du Sud",
    description: "Découverte des parcs nationaux et des plages du Sud",
    longDescription: "La Route du Sud vous emmène à la découverte des trésors cachés de Madagascar. Des hauts plateaux aux plages sauvages, en passant par les parcs nationaux, vous découvrirez la diversité des paysages et la richesse culturelle du sud de l'île.",
    price: "1299",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=2000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=2000&q=80"
    ],
    highlights: [
      "Visite des parcs nationaux",
      "Plages de sable fin",
      "Culture locale",
      "Gastronomie malgache",
    ],
    included: [
      "Transport terrestre",
      "Hébergement",
      "Guide local",
      "Petit-déjeuner"
    ],
    notIncluded: [
      "Transport aérien",
      "Repas non mentionnés",
      "Activités optionnelles",
      "Assurance"
    ],
    location: "Sud de Madagascar",
    duration: "8 jours",
    bestTimeToVisit: "Juin à Septembre",
  },
];
