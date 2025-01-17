interface NavigationItem {
  title: string;
  name: string;
  path: string;
  href: string;
  image?: string;
  description?: string;
}

interface NavigationConfig {
  destinations: {
    title: string;
    path: string;
    submenu: NavigationItem[];
  };
  circuits: {
    title: string;
    path: string;
    submenu: NavigationItem[];
  };
  blog: {
    title: string;
    path: string;
    submenu: NavigationItem[];
  };
  about: {
    title: string;
    path: string;
  };
  contact: {
    title: string;
    path: string;
  };
}

export const navigationConfig: NavigationConfig = {
  destinations: {
    title: "Destinations",
    path: "/destinations",
    submenu: [
      {
        title: "Nord",
        name: "Nord",
        description: "Découvrez les plages paradisiaques et les îles du Nord",
        image: "https://eagjtgrzswxqaclxeuom.supabase.co/storage/v1/object/public/destinations/nord.webp",
        path: "/destinations?region=nord",
        href: "/destinations?region=nord",
      },
      {
        title: "Sud",
        name: "Sud",
        description: "Explorez les parcs nationaux et les paysages uniques du Sud",
        image: "https://eagjtgrzswxqaclxeuom.supabase.co/storage/v1/object/public/destinations/sud.webp",
        path: "/destinations?region=sud",
        href: "/destinations?region=sud",
      },
      {
        title: "Est",
        name: "Est",
        description: "Visitez les forêts tropicales et les côtes sauvages de l'Est",
        image: "https://eagjtgrzswxqaclxeuom.supabase.co/storage/v1/object/public/destinations/est.webp",
        path: "/destinations?region=est",
        href: "/destinations?region=est",
      },
      {
        title: "Ouest",
        name: "Ouest",
        description: "Admirez les baobabs et les formations rocheuses de l'Ouest",
        image: "https://eagjtgrzswxqaclxeuom.supabase.co/storage/v1/object/public/destinations/ouest.webp",
        path: "/destinations?region=ouest",
        href: "/destinations?region=ouest",
      },
      {
        title: "Centre",
        name: "Centre",
        description: "Découvrez la culture et l'histoire au cœur de Madagascar",
        image: "https://eagjtgrzswxqaclxeuom.supabase.co/storage/v1/object/public/destinations/centre.webp",
        path: "/destinations?region=centre",
        href: "/destinations?region=centre",
      },
    ],
  },
  circuits: {
    title: "Circuits",
    path: "/circuits",
    submenu: [
      {
        title: "Circuits populaires",
        name: "Circuits populaires",
        description: "Nos circuits les plus appréciés par nos voyageurs",
        image: "https://eagjtgrzswxqaclxeuom.supabase.co/storage/v1/object/public/circuits/populaires.webp",
        path: "/circuits?filter=popular",
        href: "/circuits?filter=popular",
      },
      {
        title: "Courts séjours",
        name: "Courts séjours",
        description: "Parfait pour un weekend ou une courte escapade",
        image: "https://eagjtgrzswxqaclxeuom.supabase.co/storage/v1/object/public/circuits/courts-sejours.webp",
        path: "/circuits?duration=court",
        href: "/circuits?duration=court",
      },
      {
        title: "Circuits en groupe",
        name: "Circuits en groupe",
        description: "Voyagez et partagez des expériences en groupe",
        image: "https://eagjtgrzswxqaclxeuom.supabase.co/storage/v1/object/public/circuits/groupe.webp",
        path: "/circuits?filter=group",
        href: "/circuits?filter=group",
      },
      {
        title: "Circuits sur mesure",
        name: "Circuits sur mesure",
        description: "Créez votre circuit personnalisé selon vos envies",
        image: "https://eagjtgrzswxqaclxeuom.supabase.co/storage/v1/object/public/circuits/sur-mesure.webp",
        path: "/circuits?filter=custom",
        href: "/circuits?filter=custom",
      },
      {
        title: "Circuits d'une semaine",
        name: "Circuits d'une semaine",
        description: "L'équilibre idéal pour découvrir une région",
        image: "https://eagjtgrzswxqaclxeuom.supabase.co/storage/v1/object/public/circuits/semaine.webp",
        path: "/circuits?duration=semaine",
        href: "/circuits?duration=semaine",
      },
      {
        title: "Grands circuits",
        name: "Grands circuits",
        description: "Une immersion complète dans la culture malgache",
        image: "https://eagjtgrzswxqaclxeuom.supabase.co/storage/v1/object/public/circuits/grands-circuits.webp",
        path: "/circuits?duration=long",
        href: "/circuits?duration=long",
      },
    ],
  },
  blog: {
    title: "Blog",
    path: "/blog",
    submenu: [
      {
        title: "Guides de voyage",
        name: "Guides de voyage",
        description: "Conseils et astuces pour votre voyage",
        image: "https://eagjtgrzswxqaclxeuom.supabase.co/storage/v1/object/public/blog/guides.webp",
        path: "/blog?category=guides",
        href: "/blog?category=guides",
      },
      {
        title: "Photographie",
        name: "Photographie",
        description: "Les plus beaux clichés de Madagascar",
        image: "https://eagjtgrzswxqaclxeuom.supabase.co/storage/v1/object/public/blog/photographie.webp",
        path: "/blog?category=photography",
        href: "/blog?category=photography",
      },
      {
        title: "Aventures",
        name: "Aventures",
        description: "Récits d'expériences et d'explorations",
        image: "https://eagjtgrzswxqaclxeuom.supabase.co/storage/v1/object/public/blog/aventures.webp",
        path: "/blog?category=adventures",
        href: "/blog?category=adventures",
      },
      {
        title: "Conseils pratiques",
        name: "Conseils pratiques",
        description: "Informations utiles pour votre séjour",
        image: "https://eagjtgrzswxqaclxeuom.supabase.co/storage/v1/object/public/blog/conseils.webp",
        path: "/blog?category=tips",
        href: "/blog?category=tips",
      },
      {
        title: "Guides des régions",
        name: "Guides des régions",
        description: "Explorez chaque région en détail",
        image: "https://eagjtgrzswxqaclxeuom.supabase.co/storage/v1/object/public/blog/guides.webp",
        path: "/blog/explorer-nord",
        href: "/blog/explorer-nord",
      },
      {
        title: "Inspirations",
        name: "Inspirations",
        description: "Des idées pour votre prochain voyage",
        image: "https://eagjtgrzswxqaclxeuom.supabase.co/storage/v1/object/public/blog/inspirations.webp",
        path: "/blog/top-plages",
        href: "/blog/top-plages",
      },
      {
        title: "Actualités",
        name: "Actualités",
        description: "Les dernières nouvelles de Madagascar",
        image: "https://eagjtgrzswxqaclxeuom.supabase.co/storage/v1/object/public/blog/actualites.webp",
        path: "/blog/evenements",
        href: "/blog/evenements",
      },
    ],
  },
  about: {
    title: "À propos",
    path: "/about",
  },
  contact: {
    title: "Contact",
    path: "/contact",
  },
} as const;
