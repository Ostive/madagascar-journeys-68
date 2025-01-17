import { Card } from "@/components/ui/card";
import { CircuitCard } from "@/components/cards/CircuitCard";
import { popularCircuits } from "@/data/circuits";

export default function PopularCircuitsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1C2F] to-[#1F3B60] pt-24">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Circuits Populaires
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Découvrez nos circuits les plus appréciés, sélectionnés par nos voyageurs
            pour leur authenticité et leur qualité.
          </p>
        </div>

        {/* Filters */}
        <Card className="bg-white/10 border-white/10 p-6 rounded-2xl mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Add filters here */}
          </div>
        </Card>

        {/* Circuits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {popularCircuits.map((circuit) => (
            <CircuitCard key={circuit.id} circuit={circuit} />
          ))}
        </div>
      </div>
    </div>
  );
}
