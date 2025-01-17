export const mockCircuit = {
  id: 1,
  name: "Aventure dans l'Est Malgache",
  description: "Un voyage inoubliable à travers les paysages les plus spectaculaires de l'Est de Madagascar",
  short_description: "Découvrez les merveilles de l'Est de Madagascar",
  long_description: `Partez à la découverte des trésors cachés de l'Est de Madagascar lors d'un circuit exceptionnel. Des plages paradisiaques de Sainte-Marie aux forêts tropicales d'Andasibe, en passant par le canal des Pangalanes, ce voyage vous fera découvrir la diversité naturelle et culturelle de cette région fascinante.

Ce circuit combine parfaitement aventure, détente et découverte culturelle. Vous aurez l'occasion d'observer les célèbres lémuriens dans leur habitat naturel, de vous détendre sur des plages de sable blanc, et de rencontrer les communautés locales pour comprendre leur mode de vie unique.`,
  duration_days: 12,
  price: 2450,
  persons: "2-8",
  rating: 4.8,
  date_range: "Avril à Novembre",
  main_image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=2071&auto=format&fit=crop",
  difficulty: "Modéré",
  tour_location: "Est de Madagascar",
  gallery: [
    "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=2071&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1581511096274-17a08458285d?q=80&w=2071&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1581511096274-17a08458285d?q=80&w=2071&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2074&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1583249598754-b7a2f59651fb?q=80&w=2070&auto=format&fit=crop"
  ],
  included: [
    "Transport en 4x4 climatisé",
    "Hébergement en hôtels 3* et lodges",
    "Pension complète",
    "Guide francophone",
    "Entrées des parcs et réserves",
    "Excursions mentionnées"
  ],
  not_included: [
    "Vols internationaux",
    "Assurance voyage",
    "Boissons",
    "Pourboires",
    "Dépenses personnelles"
  ],
  highlights: [
    "Observation des lémuriens à Andasibe",
    "Croisière sur le canal des Pangalanes",
    "Plages paradisiaques de Sainte-Marie",
    "Randonnée dans la forêt tropicale",
    "Rencontre avec les communautés locales",
    "Découverte de la vanille de Madagascar"
  ],
  departure_location: "Antananarivo",
  departure_time: "8:00",
  itinerary: [
    {
      day: 1,
      title: "Arrivée à Antananarivo",
      description: "Accueil à l'aéroport et transfert à l'hôtel. Briefing sur le circuit et dîner de bienvenue.",
      coordinates: [47.5079, -18.8792] as [number, number]
    },
    {
      day: 2,
      title: "Route vers Andasibe",
      description: "Départ pour Andasibe. Visite nocturne de la réserve pour observer les lémuriens nocturnes.",
      coordinates: [48.4184, -18.9283] as [number, number]
    },
    {
      day: 3,
      title: "Parc National d'Andasibe",
      description: "Journée complète dans le parc. Observation des Indris et autres espèces endémiques.",
      coordinates: [48.4184, -18.9283] as [number, number]
    },
    {
      day: 4,
      title: "Canal des Pangalanes",
      description: "Navigation sur le canal des Pangalanes. Découverte de la vie locale et de la flore.",
      coordinates: [48.8147, -18.1498] as [number, number]
    },
    {
      day: 5,
      title: "Tamatave",
      description: "Visite du plus grand port de Madagascar et de son marché aux épices.",
      coordinates: [49.4077, -18.1498] as [number, number]
    },
    {
      day: 6,
      title: "Île Sainte-Marie",
      description: "Vol pour Sainte-Marie. Installation à l'hôtel et temps libre sur la plage.",
      coordinates: [49.8505, -17.0935] as [number, number]
    },
    {
      day: 7,
      title: "Exploration de Sainte-Marie",
      description: "Tour de l'île en scooter. Visite du cimetière des pirates et des plages sauvages.",
      coordinates: [49.8505, -17.0935] as [number, number]
    },
    {
      day: 8,
      title: "Observation des baleines",
      description: "Sortie en mer pour observer les baleines à bosse (en saison).",
      coordinates: [49.8505, -17.0935] as [number, number]
    },
    {
      day: 9,
      title: "Île aux Nattes",
      description: "Excursion à l'Île aux Nattes. Snorkeling et détente sur les plages.",
      coordinates: [49.8615, -17.1035] as [number, number]
    },
    {
      day: 10,
      title: "Plantation de vanille",
      description: "Visite d'une plantation de vanille. Apprentissage du processus de production.",
      coordinates: [49.8505, -17.0935] as [number, number]
    },
    {
      day: 11,
      title: "Retour à Antananarivo",
      description: "Vol retour vers la capitale. Temps libre pour les derniers achats.",
      coordinates: [47.5079, -18.8792] as [number, number]
    },
    {
      day: 12,
      title: "Départ",
      description: "Transfert à l'aéroport pour votre vol retour.",
      coordinates: [47.5079, -18.8792] as [number, number]
    }
  ],
  reviews: [
    {
      id: 1,
      rating: 5,
      review_text: "Un circuit exceptionnel qui nous a permis de découvrir la vraie Madagascar. Notre guide était fantastique et les paysages à couper le souffle.",
      traveler_name: "Sophie et Pierre",
      circuit_id: 1
    },
    {
      id: 2,
      rating: 4.5,
      review_text: "Très belle organisation, hébergements de qualité. Les rencontres avec les locaux étaient authentiques et enrichissantes.",
      traveler_name: "Jean-Marc",
      circuit_id: 1
    },
    {
      id: 3,
      rating: 5,
      review_text: "L'observation des baleines à Sainte-Marie restera un moment inoubliable. Un circuit parfait pour les amoureux de la nature.",
      traveler_name: "Marie",
      circuit_id: 1
    }
  ]
};

export const mockSimilarCircuits = [
  {
    id: 2,
    name: "Sud Sauvage",
    description: "Exploration du Sud de Madagascar",
    duration_days: 10,
    price: 2200,
    main_image: "https://images.unsplash.com/photo-1583249598754-b7a2f59651fb?q=80&w=2070&auto=format&fit=crop",
    difficulty: "Modéré",
    tour_location: "Sud de Madagascar"
  },
  {
    id: 3,
    name: "Tsingy de l'Ouest",
    description: "Aventure dans les Tsingy",
    duration_days: 14,
    price: 2800,
    main_image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2074&auto=format&fit=crop",
    difficulty: "Modéré",
    tour_location: "Ouest de Madagascar"
  },
  {
    id: 4,
    name: "Route du Nord",
    description: "Les joyaux du Nord",
    duration_days: 11,
    price: 2350,
    main_image: "https://images.unsplash.com/photo-1581511096274-17a08458285d?q=80&w=2071&auto=format&fit=crop",
    difficulty: "Modéré",
    tour_location: "Nord de Madagascar"
  }
];
