import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { PlusCircle, Pencil, Trash2, Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Destination } from "@/data/types";
import { useToast } from "@/hooks/use-toast";

const AdminDestination = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('destinations')
        .select('*')
        .order('id', { ascending: false });

      if (error) throw error;

      // Map the data to include empty arrays for the array fields
      const mappedData = data.map(d => ({
        ...d,
        gallery: [],
        highlights: [],
        included: [],
        not_included: []
      }));

      setDestinations(mappedData);
    } catch (error) {
      console.error('Error fetching destinations:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les destinations",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase
        .from('destinations')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Succès",
        description: "La destination a été supprimée",
      });

      fetchDestinations();
    } catch (error) {
      console.error('Error deleting destination:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la destination",
        variant: "destructive"
      });
    }
  };

  const formatPrice = (price: number | null) => {
    if (!price) return 'N/A';
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gestion des destinations</h1>
        <Button onClick={() => navigate('/admin/destination/create')}>
          <PlusCircle className="w-4 h-4 mr-2" />
          Nouvelle destination
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : destinations.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Aucune destination n'a été créée</p>
          <Button 
            className="mt-4"
            onClick={() => navigate('/admin/destination/create')}
          >
            Créer votre première destination
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Localisation</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {destinations.map((destination) => (
                <TableRow key={destination.id}>
                  <TableCell className="font-medium">{destination.name}</TableCell>
                  <TableCell>{destination.description}</TableCell>
                  <TableCell>{formatPrice(destination.price)}</TableCell>
                  <TableCell>{destination.location}</TableCell>
                  <TableCell className="space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/admin/destination/edit/${destination.id}`)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(destination.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default AdminDestination;