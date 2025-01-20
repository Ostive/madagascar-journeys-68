import { useLocation } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import CircuitCard from "@/components/cards/CircuitCard";
import { recommendCircuits } from '@/utils/recommendations';
import { Circuit } from '@/types';
import { circuits } from '@/data/circuits';
import { motion } from 'framer-motion';

export default function ResultsPage() {
  const location = useLocation();
  const preferences = location.state?.preferences || {};
  const recommendedCircuits = recommendCircuits(circuits, preferences);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 pt-24">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent mb-4">
              Circuits Recommandés
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Basé sur vos préférences, voici les circuits qui pourraient vous intéresser
            </p>
          </motion.div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedCircuits.length > 0 ? (
            recommendedCircuits.map((circuit: Circuit) => (
              <motion.div
                key={circuit.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <CircuitCard circuit={circuit} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <Card className="p-8 bg-white/40 backdrop-blur-sm border-emerald-100 shadow-lg shadow-emerald-100/20">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Aucun circuit trouvé
                </h3>
                <p className="text-gray-600">
                  Nous n'avons pas trouvé de circuits correspondant exactement à vos critères.
                  Essayez d'ajuster vos préférences pour voir plus d'options.
                </p>
              </Card>
            </div>
          )}
        </div>

        {/* Preferences Summary */}
        <Card className="mt-12 p-6 bg-white/40 backdrop-blur-sm border-emerald-100 shadow-lg shadow-emerald-100/20">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Vos préférences
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(preferences).map(([key, value]) => (
              <div key={key} className="space-y-1">
                <p className="text-sm text-gray-500 capitalize">
                  {key.replace(/_/g, ' ')}
                </p>
                <p className="text-base text-gray-900">
                  {Array.isArray(value) ? value.join(', ') : value}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}