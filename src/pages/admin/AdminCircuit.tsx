import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Circuit } from "@/data/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Pencil, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const AdminCircuit = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Check if user is admin
  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Accès refusé",
          description: "Vous n'avez pas les droits d'accès à cette page.",
          variant: "destructive",
        });
        navigate("/");
      }
    };
    
    checkAdmin();
  }, [toast, navigate]);

  // Fetch circuits
  const { data: circuits, isLoading } = useQuery({
    queryKey: ['admin-circuits'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('circuits')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      // First delete related itineraries
      const { error: itineraryError } = await supabase
        .from('itineraries')
        .delete()
        .eq('circuit_id', id);

      if (itineraryError) throw itineraryError;

      // Then delete the circuit
      const { error } = await supabase
        .from('circuits')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-circuits'] });
      toast({
        title: "Circuit supprimé",
        description: "Le circuit a été supprimé avec succès.",
      });
    },
    onError: (error) => {
      console.error('Error deleting circuit:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le circuit.",
        variant: "destructive",
      });
    },
  });

  const handleDelete = async (id: number) => {
    deleteMutation.mutate(id);
  };

  const formatDate = (dateString: string | Date | undefined) => {
    if (!dateString) return 'N/A';
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gestion des Circuits</h1>
        <Button onClick={() => navigate("/admin/circuit/create")}>
          Créer un nouveau circuit
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center">Chargement...</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Titre</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Durée</TableHead>
              <TableHead>Prix</TableHead>
              <TableHead>Date de création</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {circuits?.map((circuit) => (
              <TableRow key={circuit.id}>
                <TableCell>{circuit.name}</TableCell>
                <TableCell className="max-w-md truncate">
                  {circuit.description}
                </TableCell>
                <TableCell>{circuit.duration_days} jours</TableCell>
                <TableCell>{circuit.price} €</TableCell>
                <TableCell>
                  {formatDate(circuit.created_at)}
                </TableCell>
                <TableCell className="space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => navigate(`/admin/circuit/${circuit.id}`)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => navigate(`/admin/circuit/edit/${circuit.id}`)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                        <AlertDialogDescription>
                          Êtes-vous sûr de vouloir supprimer ce circuit ? Cette action est irréversible.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(circuit.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Supprimer
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default AdminCircuit;