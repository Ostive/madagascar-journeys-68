import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import CircuitCard from "./cards/CircuitCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const CircuitsSection = () => {
  const { data: circuits, isLoading } = useQuery({
    queryKey: ['featured-circuits'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('circuits')
        .select('*')
        .eq('enabled', true)
        .order('created_at', { ascending: false })
        .limit(4);

      if (error) throw error;
      return data;
    },
  });

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4">Nos Circuits</h2>
            <p className="text-gray-600 max-w-2xl">
              Explorez nos circuits guidés soigneusement conçus pour vous faire découvrir Madagascar
            </p>
          </div>
          <Button
            variant="outline"
            asChild
            className="hidden md:flex items-center gap-2 mt-4 md:mt-0 hover:bg-emerald hover:text-white"
          >
            <Link to="/circuits" className="flex items-center gap-2">
              Tous les circuits
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Circuit Cards */}
        {isLoading ? (
          <div className="text-center py-8">Chargement des circuits...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {circuits?.map((circuit) => (
              <CircuitCard key={circuit.id} circuit={circuit} />
            ))}
          </div>
        )}

        {/* Mobile Button */}
        <div className="mt-8 text-center md:hidden">
          <Button
            variant="outline"
            asChild
            className="w-full flex items-center justify-center gap-2 hover:bg-emerald hover:text-white"
          >
            <Link to="/circuits" className="flex items-center gap-2">
              Tous les circuits
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CircuitsSection;