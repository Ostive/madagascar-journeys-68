import { useParams } from "react-router-dom";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Check, X } from "lucide-react";
import Header from "@/components/Header";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import CircuitCard from "@/components/cards/CircuitCard";
import FAQ from "@/components/FAQ";
import GalleryGrid from "@/components/GaleryGrid";
import CardCarousel from "@/components/CardCarousel";
import ReservationCard from "@/components/reservation/ReservationCard";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface CircuitData {
  id: number;
  name: string;
  description: string;
  duration_days: number;
  price: number;
  short_description: string | null;
  long_description: string | null;
  persons: string | null;
  rating: number | null;
  date_range: string | null;
  main_image: string | null;
  difficulty: string | null;
  user_id: string | null;
}

const CircuitDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Fetch main circuit data
  const { data: circuit, isLoading } = useQuery({
    queryKey: ['circuit', id],
    queryFn: async () => {
      // First try to find by slug (id parameter)
      const { data: circuitByName, error: nameError } = await supabase
        .from('circuits')
        .select('*')
        .ilike('name', id?.replace(/-/g, ' ') || '')
        .maybeSingle();

      if (circuitByName) {
        return circuitByName;
      }

      // If not found by name, try as number ID
      const numericId = parseInt(id || '');
      if (!isNaN(numericId)) {
        const { data: circuitById, error } = await supabase
          .from('circuits')
          .select('*')
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

      // If neither found
      toast({
        title: "Error",
        description: "Circuit non trouvé",
        variant: "destructive",
      });
      navigate('/circuits');
      throw new Error("Circuit not found");
    },
  });

  // Fetch similar circuits
  const { data: similarCircuits } = useQuery({
    queryKey: ['similar-circuits', circuit?.difficulty],
    enabled: !!circuit,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('circuits')
        .select('*')
        .eq('difficulty', circuit.difficulty)
        .neq('id', circuit.id)
        .limit(3);

      if (error) {
        console.error('Error fetching similar circuits:', error);
        return [];
      }

      return data;
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

  const faqs = [
    {
      question: "Quelle est la meilleure période pour ce circuit ?",
      answer:
        "La meilleure période pour ce circuit est pendant la saison sèche, d'avril à octobre, lorsque les conditions météorologiques sont les plus favorables.",
    },
    {
      question: "Quel niveau de condition physique est requis ?",
      answer: `Ce circuit est de niveau ${circuit.difficulty?.toLowerCase() || 'modéré'}. Il est recommandé d'avoir une bonne condition physique et d'être habitué à la marche.`,
    },
    {
      question: "Les repas sont-ils inclus ?",
      answer:
        "Les repas principaux sont inclus dans le prix du circuit, sauf mention contraire dans la section 'Non inclus'.",
    },
    {
      question: "Que dois-je emporter ?",
      answer:
        "Nous vous recommandons d'emporter des vêtements adaptés à la saison, de bonnes chaussures de marche, un chapeau, de la crème solaire et une gourde.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />
      <Header />

      <div className="p-14" />
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4 my-6"
        >
          <h1 className="text-3xl font-bold">{circuit.name}</h1>
        </motion.div>

        <GalleryGrid images={[circuit.main_image || '']} title={circuit.name} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:pt-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Overview Card */}
              <Card className="mb-8">
                <CardHeader>
                  <h2 className="text-2xl font-semibold">Overview</h2>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{circuit.long_description || circuit.description}</p>
                </CardContent>
              </Card>

              {/* Included/Not Included */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <Card>
                  <CardHeader>
                    <h2 className="text-xl font-semibold">Ce qui est inclus</h2>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <Check className="text-emerald w-4 h-4" />
                        <span>Transport</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="text-emerald w-4 h-4" />
                        <span>Hébergement</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <h2 className="text-xl font-semibold">Non inclus</h2>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <X className="text-red-500 w-4 h-4" />
                        <span>Vols internationaux</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <X className="text-red-500 w-4 h-4" />
                        <span>Dépenses personnelles</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* FAQ Section */}
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <FAQ faqs={faqs} />
                </CardContent>
              </Card>

              {/* Similar Circuits */}
              {similarCircuits && similarCircuits.length > 0 && (
                <CardCarousel
                  items={similarCircuits}
                  CardComponent={CircuitCard}
                  itemPropName="circuit"
                  title="Circuits similaires"
                />
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
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