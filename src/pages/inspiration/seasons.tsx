import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CircuitCard } from "@/components/cards/CircuitCard";
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
    <div className="min-h-screen bg-gradient-to-b from-[#0B1C2F] to-[#1F3B60] pt-24">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Circuits par Saison
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Chaque saison à Madagascar offre une expérience unique. Découvrez les meilleurs
            moments pour visiter selon vos envies.
          </p>
        </div>

        {/* Seasons Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {seasons.map((season) => (
            <Card 
              key={season.id}
              className="bg-white/10 border-white/10 p-6 rounded-2xl"
            >
              <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                <img 
                  src={season.image} 
                  alt={season.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="text-2xl font-bold text-white">
                    {season.name}
                  </h3>
                  <p className="text-white/80">
                    {season.months}
                  </p>
                </div>
              </div>
              <p className="text-white/80 mb-4">
                {season.description}
              </p>
              <ul className="space-y-2 mb-6">
                {season.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-center text-white/70">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
                    {highlight}
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-gradient-to-r from-emerald-400 to-teal-500 text-white hover:opacity-90">
                Voir les circuits
              </Button>
            </Card>
          ))}
        </div>

        {/* Circuits by Season */}
        <div className="space-y-12">
          {seasons.map((season) => (
            <section key={season.id} className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Circuits {season.name}
                  </h2>
                  <p className="text-white/60">
                    {season.months}
                  </p>
                </div>
                <Button variant="outline" className="text-white border-white/20 hover:bg-white/10">
                  Voir tout
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {seasonalCircuits[season.id]?.slice(0, 3).map((circuit) => (
                  <CircuitCard key={circuit.id} circuit={circuit} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
