import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type HighlightOption = {
  id: number;
  description: string;
};

type PackageOption = {
  id: number;
  name: string;
  description: string | null;
};

const OptionsSettings = () => {
  const { toast } = useToast();
  const [highlights, setHighlights] = useState<HighlightOption[]>([]);
  const [options, setOptions] = useState<PackageOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newHighlight, setNewHighlight] = useState("");
  const [newPackage, setNewPackage] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [highlightsRes, optionsRes] = await Promise.all([
        supabase.from('highlights').select('*').order('id', { ascending: true }),
        supabase.from('options').select('*').order('id', { ascending: true }),
      ]);

      if (highlightsRes.error) throw highlightsRes.error;
      if (optionsRes.error) throw optionsRes.error;

      setHighlights(highlightsRes.data);
      setOptions(optionsRes.data);
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

  const addHighlight = async () => {
    if (!newHighlight) return;
    try {
      const { data, error } = await supabase
        .from('highlights')
        .insert({ description: newHighlight })
        .select()
        .single();

      if (error) throw error;

      setHighlights([...highlights, data]);
      setNewHighlight("");
      toast({
        title: "Succès",
        description: "Point fort ajouté",
      });
    } catch (error) {
      console.error("Error adding highlight:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le point fort",
        variant: "destructive",
      });
    }
  };

  const addPackage = async () => {
    if (!newPackage.name) return;
    try {
      const { data, error } = await supabase
        .from('options')
        .insert(newPackage)
        .select()
        .single();

      if (error) throw error;

      setOptions([...options, data]);
      setNewPackage({ name: "", description: "" });
      toast({
        title: "Succès",
        description: "Option ajoutée",
      });
    } catch (error) {
      console.error("Error adding package option:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter l'option",
        variant: "destructive",
      });
    }
  };

  const deleteHighlight = async (id: number) => {
    try {
      const { error } = await supabase
        .from('highlights')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setHighlights(highlights.filter((h) => h.id !== id));
      toast({
        title: "Succès",
        description: "Point fort supprimé",
      });
    } catch (error) {
      console.error("Error deleting highlight:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le point fort",
        variant: "destructive",
      });
    }
  };

  const deletePackage = async (id: number) => {
    try {
      const { error } = await supabase
        .from('options')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setOptions(options.filter((p) => p.id !== id));
      toast({
        title: "Succès",
        description: "Option supprimée",
      });
    } catch (error) {
      console.error("Error deleting package option:", error);
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
          <CardTitle>Points forts</CardTitle>
          <CardDescription>
            Gérez la liste des points forts disponibles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <Input
                placeholder="Nouveau point fort"
                value={newHighlight}
                onChange={(e) => setNewHighlight(e.target.value)}
              />
              <Button onClick={addHighlight}>
                <Plus className="w-4 h-4 mr-2" />
                Ajouter
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead className="w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {highlights.map((highlight) => (
                  <TableRow key={highlight.id}>
                    <TableCell>{highlight.description}</TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => deleteHighlight(highlight.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Options de package</CardTitle>
          <CardDescription>
            Gérez la liste des options disponibles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4 items-end">
              <div className="flex-1 space-y-2">
                <Label>Nom</Label>
                <Input
                  placeholder="Nouvelle option"
                  value={newPackage.name}
                  onChange={(e) =>
                    setNewPackage({ ...newPackage, name: e.target.value })
                  }
                />
              </div>
              <div className="flex-1 space-y-2">
                <Label>Description</Label>
                <Input
                  placeholder="Description de l'option"
                  value={newPackage.description}
                  onChange={(e) =>
                    setNewPackage({ ...newPackage, description: e.target.value })
                  }
                />
              </div>
              <Button onClick={addPackage}>
                <Plus className="w-4 h-4 mr-2" />
                Ajouter
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {options.map((option) => (
                  <TableRow key={option.id}>
                    <TableCell>{option.name}</TableCell>
                    <TableCell>{option.description}</TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => deletePackage(option.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OptionsSettings;