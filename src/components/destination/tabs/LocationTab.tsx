import React from 'react';
import { Destination } from '@/types';

interface LocationTabProps {
  destination: Destination;
}

const LocationTab = ({ destination }: LocationTabProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Localisation</h2>
        <p className="text-gray-600">
          {destination.location}
        </p>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-3">Direction</h3>
        <p className="text-gray-600">
          {destination.direction}
        </p>
      </div>
    </div>
  );
};

export default LocationTab;