import React from 'react';
import { useNavigate } from "react-router-dom";
import Card from "@/components/shared/Card";
import { Destination } from '@/data/types';

interface DestinationCardProps {
  destination?: Destination;
  className?: string;
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
}: DestinationCardProps) => {
  const navigate = useNavigate();

  const cardData = {
    title: destination.name,
    image: destination.main_image,
    location: destination.location,
    duration: destination.duration,
    price: `${destination.price}€`,
    rating: 4.8,
    reviews: 156,
    tags: destination.highlights || [],
  };

  return (
    <Card
      type="destination"
      data={cardData}
      index={0}
      onClick={() => navigate(`/destination/${destination.id}`)}
    />
  );
};

export default DestinationCard;