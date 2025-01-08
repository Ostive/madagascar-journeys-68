import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useMutation } from "@tanstack/react-query";
import { Label } from "@/components/ui/label"; 
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CreateCircuit = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    long_description: "",
    duration_days: 0,
    persons: "",
    price: 0,
    date_range: "",
    difficulty: "",
    main_image: "",
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { error } = await supabase
        .from('circuits')
        .insert([{
          ...data,
          rating: 0,
        }]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Circuit créé",
        description: "Le circuit a été créé avec succès.",
      });
      navigate('/admin/circuit');
    },
    onError: (error) => {
      console.error('Error creating circuit:', error);
      toast({
        title: "Erreur",
        description: "Impossible de créer le circuit. Veuillez réessayer.",
        variant: "destructive",
      });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(formData);
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" onClick={() => navigate('/admin/circuit')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour à la liste des circuits
        </Button>
        <h1 className="text-3xl font-bold">Créer un nouveau circuit</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div className="space-y-2">
          <Label>Titre</Label>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Entrez le titre du circuit"
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Description courte</Label>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Entrez une brève description"
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Description longue</Label>
          <Textarea
            name="long_description"
            value={formData.long_description}
            onChange={handleChange}
            placeholder="Entrez la description détaillée"
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Durée</Label>
          <Input
            type="number"
            name="duration_days"
            value={formData.duration_days}
            onChange={handleChange}
            placeholder="Ex: 7 jours"
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Nombre de personnes</Label>
          <Input
            name="persons"
            value={formData.persons}
            onChange={handleChange}
            placeholder="Ex: 2-8 personnes"
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Prix</Label>
          <Input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Entrez le prix"
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Période</Label>
          <Input
            name="date_range"
            value={formData.date_range}
            onChange={handleChange}
            placeholder="Ex: JUIN - AOÛT"
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Difficulté</Label>
          <Select
            value={formData.difficulty}
            onValueChange={(value) => setFormData(prev => ({ ...prev, difficulty: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez la difficulté" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Facile">Facile</SelectItem>
              <SelectItem value="Modéré">Modéré</SelectItem>
              <SelectItem value="Difficile">Difficile</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Image principale</Label>
          <Input
            name="main_image"
            value={formData.main_image}
            onChange={handleChange}
            placeholder="URL de l'image principale"
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={createMutation.isPending}
        >
          {createMutation.isPending ? "Création en cours..." : "Créer le circuit"}
        </Button>
      </form>
    </div>
  );
};

export default CreateCircuit;
