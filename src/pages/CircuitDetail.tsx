import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import { Circuit } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InformationTab from "@/components/circuit/tabs/InformationTab";
import LocationTab from "@/components/circuit/tabs/LocationTab";
import GalleryTab from "@/components/circuit/tabs/GalleryTab";
import ReviewsTab from "@/components/circuit/tabs/ReviewsTab";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Info, Map, MapPin, Image, MessageSquare } from "lucide-react";
import CircuitCard from "@/components/cards/CircuitCard";
import CardCarousel from "@/components/CardCarousel";

const CircuitDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('information');

  const { data: circuit, isLoading } = useQuery({
    queryKey: ['circuit', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('circuits')
        .select('*')
        .eq('id', parseInt(id || '0', 10))
        .single();

      if (error) throw error;
      return data as Circuit;
    },
  });

  const { data: similarCircuits } = useQuery({
    queryKey: ['similar-circuits', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('circuits')
        .select('*')
        .neq('id', parseInt(id || '0', 10))
        .limit(4);

      if (error) throw error;
      return data as Circuit[];
    },
    enabled: !!circuit,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!circuit) {
    return <div>Circuit not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title={circuit.name} />
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="information">Information</TabsTrigger>
            <TabsTrigger value="location">Localisation</TabsTrigger>
            <TabsTrigger value="gallery">Galerie</TabsTrigger>
            <TabsTrigger value="reviews">Avis</TabsTrigger>
          </TabsList>
          <TabsContent value="information">
            <InformationTab circuit={circuit} />
          </TabsContent>
          <TabsContent value="location">
            <LocationTab circuit={circuit} />
          </TabsContent>
          <TabsContent value="gallery">
            <GalleryTab circuit={circuit} />
          </TabsContent>
          <TabsContent value="reviews">
            <ReviewsTab circuit={circuit} />
          </TabsContent>
        </Tabs>
      </div>
      {similarCircuits && similarCircuits.length > 0 && (
        <div className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Circuits similaires</h2>
            <CardCarousel>
              {similarCircuits.map((circuit) => (
                <CircuitCard key={circuit.id} circuit={circuit} />
              ))}
            </CardCarousel>
          </div>
        </div>
      )}
    </div>
  );
};

export default CircuitDetail;
