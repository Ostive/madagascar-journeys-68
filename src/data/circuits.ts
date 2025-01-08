import { Circuit } from './types';

export const circuits: Circuit[] = [
  {
    id: 1,
    name: "Grand Tour de Madagascar",
    description: "Un voyage complet à travers les plus beaux sites de l'île",
    duration_days: 15,
    persons: "4-12 personnes",
    price: 2499,
    rating: 4.8,
    date_range: "1 JUIN - 15 JUIN",
    main_image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=2000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=2000&q=80"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrivée à Antananarivo",
        description: "Accueil à l'aéroport et transfert à l'hôtel. Briefing sur le voyage."
      },
      {
        day: 2,
        title: "Andasibe",
        description: "Départ pour le parc national d'Andasibe. Visite nocturne pour observer les lémuriens."
      },
      {
        day: 3,
        title: "Parc National d'Andasibe",
        description: "Randonnée dans le parc à la recherche des Indris et autres espèces endémiques."
      }
    ],
    included: [
      "Transport en 4x4 climatisé",
      "Hébergement en hôtels/lodges",
      "Guide francophone",
      "Entrées des parcs"
    ],
    not_included: [
      "Vols internationaux",
      "Visa",
      "Boissons",
      "Pourboires"
    ],
    difficulty: "Modéré"
  },
  {
    id: 2,
    name: "Route du Sud",
    description: "Découverte des parcs nationaux et des plages du Sud",
    long_description: "La Route du Sud vous emmène à la découverte des trésors cachés de Madagascar. Des hauts plateaux aux plages sauvages, en passant par les parcs nationaux, vous découvrirez la diversité des paysages et la richesse culturelle du sud de l'île.",
    duration_days: 8,
    persons: "6-10 personnes",
    price: 1299,
    rating: 4.6,
    date_range: "10 JUILLET - 17 JUILLET",
    main_image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=2000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=2000&q=80"
    ],
    itinerary: [
      {
        day: 1,
        title: "Départ de Tuléar",
        description: "Accueil et transfert. Visite de la ville et de son marché local."
      },
      {
        day: 2,
        title: "Ifaty",
        description: "Découverte des plages et de la forêt de baobabs."
      }
    ],
    included: [
      "Transport terrestre",
      "Hébergement",
      "Guide local",
      "Petit-déjeuner"
    ],
    not_included: [
      "Transport aérien",
      "Repas non mentionnés",
      "Activités optionnelles",
      "Assurance"
    ],
    difficulty: "Facile"
  },
  {
    id: 3,
    name: "Aventure Nord-Ouest",
    description: "Entre tsingys, baobabs et plages paradisiaques",
    long_description: "Partez à l'aventure dans le Nord-Ouest de Madagascar, une région qui regorge de merveilles naturelles. Des Tsingys de Bemaraha aux plages de Majunga, en passant par les baobabs, ce circuit vous fera découvrir des paysages uniques au monde.",
    duration_days: 12,
    persons: "4-8 personnes",
    price: 1899,
    rating: 4.9,
    date_range: "5 AOÛT - 16 AOÛT",
    main_image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=2000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?auto=format&fit=crop&w=2000&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=2000&q=80"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrivée à Majunga",
        description: "Accueil et installation. Découverte de la ville et du front de mer."
      },
      {
        day: 2,
        title: "Tsingys",
        description: "Journée d'exploration des Tsingys. Randonnée et via ferrata."
      }
    ],
    included: [
      "Transport en 4x4",
      "Hébergement en pension complète",
      "Guide spécialisé",
      "Matériel technique"
    ],
    not_included: [
      "Vols domestiques",
      "Boissons",
      "Dépenses personnelles",
      "Pourboires"
    ],
    difficulty: "Difficile"
  }
];
