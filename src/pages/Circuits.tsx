import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CircuitCard from "@/components/cards/CircuitCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const CircuitsPage = () => {
  const { toast } = useToast();
  
  const { data: circuits, isLoading } = useQuery({
    queryKey: ['circuits'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('circuits')
        .select('*')
        .eq('enabled', true)
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          title: "Error",
          description: "Impossible de charger les circuits",
          variant: "destructive",
        });
        throw error;
      }

      return data;
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />
      <Header />

      <div className="pt-32 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Nos Circuits</h1>
          <p className="text-gray-600 mb-8">
            Découvrez nos circuits guidés à travers Madagascar. Des itinéraires
            soigneusement conçus pour vous faire découvrir les merveilles de
            l'île.
          </p>

          <Card className="p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="text-emerald">⚡</span> Filtrer les circuits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Toutes les durées" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les durées</SelectItem>
                  <SelectItem value="short">Courts séjours</SelectItem>
                  <SelectItem value="medium">Séjours moyens</SelectItem>
                  <SelectItem value="long">Longs séjours</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Tous les budgets" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les budgets</SelectItem>
                  <SelectItem value="low">Économique</SelectItem>
                  <SelectItem value="medium">Intermédiaire</SelectItem>
                  <SelectItem value="high">Premium</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Difficulté" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les difficultés</SelectItem>
                  <SelectItem value="easy">Facile</SelectItem>
                  <SelectItem value="moderate">Modéré</SelectItem>
                  <SelectItem value="difficult">Difficile</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Taille du groupe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les groupes</SelectItem>
                  <SelectItem value="small">Petit groupe</SelectItem>
                  <SelectItem value="medium">Groupe moyen</SelectItem>
                  <SelectItem value="large">Grand groupe</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>

          {isLoading ? (
            <div className="text-center py-8">Chargement des circuits...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
              {circuits?.map((circuit) => (
                <CircuitCard key={circuit.id} circuit={circuit} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CircuitsPage;