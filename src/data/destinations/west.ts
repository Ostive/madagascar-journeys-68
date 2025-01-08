import { Destination } from "../types";

export const westDestinations: Destination[] = [
  {
    id: 4,
    name: "Parc National de l'Andringitra",
    description: "Montagnes majestueuses et randonnées",
    long_description: "Le parc de l'Andringitra est un paradis pour les aventuriers...",
    price: 1000,
    main_image: "https://www.parcs-madagascar.com/parcs/images/andringitra/andringitra.jpg",
    gallery: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG5xTWN1RBB1Y1enFqTzPKkDtfvEmYITzTzA&s",
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/46/2f/24/caption.jpg?w=900&h=500&s=1"
    ],
    highlights: [
      "Ascension du Pic Boby",
      "Paysages variés",
      "Observation d'espèces endémiques",
      "Campements en pleine nature"
    ],
    included: [
      "Guide de randonnée",
      "Camping",
      "Entrées du parc"
    ],
    not_included: [
      "Hébergement en ville",
      "Équipement de camping"
    ],
    location: "Sud de Madagascar",
    duration: "4-6 jours recommandés",
    best_time_to_visit: "Avril à Octobre"
  }
];