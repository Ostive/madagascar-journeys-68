import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DestinationsNavBar from "@/components/DestinationsNavBar";
import { MapPin, Clock, Users } from "lucide-react";

const destinations = [
  {
    title: "Nosy Be",
    description: "Plages paradisiaques et eaux cristallines",
    duration: "7 jours",
    maxGroupSize: 12,
    type: "Plages & Détente",
    price: "1200",
    image: "/images/nosy-be.jpg"
  },
  {
    title: "Parc National d'Isalo",
    description: "Canyons spectaculaires et randonnées inoubliables",
    duration: "5 jours",
    maxGroupSize: 8,
    type: "Nature & Aventure",
    price: "800",
    image: "/images/isalo.jpg"
  },
  {
    title: "Allée des Baobabs",
    description: "Paysages iconiques et couchers de soleil magiques",
    duration: "3 jours",
    maxGroupSize: 10,
    type: "Culture & Histoire",
    price: "600",
    image: "/images/baobabs.jpg"
  },
  {
    title: "Île Sainte-Marie",
    description: "Paradis tropical et observation des baleines",
    duration: "6 jours",
    maxGroupSize: 8,
    type: "Plages & Détente",
    price: "950",
    image: "/images/sainte-marie.jpg"
  },
  {
    title: "Tsingy de Bemaraha",
    description: "Formations rocheuses uniques au monde",
    duration: "4 jours",
    maxGroupSize: 6,
    type: "Nature & Aventure",
    price: "1100",
    image: "/images/tsingy.jpg"
  }
];

const DestinationsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <DestinationsNavBar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <Card key={destination.title} className="overflow-hidden group">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 right-4 bg-emerald text-white px-3 py-1 rounded-full text-sm">
                  {destination.type}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-poppins font-semibold mb-2">
                  {destination.title}
                </h3>
                <p className="text-dark/70 mb-4 font-opensans">
                  {destination.description}
                </p>
                <div className="flex items-center gap-4 mb-4 text-sm text-dark/70">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {destination.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    Max {destination.maxGroupSize} pers.
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold text-emerald">
                    À partir de {destination.price}€
                  </p>
                  <Button variant="outline" className="hover:bg-emerald hover:text-white">
                    En savoir plus
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DestinationsPage;