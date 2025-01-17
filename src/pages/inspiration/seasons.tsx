import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CircuitCard from "@/components/cards/CircuitCard";
import { seasonalCircuits } from "@/data/circuits";

const seasons = [
  {
    id: "dry",
    name: "Saison Sèche",
    months: "Avril - Octobre",
    description: "Climat idéal pour explorer l'île avec peu de pluie et des températures agréables",
    highlights: [
      "Parfait pour l'observation des lémuriens",
      "Idéal pour les randonnées",
      "Baleines à bosse (Juillet - Septembre)",
      "Routes plus facilement praticables"
    ],
    image: "https://images.unsplash.com/photo-1625457671853-5645c512f7e0?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: "wet",
    name: "Saison des Pluies",
    months: "Novembre - Mars",
    description: "Paysages verdoyants et cascades spectaculaires, avec des averses tropicales",
    highlights: [
      "Végétation luxuriante",
      "Prix plus avantageux",
      "Moins de touristes",
      "Cascades impressionnantes"
    ],
    image: "https://images.unsplash.com/photo-1589197331516-4d84b72ebee3?w=800&auto=format&fit=crop&q=60",
  }
];

export default function SeasonsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 pt-24">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent mb-4">
            Circuits par Saison
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Chaque saison à Madagascar offre une expérience unique. Découvrez les meilleurs
            moments pour visiter selon vos envies.
          </p>
        </div>

        {/* Seasons Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {seasons.map((season) => (
            <Card key={season.id} className="bg-white/40 backdrop-blur-sm border-emerald-100 shadow-lg shadow-emerald-100/20 p-6 rounded-2xl group overflow-hidden">
              <div className="relative h-48 -mx-6 -mt-6 mb-6 overflow-hidden">
                <img 
                  src={season.image} 
                  alt={season.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h3 className="absolute bottom-4 left-6 text-2xl font-bold text-white">
                  {season.name}
                </h3>
              </div>
              <div className="mb-4">
                <p className="text-sm font-semibold bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent mb-2">
                  {season.months}
                </p>
                <p className="text-gray-600">
                  {season.description}
                </p>
              </div>
              <ul className="space-y-2 mb-6">
                {season.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 mr-2" />
                    {highlight}
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-gradient-to-r from-emerald-400 to-teal-500 text-white rounded-full border-none hover:opacity-90 transition-opacity">
                Voir les circuits
              </Button>
            </Card>
          ))}
        </div>

        {/* Circuits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {seasonalCircuits.map((circuit) => (
            <CircuitCard key={circuit.id} circuit={circuit} />
          ))}
        </div>
      </div>
    </div>
  );
}
