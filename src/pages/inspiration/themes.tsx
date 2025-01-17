import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CircuitCard from "@/components/cards/CircuitCard";
import { themeCircuits } from "@/data/circuits";

const themes = [
  {
    id: "nature",
    name: "Nature & Faune",
    description: "Parcs nationaux et observation de la faune endémique",
    image: "https://images.unsplash.com/photo-1625457674917-f632347961d1?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: "culture",
    name: "Culture & Traditions",
    description: "Immersion dans la culture malgache",
    image: "https://images.unsplash.com/photo-1589197331516-4d84b72ebee3?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: "adventure",
    name: "Aventure",
    description: "Randonnées et sports extrêmes",
    image: "https://images.unsplash.com/photo-1625457671853-5645c512f7e0?w=800&auto=format&fit=crop&q=60",
  },
  {
    id: "beach",
    name: "Plages & Îles",
    description: "Détente sur les plus belles plages",
    image: "https://images.unsplash.com/photo-1625457675650-d6a114727377?w=800&auto=format&fit=crop&q=60",
  },
];

export default function ThemesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 pt-24">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent mb-4">
            Circuits par Thèmes
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choisissez parmi nos thématiques et découvrez des circuits adaptés à vos centres d'intérêt.
          </p>
        </div>

        {/* Themes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {themes.map((theme) => (
            <Card 
              key={theme.id}
              className="bg-white/40 backdrop-blur-sm border-emerald-100 shadow-lg shadow-emerald-100/20 p-6 rounded-2xl group overflow-hidden"
            >
              <div className="relative h-48 -mx-6 -mt-6 mb-6 overflow-hidden">
                <img 
                  src={theme.image} 
                  alt={theme.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h3 className="absolute bottom-4 left-6 text-2xl font-bold text-white">
                  {theme.name}
                </h3>
              </div>
              <p className="text-gray-600 mb-6">
                {theme.description}
              </p>
              <Button className="w-full bg-gradient-to-r from-emerald-400 to-teal-500 text-white rounded-full border-none hover:opacity-90 transition-opacity">
                Explorer
              </Button>
            </Card>
          ))}
        </div>

        {/* Circuits by Theme */}
        <div className="space-y-12">
          {themes.map((theme) => (
            <section key={theme.id} className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent">
                  Circuits {theme.name}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {themeCircuits[theme.id as keyof typeof themeCircuits]?.map((circuit) => (
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
