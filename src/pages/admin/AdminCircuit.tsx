import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { Circuit } from "@/types";

const AdminCircuit = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: circuits, isLoading, refetch } = useQuery({
    queryKey: ['admin-circuits'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('circuits')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const handleDelete = async (circuitId: number) => {
    try {
      // First delete related records
      const { error: itinerariesError } = await supabase
        .from('itineraries')
        .delete()
        .eq('circuit_id', circuitId);

      if (itinerariesError) throw itinerariesError;

      const { error: circuitError } = await supabase
        .from('circuits')
        .delete()
        .eq('id', circuitId);

      if (circuitError) throw circuitError;

      toast({
        title: "Circuit supprimé",
        description: "Le circuit a été supprimé avec succès",
      });

      // Refresh the circuits list
      refetch();
    } catch (error) {
      console.error('Error deleting circuit:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression du circuit",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <h1>Admin Circuit</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {circuits?.map((circuit: Circuit) => (
            <li key={circuit.id}>
              <h2>{circuit.name}</h2>
              <button onClick={() => handleDelete(circuit.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminCircuit;
