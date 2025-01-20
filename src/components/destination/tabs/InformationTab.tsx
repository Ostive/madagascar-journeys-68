import React from 'react';
import { Destination } from '@/types';

interface InformationTabProps {
  destination: Destination;
}

const InformationTab = ({ destination }: InformationTabProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">À propos de {destination.name}</h2>
        <p className="text-gray-600">{destination.description}</p>
      </div>

      {destination.long_description && (
        <div>
          <h3 className="text-xl font-semibold mb-3">Description détaillée</h3>
          <p className="text-gray-600">{destination.long_description}</p>
        </div>
      )}

      <div>
        <h3 className="text-xl font-semibold mb-3">Informations pratiques</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-medium">Meilleure période</p>
            <p className="text-gray-600">{destination.best_time_to_visit}</p>
          </div>
          <div>
            <p className="font-medium">Durée recommandée</p>
            <p className="text-gray-600">{destination.duration}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationTab;