import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";

interface Circuit {
  id: number;
  name: string;
  description: string;
  duration_days: number;
  price: number;
  short_description?: string;
  long_description?: string;
  persons?: string;
  rating?: number;
  date_range?: string;
  main_image?: string;
  difficulty?: string;
  user_id?: string;
  gallery?: string[];
  included?: string[];
  not_included?: string[];
  created_at?: string | Date;
  updated_at?: string | Date;
  tour_location?: string;
  itinerary?: Array<{
    day: number;
    title: string;
    description: string;
    coordinates?: [number, number];
  }>;
  reviews?: Array<{
    id: number;
    rating: number;
    review_text: string;
    author: string;
    date: string;
  }>;
  highlights?: string[];
  departure_location?: string;
  departure_time?: string;
  clothing_advisor?: {
    essential_items: string[];
    recommended_items: string[];
  };
  practical_info?: {
    health_safety: string[];
    best_time_to_visit: string[];
    accommodation: string[];
    transportation: string[];
  };
}

interface ReservationCardProps {
  price: string;
  duration?: string;
  persons?: string;
  bestTimeToVisit?: string;
  title?: string;
  description?: string;
  destinationId?: string;
}
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import ReservationCard from "@/components/reservation/ReservationCard";
import { motion, AnimatePresence } from "framer-motion";
import InformationTab from "@/components/circuit/tabs/InformationTab";
import CircuitPlanTab from "@/components/circuit/tabs/CircuitPlanTab";
import LocationTab from "@/components/circuit/tabs/LocationTab";
import GalleryTab from "@/components/circuit/tabs/GalleryTab";
import ReviewsTab from "@/components/circuit/tabs/ReviewsTab";
import GalleryGrid from "@/components/GaleryGrid";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Info, Map, MapPin, Image, MessageSquare } from "lucide-react";
import CircuitCard from "@/components/cards/CircuitCard";
import CardCarousel from "@/components/CardCarousel";
import { mockCircuit, mockSimilarCircuits } from "@/data/mockCircuit";

const CircuitDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('information');
  const { data: circuit, isLoading } = useQuery<Circuit>({
    queryKey: ['circuit', id],
    queryFn: async () => {
      // Simulate loading
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockCircuit;
    },
  });

  // Use mock similar circuits
  const { data: similarCircuits } = useQuery<Circuit[]>({
    queryKey: ['similar-circuits', id],
    queryFn: async () => {
      // Simulate loading
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockSimilarCircuits;
    },
    enabled: !!circuit,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 pt-16">
        <Header />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-emerald-200/50 rounded-3xl w-1/3 mb-4"></div>
            <div className="h-96 bg-emerald-200/50 rounded-3xl mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-emerald-200/50 rounded-3xl w-3/4"></div>
              <div className="h-4 bg-emerald-200/50 rounded-3xl w-2/3"></div>
              <div className="h-4 bg-emerald-200/50 rounded-3xl w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!circuit) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 pt-16">
        <Header />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent">
              Circuit non trouvé
            </h1>
            <p className="mt-2 text-gray-600">
              Le circuit que vous recherchez n'existe pas.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const averageRating = circuit?.reviews?.length
    ? circuit.reviews.reduce((acc, review) => acc + (review.rating || 0), 0) / circuit.reviews.length
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <Header />

      {/* Hero Section with Parallax Effect */}
      <div className="relative h-[60vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${circuit?.main_image})`,
            transform: 'scale(1.1)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 backdrop-blur-[2px]" />
        </div>
        <div className="relative h-full max-w-6xl mx-auto px-4 flex flex-col justify-end pb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-white space-y-4"
          >
            <h1 className="text-4xl md:text-5xl font-bold">{circuit?.name}</h1>
            <div className="flex items-center gap-4 text-white/90">
              <span className="flex items-center gap-1">
                <i className="fas fa-star text-yellow-400" />
                {averageRating.toFixed(1)}
              </span>
              <span>•</span>
              <span>{circuit?.duration_days} jours</span>
              <span>•</span>
              <span>{circuit?.difficulty}</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="sticky top-24 bg-white/80 backdrop-blur-md border-emerald-100/20 shadow-xl shadow-emerald-100/10 rounded-3xl overflow-hidden">
              <div className="flex flex-col">
                {/* Custom Tabs */}
                <div className="bg-white/90 backdrop-blur-md">
                  <div className="flex flex-nowrap overflow-x-auto hide-scrollbar px-8 border-b border-emerald-100/20">
                    {[
                      { id: 'information', label: 'Information', Icon: Info },
                      { id: 'circuit-plan', label: 'Circuit Plan', Icon: Map },
                      { id: 'location', label: 'Location', Icon: MapPin },
                      { id: 'gallery', label: 'Photos', Icon: Image },
                      { id: 'reviews', label: 'Reviews', Icon: MessageSquare }
                    ].map((tab) => {
                      const Icon = tab.Icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={cn(
                            "relative py-5 px-4 text-sm font-medium transition-all",
                            "flex items-center gap-2 whitespace-nowrap",
                            "hover:text-emerald-600",
                            activeTab === tab.id 
                              ? "text-emerald-600" 
                              : "text-gray-500"
                          )}
                        >
                          <Icon className={cn(
                            "w-4 h-4 transition-transform",
                            activeTab === tab.id && "scale-110"
                          )} />
                          {tab.label}
                          {activeTab === tab.id && (
                            <motion.div
                              layoutId="activeTabIndicator"
                              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-500"
                              initial={false}
                              transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 30
                              }}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Tab Content */}
                <div className="p-8 bg-white/80">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="w-full"
                    >
                      {activeTab === 'information' && <InformationTab circuit={circuit} />}
                      {activeTab === 'circuit-plan' && <CircuitPlanTab itinerary={circuit?.itinerary || []} />}
                      {activeTab === 'location' && <LocationTab circuit={circuit} />}
                      {activeTab === 'gallery' && (
                        <GalleryTab 
                          images={[circuit?.main_image, ...(circuit?.gallery || [])].filter(Boolean)}
                          title={circuit?.name || "Circuit Gallery"}
                        />
                      )}
                      {activeTab === 'reviews' && (
                        <ReviewsTab 
                          reviews={circuit?.reviews || []} 
                          averageRating={averageRating}
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {circuit && (
                <Card className="bg-white/80 backdrop-blur-md border-emerald-100/20 shadow-xl shadow-emerald-100/10 rounded-3xl overflow-hidden">
                  <ReservationCard 
                    price={circuit.price ? `€${circuit.price}` : 'Prix non disponible'}
                    duration={circuit.duration_days ? `${circuit.duration_days} jours` : ''}
                    title={circuit.name || ''}
                    description={circuit.description || ''}
                    destinationId={circuit.id?.toString() || ''}
                  />
                </Card>
              )}
              
              {/* Quick Info Card */}
              <Card className="bg-white/80 backdrop-blur-md border-emerald-100/20 shadow-xl shadow-emerald-100/10 rounded-3xl">
                <div className="p-8">
                  <h3 className="font-semibold text-xl bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent mb-6">
                    Points forts du circuit
                  </h3>
                  <ul className="space-y-4">
                    {circuit?.highlights?.map((highlight: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <i className="fas fa-check text-white text-xs" />
                        </div>
                        <span className="text-gray-600 leading-tight">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Circuits */}
      {similarCircuits && similarCircuits.length > 0 && (
        <div className="py-20 bg-gradient-to-br from-emerald-50/50 via-white to-teal-50/50">
          <div className="max-w-[1600px] mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent mb-12">
              Circuits similaires
            </h2>
            <CardCarousel
              items={similarCircuits}
              CardComponent={CircuitCard}
              itemPropName="circuit"
              cardWidth="w-[450px]"
              className="pb-8"
            />
          </div>
        </div>
      )}

  
    </div>
  );
};

export default CircuitDetail;
