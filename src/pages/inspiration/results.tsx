import React from 'react';
import { useNavigate } from 'react-router-dom';
import CircuitCard from "@/components/cards/CircuitCard";
import { Circuit } from '@/types';

interface ResultsProps {
  circuits: Circuit[];
  loading?: boolean;
}

const Results = ({ circuits, loading = false }: ResultsProps) => {
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>;
  }

  const bestMatches = circuits.slice(0, 3);
  const alternatives = circuits.slice(3);

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">Meilleures correspondances</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bestMatches.map((circuit) => (
            <CircuitCard
              key={circuit.id}
              circuit={circuit}
            />
          ))}
        </div>
      </section>

      {alternatives.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4">Autres suggestions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {alternatives.map((circuit) => (
              <CircuitCard
                key={circuit.id}
                circuit={circuit}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Results;