import { Destination } from '../types';

export const centralDestinations: Destination[] = [
  {
    id: "tana",
    title: "Antananarivo",
    description: "Capitale animée et riche en histoire",
    longDescription: "Antananarivo, la capitale de Madagascar, mélange tradition et modernité. Visitez ses marchés colorés, ses monuments historiques et ses collines verdoyantes.",
    price: "400",
    image: "https://images.unsplash.com/photo-1568917767076-b5dc90b9ef8c?auto=format&fit=crop&w=2000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1516496075281-4ed4f96e7d20?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1534207368978-a198db523ece?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1575575041275-918b20cce306?auto=format&fit=crop&w=2000&q=80",
    ],
    highlights: [
      "Palais de la Reine",
      "Marché d'Analakely",
      "Points de vue panoramiques",
      "Découverte de la cuisine malgache",
    ],
    included: [
      "Transport local",
      "Guide",
      "Entrées des sites",
    ],
    notIncluded: [
      "Hébergement",
      "Repas",
    ],
    location: "Centre de Madagascar",
    duration: "2-3 jours recommandés",
    bestTimeToVisit: "Toute l'année",
  },
  {
    id: "andringitra",
    title: "Parc National de l'Andringitra",
    description: "Montagnes majestueuses et randonnées",
    longDescription: "Le parc de l'Andringitra est un paradis pour les aventuriers, offrant des treks spectaculaires avec des paysages variés, des cascades, et des panoramas époustouflants.",
    price: "1000",
    image: "https://images.unsplash.com/photo-1728901733890-55c3acdef1ae?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGFyY3xlbnwwfHwwfHx8MA%3D%3D",
    gallery: [
      "https://images.unsplash.com/photo-1518481617675-764d2a3159a1?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1599488615730-337830cd4187?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1518759814093-f95fbf36c77e?auto=format&fit=crop&w=2000&q=80",
    ],
    highlights: [
      "Ascension du Pic Boby",
      "Paysages variés",
      "Observation d'espèces endémiques",
      "Campements en pleine nature",
    ],
    included: [
      "Guide de randonnée",
      "Camping",
      "Entrées du parc",
    ],
    notIncluded: [
      "Hébergement en ville",
      "Équipement de camping",
    ],
    location: "Sud de Madagascar",
    duration: "4-6 jours recommandés",
    bestTimeToVisit: "Avril à Octobre",
  },
];
