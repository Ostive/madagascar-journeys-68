import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import { Destination, Circuit } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InformationTab from "@/components/destination/tabs/InformationTab";
import LocationTab from "@/components/destination/tabs/LocationTab";
import GalleryTab from "@/components/destination/tabs/GalleryTab";
import ReviewsTab from "@/components/destination/tabs/ReviewsTab";
import { cn } from "@/lib/utils";
import { useState } from "react";
import CircuitMap from "@/components/maps/CircuitMap";
import ReservationCard from "@/components/reservation/ReservationCard";

const DestinationDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('information');

  const { data: destination, isLoading } = useQuery({
    queryKey: ['destination', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('destinations')
        .select('*')
        .eq('id', parseInt(id || '0', 10))
        .single();

      if (error) throw error;
      return data as Destination;
    },
  });

  const { data: cities } = useQuery({
    queryKey: ['cities', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cities')
        .select('*')
        .eq('destination_id', parseInt(id || '0', 10));

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title={destination.name} />
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="information">Information</TabsTrigger>
            <TabsTrigger value="location">Localisation</TabsTrigger>
            <TabsTrigger value="gallery">Galerie</TabsTrigger>
            <TabsTrigger value="reviews">Avis</TabsTrigger>
          </TabsList>
          <TabsContent value="information">
            <InformationTab destination={destination} />
          </TabsContent>
          <TabsContent value="location">
            <LocationTab destination={destination} />
          </TabsContent>
          <TabsContent value="gallery">
            <GalleryTab destination={destination} />
          </TabsContent>
          <TabsContent value="reviews">
            <ReviewsTab destination={destination} />
          </TabsContent>
        </Tabs>

        <CircuitMap 
          circuit={{
            id: destination.id,
            name: destination.name,
            description: destination.description,
            duration_days: 1,
            price: destination.price,
            coordinates: destination.coordinates
          }}
          cities={cities}
          className="w-full h-[400px] rounded-lg"
        />
        
        <ReservationCard
          price={`${destination.price}€`}
          duration={destination.duration}
          bestTimeToVisit={destination.best_time_to_visit}
          title={destination.name}
          description={destination.description}
          destinationId={destination.id.toString()}
        />
      </div>
    </div>
  );
};

export default DestinationDetail;
