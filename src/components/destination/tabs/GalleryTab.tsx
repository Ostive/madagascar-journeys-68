import React from 'react';
import { Destination } from '@/types';
import { Card } from '@/components/ui/card';

interface GalleryTabProps {
  destination: Destination;
}

const GalleryTab = ({ destination }: GalleryTabProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Galerie photos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {destination.main_image && (
          <Card className="overflow-hidden">
            <img 
              src={destination.main_image} 
              alt={destination.name}
              className="w-full h-64 object-cover"
            />
          </Card>
        )}
      </div>
    </div>
  );
};

export default GalleryTab;