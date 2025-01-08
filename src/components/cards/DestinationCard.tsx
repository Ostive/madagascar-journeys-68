import React from 'react';
import { Card } from "@/components/ui/card";
import { MapPin, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Destination } from '@/data/types';

interface DestinationCardProps {
  destination?: Destination;
  className?: string;
  compact?: boolean;
}

const sampleDestination: Destination = {
  id: 1,
  name: "Bali Paradise",
  main_image: "/api/placeholder/400/500",
  location: "Indonesia",
  best_time_to_visit: "JUN - SEP",
  price: 285,
  description: "",
  long_description: "",
  gallery: [],
  highlights: [],
  included: [],
  not_included: [],
  duration: "7 days"
};

const DestinationCard = ({ 
  destination = sampleDestination,
  className = "",
  compact = false
}: DestinationCardProps) => {
  return (
    <Link to={`/destination/${destination.id}`}>
      <Card 
        className={`relative w-72 h-96 overflow-hidden cursor-pointer group hover:scale-[1.02] transition-transform ${className}`}
      >
        {/* Background Image */}
        <img
          src={destination.main_image}
          alt={destination.name}
          className="absolute w-full h-full object-cover"
        />
        
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />

        {/* Top Content */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start text-white">
          <span className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
            <MapPin className="w-4 h-4" />
            {destination.location}
          </span>
        </div>

        {/* Bottom Content */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="flex items-center gap-1.5 text-xs mb-1 opacity-90">
            <Calendar className="w-3.5 h-3.5" />
            {destination.best_time_to_visit}
          </div>
          <div className="flex justify-between items-end">
            <h3 className="text-lg font-semibold">
              {destination.name}
            </h3>
            <div className="text-xl font-bold">
              ${destination.price}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default DestinationCard;