import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import ReservationCard from "@/components/reservation/ReservationCard";
import { motion } from "framer-motion";
import InformationTab from "@/components/circuit/tabs/InformationTab";
import CircuitPlanTab from "@/components/circuit/tabs/CircuitPlanTab";
import LocationTab from "@/components/circuit/tabs/LocationTab";
import GalleryTab from "@/components/circuit/tabs/GalleryTab";
import ReviewsTab from "@/components/circuit/tabs/ReviewsTab";

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
          reviews (*)
        `)
        .ilike('name', id?.replace(/-/g, ' ') || '')
        .maybeSingle();

      if (circuitByName) {
        return circuitByName;
      }

      const numericId = parseInt(id || '');
      if (!isNaN(numericId)) {
        const { data: circuitById, error } = await supabase
          .from('circuits')
          .select(`
            *,
            reviews (*)
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

        return circuitById;
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
      <div className="min-h-screen bg-gray-50">
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

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />
      <Header />

      <div className="p-14" />
      <div className="max-w-6xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4 my-6"
        >
          <h1 className="text-3xl font-bold">{circuit.name}</h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <Tabs defaultValue="information" className="w-full">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="information">Information</TabsTrigger>
                  <TabsTrigger value="circuit-plan">Circuit Plan</TabsTrigger>
                  <TabsTrigger value="location">Location</TabsTrigger>
                  <TabsTrigger value="gallery">Gallery</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                <TabsContent value="information">
                  <InformationTab circuit={circuit} />
                </TabsContent>
                <TabsContent value="circuit-plan">
                  <CircuitPlanTab itinerary={circuit.itinerary || []} />
                </TabsContent>
                <TabsContent value="location">
                  <LocationTab circuit={circuit} />
                </TabsContent>
                <TabsContent value="gallery">
                  <GalleryTab 
                    images={[circuit.main_image, ...(circuit.gallery || [])].filter(Boolean)} 
                    title={circuit.name} 
                  />
                </TabsContent>
                <TabsContent value="reviews">
                  <ReviewsTab reviews={circuit.reviews || []} averageRating={averageRating} />
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="sticky top-24"
            >
              <ReservationCard
                price={circuit.price?.toString() || "0"}
                duration={`${circuit.duration_days} jours`}
                persons={circuit.persons || "2-8 personnes"}
              />
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CircuitDetail;