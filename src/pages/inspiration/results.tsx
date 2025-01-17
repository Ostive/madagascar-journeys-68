import { useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CircuitCard } from "@/components/cards/CircuitCard";
import { recommendCircuits } from "@/utils/recommendations";

export default function RecommendationResultsPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const preferences = {
    duration: searchParams.get("duration"),
    budget: searchParams.get("budget"),
    travelStyle: searchParams.get("travelStyle"),
    interests: searchParams.getAll("interests"),
    activityLevel: searchParams.get("activityLevel"),
    seasonPreference: searchParams.get("seasonPreference"),
    groupSize: searchParams.get("groupSize"),
  };

  const recommendedCircuits = recommendCircuits(preferences);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1C2F] to-[#1F3B60] pt-24">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Vos Circuits Recommandés
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Basé sur vos préférences, voici une sélection de circuits qui correspondent
            le mieux à vos envies.
          </p>
        </div>

        {/* Preferences Summary */}
        <Card className="bg-white/10 border-white/10 p-6 rounded-2xl mb-12">
          <h2 className="text-xl font-semibold text-white mb-4">
            Vos Critères
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {preferences.duration && (
              <div>
                <p className="text-white/60 text-sm">Durée</p>
                <p className="text-white">{preferences.duration}</p>
              </div>
            )}
            {preferences.budget && (
              <div>
                <p className="text-white/60 text-sm">Budget</p>
                <p className="text-white">{preferences.budget}</p>
              </div>
            )}
            {preferences.travelStyle && (
              <div>
                <p className="text-white/60 text-sm">Style de voyage</p>
                <p className="text-white">{preferences.travelStyle}</p>
              </div>
            )}
            {preferences.activityLevel && (
              <div>
                <p className="text-white/60 text-sm">Niveau d'activité</p>
                <p className="text-white">{preferences.activityLevel}</p>
              </div>
            )}
          </div>
          <Button 
            variant="outline" 
            className="mt-4 text-white border-white/20 hover:bg-white/10"
            onClick={() => window.history.back()}
          >
            Modifier les critères
          </Button>
        </Card>

        {/* Best Matches */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            Meilleures Correspondances
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedCircuits.bestMatches?.map((circuit) => (
              <CircuitCard key={circuit.id} circuit={circuit} />
            ))}
          </div>
        </div>

        {/* Alternative Suggestions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            Autres Suggestions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedCircuits.alternatives?.map((circuit) => (
              <CircuitCard key={circuit.id} circuit={circuit} />
            ))}
          </div>
        </div>

        {/* Need Help Section */}
        <Card className="bg-white/10 border-white/10 p-6 rounded-2xl text-center">
          <h3 className="text-xl font-semibold text-white mb-4">
            Besoin d'aide pour choisir ?
          </h3>
          <p className="text-white/80 mb-6">
            Nos experts sont là pour vous aider à planifier votre voyage idéal.
            Contactez-nous pour un conseil personnalisé.
          </p>
          <Button className="bg-gradient-to-r from-emerald-400 to-teal-500 text-white hover:opacity-90">
            Contactez un expert
          </Button>
        </Card>
      </div>
    </div>
  );
}
