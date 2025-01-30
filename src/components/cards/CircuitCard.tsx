import React from 'react';
import { useNavigate } from "react-router-dom";
import Card from "@/components/shared/Card";
import { Circuit } from "@/types";

interface CircuitCardProps {
  circuit: Circuit;
  className?: string;
}

const CircuitCard = ({ 
  circuit,
  className = "",
}: CircuitCardProps) => {
  const navigate = useNavigate();

  const cardData = {
    title: circuit.name,
    image: circuit.main_image || "/placeholder.svg",
    startLocation: circuit.tour_location || "Madagascar",
    duration: `${circuit.duration_days} jours`,
    price: `${circuit.price}€`,
    rating: circuit.rating || 4.5,
    reviews: circuit.reviews?.length || 24,
    nextDeparture: circuit.date_range || "Toute l'année",
    highlights: circuit.highlights || circuit.custom_highlights || [],
  };

  return (
    <Card
      type="circuit"
      data={cardData}
      index={0}
      onClick={() => navigate(`/circuit/${circuit.id}`)}
      className={className}
    />
  );
};

export default CircuitCard;