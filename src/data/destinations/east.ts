import { Destination } from "../types";

export const eastDestinations: Destination[] = [
  {
    id: 2,
    name: "Parc National de Masoala",
    description: "Forêt tropicale et biodiversité exceptionnelle",
    long_description: "Situé au nord-est de Madagascar, le Parc National de Masoala est une destination incontournable...",
    price: 1000,
    main_image: "https://my-make-bucket.s3.eu-north-1.amazonaws.com/Photos/n23fvkcer7vlg7vmb1w9.webp",
    gallery: [
      "https://madagascar-green-island-discovery.com/wp-content/uploads/2020/07/Masoala.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQfxylJSCBpFk1y0tjS_pP3kCul1IAd2xQjw&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2K6fC5u4bb6MbVo83bFI4aER3GkcVoeZaww&s"
    ],
    highlights: [
      "Observation des lémuriens",
      "Randonnées en pleine jungle",
      "Plages et récifs préservés",
      "Excursions en kayak"
    ],
    included: [
      "Guide expérimenté",
      "Hébergement en écolodge",
      "Entrées du parc",
      "Petit-déjeuner inclus"
    ],
    not_included: [
      "Vols et transferts",
      "Repas supplémentaires",
      "Assurance voyage",
      "Équipement spécialisé"
    ],
    location: "Nord-est de Madagascar",
    duration: "3-7 jours recommandés",
    best_time_to_visit: "Avril à Novembre"
  }
];