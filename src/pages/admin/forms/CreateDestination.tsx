import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const CreateDestination = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    longDescription: "",
    price: "",
    location: "",
    duration: "",
    image: "",
    bestTimeToVisit: "",
    highlights: [] as string[],
    included: [] as string[],
    notIncluded: [] as string[],
  });

  // Check if user is admin
  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || user.email !== 'admin@example.com') {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('destinations')
        .insert([{
          title: formData.title,
          description: formData.description,
          long_description: formData.longDescription,
          price: formData.price,
          location: formData.location,
          duration: formData.duration,
          image: formData.image,
          best_time_to_visit: formData.bestTimeToVisit,
          highlights: formData.highlights,
          included: formData.included,
          not_included: formData.notIncluded,
          gallery: [formData.image],
        }]);

      if (error) throw error;

      toast({
        title: "Destination créée",
        description: "La destination a été créée avec succès.",
      });
      navigate('/admin/destination');
    } catch (error) {
      console.error('Error creating destination:', error);
      toast({
        title: "Erreur",
        description: "Impossible de créer la destination.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayInput = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: 'highlights' | 'included' | 'notIncluded'
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const value = (e.target as HTMLInputElement).value.trim();
      if (value) {
        setFormData((prev) => ({
          ...prev,
          [field]: [...prev[field], value]
        }));
        (e.target as HTMLInputElement).value = '';
      }
    }
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" onClick={() => navigate('/admin/destination')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour à la liste
        </Button>
        <h1 className="text-3xl font-bold">Créer une nouvelle destination</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Titre</label>
          <Input
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Entrez le titre"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Description courte</label>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Entrez une description courte"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Description longue</label>
          <Textarea
            name="longDescription"
            value={formData.longDescription}
            onChange={handleInputChange}
            placeholder="Entrez une description détaillée"
            className="min-h-[200px]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Prix</label>
          <Input
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Entrez le prix"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Localisation</label>
          <Input
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="Entrez la localisation"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Durée</label>
          <Input
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            placeholder="Entrez la durée"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Meilleure période</label>
          <Input
            name="bestTimeToVisit"
            value={formData.bestTimeToVisit}
            onChange={handleInputChange}
            placeholder="Entrez la meilleure période pour visiter"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Points forts (Appuyez sur Entrée pour ajouter)</label>
          <Input
            onKeyDown={(e) => handleArrayInput(e, 'highlights')}
            placeholder="Ajoutez un point fort"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.highlights.map((item, index) => (
              <div key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Inclus (Appuyez sur Entrée pour ajouter)</label>
          <Input
            onKeyDown={(e) => handleArrayInput(e, 'included')}
            placeholder="Ajoutez un élément inclus"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.included.map((item, index) => (
              <div key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Non inclus (Appuyez sur Entrée pour ajouter)</label>
          <Input
            onKeyDown={(e) => handleArrayInput(e, 'notIncluded')}
            placeholder="Ajoutez un élément non inclus"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.notIncluded.map((item, index) => (
              <div key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">URL de l'image</label>
          <Input
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            placeholder="Entrez l'URL de l'image"
            required
          />
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Création en cours...
            </>
          ) : (
            'Créer la destination'
          )}
        </Button>
      </form>
    </div>
  );
};

export default CreateDestination;