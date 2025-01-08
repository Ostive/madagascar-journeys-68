import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Label } from "@/components/ui/label";
import { Circuit } from "@/data/types";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormData {
  name: string;
  description: string;
  long_description: string;
  duration_days: number;
  persons: string;
  price: number;
  date_range: string;
  difficulty: string;
  main_image: string;
  gallery?: string[];
  included?: string[];
  not_included?: string[];
}

const EditCircuit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    long_description: "",
    duration_days: 0,
    persons: "",
    price: 0,
    date_range: "",
    difficulty: "",
    main_image: "",
    gallery: [],
    included: [],
    not_included: [],
  });

  const [newIncluded, setNewIncluded] = useState("");
  const [newNotIncluded, setNewNotIncluded] = useState("");
  const [newGalleryImage, setNewGalleryImage] = useState("");

  const { data: circuit, isLoading } = useQuery({
    queryKey: ['circuit', id],
    queryFn: async () => {
      const numericId = parseInt(id || '');
      if (isNaN(numericId)) throw new Error('Invalid ID');

      const { data, error } = await supabase
        .from('circuits')
        .select('*')
        .eq('id', numericId)
        .single();

      if (error) throw error;
      return data as Circuit;
    },
  });

  useEffect(() => {
    if (circuit) {
      setFormData({
        name: circuit.name,
        description: circuit.description || '',
        long_description: circuit.long_description || '',
        duration_days: circuit.duration_days,
        persons: circuit.persons || '',
        price: circuit.price || 0,
        date_range: circuit.date_range || '',
        difficulty: circuit.difficulty || '',
        main_image: circuit.main_image || '',
        gallery: circuit.gallery || [],
        included: circuit.included || [],
        not_included: circuit.not_included || [],
      });
    }
  }, [circuit]);

  const updateMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const numericId = parseInt(id || '');
      if (isNaN(numericId)) throw new Error('Invalid ID');

      const { error } = await supabase
        .from('circuits')
        .update(data)
        .eq('id', numericId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Circuit mis à jour",
        description: "Le circuit a été mis à jour avec succès.",
      });
      navigate('/admin/circuit');
    },
    onError: (error) => {
      console.error('Error updating circuit:', error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le circuit. Veuillez réessayer.",
        variant: "destructive",
      });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddIncluded = () => {
    if (newIncluded.trim()) {
      setFormData(prev => ({
        ...prev,
        included: [...(prev.included || []), newIncluded.trim()]
      }));
      setNewIncluded("");
    }
  };

  const handleAddNotIncluded = () => {
    if (newNotIncluded.trim()) {
      setFormData(prev => ({
        ...prev,
        not_included: [...(prev.not_included || []), newNotIncluded.trim()]
      }));
      setNewNotIncluded("");
    }
  };

  const handleAddGalleryImage = () => {
    if (newGalleryImage.trim()) {
      setFormData(prev => ({
        ...prev,
        gallery: [...(prev.gallery || []), newGalleryImage.trim()]
      }));
      setNewGalleryImage("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" onClick={() => navigate('/admin/circuit')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour à la liste des circuits
        </Button>
        <h1 className="text-3xl font-bold">Modifier le circuit</h1>
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
            value={formData.long_description || ""}
            onChange={handleChange}
            placeholder="Entrez la description détaillée"
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Durée</Label>
          <Input
            name="duration_days"
            type="number"
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
            name="price"
            type="number"
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

        <div className="space-y-2">
          <Label>Galerie d'images</Label>
          <div className="flex gap-2">
            <Input
              value={newGalleryImage}
              onChange={(e) => setNewGalleryImage(e.target.value)}
              placeholder="URL de l'image"
            />
            <Button type="button" onClick={handleAddGalleryImage}>
              Ajouter
            </Button>
          </div>
          <div className="mt-2">
            {formData.gallery?.map((img, index) => (
              <div key={index} className="flex items-center gap-2 mt-1">
                <span className="text-sm">{img}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      gallery: prev.gallery?.filter((_, i) => i !== index)
                    }));
                  }}
                >
                  Supprimer
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Inclus</Label>
          <div className="flex gap-2">
            <Input
              value={newIncluded}
              onChange={(e) => setNewIncluded(e.target.value)}
              placeholder="Élément inclus"
            />
            <Button type="button" onClick={handleAddIncluded}>
              Ajouter
            </Button>
          </div>
          <div className="mt-2">
            {formData.included?.map((item, index) => (
              <div key={index} className="flex items-center gap-2 mt-1">
                <span className="text-sm">{item}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      included: prev.included?.filter((_, i) => i !== index)
                    }));
                  }}
                >
                  Supprimer
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Non inclus</Label>
          <div className="flex gap-2">
            <Input
              value={newNotIncluded}
              onChange={(e) => setNewNotIncluded(e.target.value)}
              placeholder="Élément non inclus"
            />
            <Button type="button" onClick={handleAddNotIncluded}>
              Ajouter
            </Button>
          </div>
          <div className="mt-2">
            {formData.not_included?.map((item, index) => (
              <div key={index} className="flex items-center gap-2 mt-1">
                <span className="text-sm">{item}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      not_included: prev.not_included?.filter((_, i) => i !== index)
                    }));
                  }}
                >
                  Supprimer
                </Button>
              </div>
            ))}
          </div>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={updateMutation.isPending}
        >
          {updateMutation.isPending ? "Mise à jour en cours..." : "Mettre à jour le circuit"}
        </Button>
      </form>
    </div>
  );
};

export default EditCircuit;
