import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Option } from "@/types/options";
import { OptionsList } from "@/components/admin/options/OptionsList";
import { AddOptionForm } from "@/components/admin/options/AddOptionForm";

const OptionsSettings = () => {
  const { toast } = useToast();
  const [options, setOptions] = useState<Option[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchOptions();
  }, []);

  const fetchOptions = async () => {
    try {
      const { data: optionsData, error: optionsError } = await supabase
        .from('options')
        .select('*')
        .order('id', { ascending: true });

      if (optionsError) throw optionsError;
      setOptions(optionsData || []);
    } catch (error) {
      console.error("Error fetching options:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les options",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddOption = async (name: string, description: string) => {
    try {
      const { data, error } = await supabase
        .from('options')
        .insert({ name, description })
        .select()
        .single();

      if (error) throw error;

      setOptions([...options, data]);
      toast({
        title: "Succès",
        description: "Option ajoutée avec succès",
      });
    } catch (error) {
      console.error("Error adding option:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter l'option",
        variant: "destructive",
      });
    }
  };

  const handleDeleteOption = async (id: number) => {
    try {
      const { error } = await supabase
        .from('options')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setOptions(options.filter(option => option.id !== id));
      toast({
        title: "Succès",
        description: "Option supprimée avec succès",
      });
    } catch (error) {
      console.error("Error deleting option:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'option",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Options</CardTitle>
        <CardDescription>
          Gérez les options disponibles pour les destinations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <AddOptionForm onAdd={handleAddOption} />
          <OptionsList options={options} onDelete={handleDeleteOption} />
        </div>
      </CardContent>
    </Card>
  );
};

export default OptionsSettings;