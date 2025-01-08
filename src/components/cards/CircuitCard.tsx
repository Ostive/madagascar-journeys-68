import React from 'react';
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
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
  return (
    <Link to={`/circuit/${circuit.id}`}>
      <Card 
        className={`relative w-72 h-96 overflow-hidden cursor-pointer group hover:scale-[1.02] transition-transform ${className}`}
      >
        {/* Background Image */}
        <img
          src={circuit.main_image}
          alt={circuit.name}
          className="absolute w-full h-full object-cover"
        />
        
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />

        {/* Top Content */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start text-white">
          <span className="text-sm bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
            {`${circuit.duration_days} jours`}
          </span>
          <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm">{circuit.rating}</span>
          </div>
        </div>

        {/* Bottom Content */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="text-xs mb-1 opacity-90">
            {circuit.date_range}
          </div>
          <div className="flex justify-between items-end">
            <h3 className="text-lg font-semibold">
              {circuit.name}
            </h3>
            <div className="text-xl font-bold">
              ${circuit.price}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default CircuitCard;