import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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

const CircuitDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();

  const { data: circuit, isLoading } = useQuery({
    queryKey: ['circuit', id],
    queryFn: async () => {
      const { data: circuitByName, error: nameError } = await supabase
        .from('circuits')
        .select(`
          *,
          reviews (*),
          itineraries (
            day_number,
            activities
          )
        `)
        .ilike('name', id?.replace(/-/g, ' ') || '')
        .maybeSingle();

      if (circuitByName) {
        // Transform itineraries into the expected format
        const transformedCircuit = {
          ...circuitByName,
          itinerary: circuitByName.itineraries?.map((item: any) => ({
            day: item.day_number,
            title: `Day ${item.day_number}`,
            description: item.activities || ''
          })) || []
        };
        return transformedCircuit;
      }

      const numericId = parseInt(id || '');
      if (!isNaN(numericId)) {
        const { data: circuitById, error } = await supabase
          .from('circuits')
          .select(`
            *,
            reviews (*),
            itineraries (
              day_number,
              activities
            )
          `)
          .eq('id', numericId)
          .maybeSingle();

        if (error) {
          toast({
            title: "Error",
            description: "Circuit non trouvé",
            variant: "destructive",
          });
          navigate('/circuits');
          throw error;
        }

        if (!circuitById) {
          toast({
            title: "Error",
            description: "Circuit non trouvé",
            variant: "destructive",
          });
          navigate('/circuits');
          throw new Error("Circuit not found");
        }

        // Transform itineraries into the expected format
        const transformedCircuit = {
          ...circuitById,
          itinerary: circuitById.itineraries?.map((item: any) => ({
            day: item.day_number,
            title: `Day ${item.day_number}`,
            description: item.activities || ''
          })) || []
        };
        return transformedCircuit;
      }

      toast({
        title: "Error",
        description: "Circuit non trouvé",
        variant: "destructive",
      });
      navigate('/circuits');
      throw new Error("Circuit not found");
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <TopBar />
        <Header />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-96 bg-gray-200 rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!circuit) {
    return (
      <div className="min-h-screen bg-gray-50">
        <TopBar />
        <Header />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Circuit non trouvé</h1>
            <p className="mt-2 text-gray-600">Le circuit que vous recherchez n'existe pas.</p>
          </div>
        </div>
      </div>
    );
  }

  const averageRating = circuit.reviews?.length
    ? circuit.reviews.reduce((acc: number, review: any) => acc + (review.rating || 0), 0) / circuit.reviews.length
    : 0;

  const [activeTab, setActiveTab] = useState('information');

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />
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
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative h-full max-w-6xl mx-auto px-4 flex flex-col justify-end pb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-white space-y-4"
          >
            <h1 className="text-4xl md:text-5xl font-bold">{circuit?.name}</h1>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <i className="fas fa-star text-yellow-400" />
                {averageRating.toFixed(1)}
              </span>
              <span>•</span>
              <span>{circuit?.duration} jours</span>
              <span>•</span>
              <span>{circuit?.difficulty}</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="sticky top-24 bg-white border-none shadow-sm">
              <div className="flex flex-col">
                {/* Custom Tabs */}
                <div className="bg-white">
                  <div className="flex space-x-8 px-6">
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
                            "relative py-4 text-sm font-medium transition-colors focus:outline-none",
                            "flex items-center gap-2",
                            activeTab === tab.id 
                              ? "text-primary" 
                              : "text-muted-foreground hover:text-primary"
                          )}
                        >
                          <Icon className="w-4 h-4" />
                          {tab.label}
                          {activeTab === tab.id && (
                            <motion.div
                              layoutId="activeTabIndicator"
                              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
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
                <div className="p-6 bg-white">
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
            <div className="sticky top-24">
              <ReservationCard circuit={circuit} />
              
              {/* Quick Info Card */}
              <Card className="mt-6 p-6">
                <h3 className="font-semibold text-lg mb-4">Points forts du circuit</h3>
                <ul className="space-y-3">
                  {circuit?.highlights?.map((highlight: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <i className="fas fa-check-circle text-green-500 mt-1" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CircuitDetail;