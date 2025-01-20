import React from 'react';
import { Destination } from '@/types';

interface ReviewsTabProps {
  destination: Destination;
}

const ReviewsTab = ({ destination }: ReviewsTabProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Avis des voyageurs</h2>
      <div className="text-center text-gray-500">
        Aucun avis pour le moment
      </div>
    </div>
  );
};

export default ReviewsTab;