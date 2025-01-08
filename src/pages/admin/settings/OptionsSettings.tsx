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
import type { Tables } from "@/integrations/supabase/database.types";

type PackageOption = Tables['package_options']['Row'];
type HighlightOption = {
  id: number;
  description: string;
  created_at?: string;
  updated_at?: string;
};

const OptionsSettings = () => {
  const { toast } = useToast();
  const [highlights, setHighlights] = useState<HighlightOption[]>([]);
  const [packages, setPackages] = useState<PackageOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newHighlight, setNewHighlight] = useState("");
  const [newPackage, setNewPackage] = useState({
    description: "",
    is_included: true,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [highlightsRes, packagesRes] = await Promise.all([
        supabase.from('highlight_options').select('*').order('id', { ascending: true }),
        supabase.from('package_options').select('*').order('id', { ascending: true }),
      ]);

      if (highlightsRes.error) throw highlightsRes.error;
      if (packagesRes.error) throw packagesRes.error;

      setHighlights(highlightsRes.data);
      setPackages(packagesRes.data);
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
        .from('highlight_options')
        .insert({ description: newHighlight })
        .select()
        .single();

      if (error) throw error;

      setHighlights([...highlights, data as HighlightOption]);
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
    if (!newPackage.description) return;
    try {
      const { data, error } = await supabase
        .from('package_options')
        .insert(newPackage)
        .select()
        .single();

      if (error) throw error;

      setPackages([...packages, data as PackageOption]);
      setNewPackage({ description: "", is_included: true });
      toast({
        title: "Succès",
        description: "Option de package ajoutée",
      });
    } catch (error) {
      console.error("Error adding package option:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter l'option de package",
        variant: "destructive",
      });
    }
  };

  const deleteHighlight = async (id: number) => {
    try {
      const { error } = await supabase
        .from('highlight_options')
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
        .from('package_options')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setPackages(packages.filter((p) => p.id !== id));
      toast({
        title: "Succès",
        description: "Option de package supprimée",
      });
    } catch (error) {
      console.error("Error deleting package option:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'option de package",
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
            Gérez la liste des options de package disponibles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4 items-end">
              <div className="flex-1 space-y-2">
                <Label>Description</Label>
                <Input
                  placeholder="Nouvelle option de package"
                  value={newPackage.description}
                  onChange={(e) =>
                    setNewPackage({ ...newPackage, description: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Type</Label>
                <Switch
                  checked={newPackage.is_included}
                  onCheckedChange={(checked) =>
                    setNewPackage({ ...newPackage, is_included: checked })
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
                  <TableHead>Description</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {packages.map((pkg) => (
                  <TableRow key={pkg.id}>
                    <TableCell>{pkg.description}</TableCell>
                    <TableCell>
                      {pkg.is_included ? "Inclus" : "Non inclus"}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => deletePackage(pkg.id)}
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