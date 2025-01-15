import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Star, MapPin, Clock, Calendar, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Circuit } from "@/data/types";

interface CircuitCardProps {
  circuit: Circuit;
  className?: string;
  compact?: boolean;
}

const CircuitCard = ({ 
  circuit,
  className = "",
  compact = false
}: CircuitCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  return (
    <Link to={`/circuit/${circuit.id}`}>
      <div className={`w-full max-w-md ${className}`}>
        {/* Image Section */}
        <div className="relative w-full aspect-[3/2] mb-3">
          <img
            src={circuit.main_image || "/placeholder.svg"}
            alt={`Vue de ${circuit.name}`}
            className="rounded-2xl object-cover w-full h-full"
          />
          <button 
            onClick={handleLike}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
            aria-label={isLiked ? "Unlike" : "Like"}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
          </button>
        </div>

        {/* Content Section */}
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-gray-900">
              {circuit.name}
            </h3>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium text-gray-700">
                {circuit.rating?.toFixed(1) || "4.5"}
              </span>
              <span className="text-sm text-gray-500">(24)</span>
            </div>
          </div>
          
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {circuit.tour_location || "Madagascar"}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-700">
                  {circuit.duration_days} jours
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-700">
                  {circuit.date_range || "Toute l'année"}
                </span>
              </div>
            </div>
            <div>
              <span className="font-bold text-lg">${circuit.price}</span>
              <span className="text-sm text-gray-500">/pers.</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CircuitCard;