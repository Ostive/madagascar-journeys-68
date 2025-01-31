import React from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Edit, 
  Eye, 
  Trash2, 
  PlusCircle 
} from "lucide-react";
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
      // Confirm deletion
      const confirmDelete = window.confirm("Are you sure you want to delete this circuit?");
      if (!confirmDelete) return;

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
        title: "Circuit Deleted",
        description: "The circuit was successfully removed",
      });

      // Refresh the circuits list
      refetch();
    } catch (error) {
      console.error('Error deleting circuit:', error);
      toast({
        title: "Error",
        description: "Could not delete the circuit",
        variant: "destructive"
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Circuit Management</CardTitle>
          <Button 
            onClick={() => navigate('/admin/circuits/create')}
            className="flex items-center gap-2"
          >
            <PlusCircle size={16} /> Create New Circuit
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4}>Loading circuits...</TableCell>
              </TableRow>
            ) : (
              circuits?.map((circuit) => (
                <TableRow key={circuit.id}>
                  <TableCell>{circuit.name}</TableCell>
                  <TableCell>{circuit.duration_days} days</TableCell>
                  <TableCell>${circuit.price}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => navigate(`/admin/circuits/${circuit.id}`)}
                        title="View Details"
                      >
                        <Eye size={16} />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => navigate(`/admin/circuits/edit/${circuit.id}`)}
                        title="Edit Circuit"
                      >
                        <Edit size={16} />
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="icon"
                        onClick={() => handleDelete(circuit.id)}
                        title="Delete Circuit"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminCircuit;
