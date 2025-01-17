import React from 'react';
import { useNavigate } from "react-router-dom";
import Card from "@/components/shared/Card";
import { Circuit } from "@/data/types";

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
    reviews: 24,
    nextDeparture: circuit.date_range || "Toute l'année",
  };

  return (
    <Card
      type="circuit"
      data={cardData}
      index={0}
      onClick={() => navigate(`/circuit/${circuit.id}`)}
    />
  );
};

export default CircuitCard;