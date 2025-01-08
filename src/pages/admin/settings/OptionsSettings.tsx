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
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: optionsData, error: optionsError } = await supabase
        .from('options')
        .select('*')
        .order('id', { ascending: true });

      if (optionsError) throw optionsError;
      setOptions(optionsData);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les données",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addOption = async (name: string, description: string) => {
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
        description: "Option ajoutée",
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

  const deleteOption = async (id: number) => {
    try {
      const { error } = await supabase
        .from('options')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setOptions(options.filter((o) => o.id !== id));
      toast({
        title: "Succès",
        description: "Option supprimée",
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
    <div className="container mx-auto p-8 space-y-8">
      <h1 className="text-3xl font-bold mb-8">Gestion des options</h1>

      <Card>
        <CardHeader>
          <CardTitle>Options</CardTitle>
          <CardDescription>
            Gérez la liste des options disponibles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <AddOptionForm onAdd={addOption} />
            <OptionsList options={options} onDelete={deleteOption} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OptionsSettings;