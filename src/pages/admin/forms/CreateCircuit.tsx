import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useMutation } from "@tanstack/react-query";
import CircuitBasicInfo from "@/components/admin/forms/circuit/CircuitBasicInfo";
import CircuitPricing from "@/components/admin/forms/circuit/CircuitPricing";
import CircuitLogistics from "@/components/admin/forms/circuit/CircuitLogistics";
import CircuitItinerary from "@/components/admin/forms/circuit/CircuitItinerary";
import CircuitGallery from "@/components/admin/forms/circuit/CircuitGallery";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ItineraryDay {
  day_number: number;
  activities?: string;
  travel_duration?: string;
}

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
    departure_location: "",
    departure_time: "",
    return_time: "",
    dress_code: "",
    tour_location: "",
    main_image: "",
    gallery: [] as string[],
    enabled: true,
  });

  const [itinerary, setItinerary] = useState<ItineraryDay[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      setIsSubmitting(true);
      
      // First, create the circuit
      const { data: circuitData, error: circuitError } = await supabase
        .from('circuits')
        .insert([{
          ...data,
          rating: 0,
          user_id: (await supabase.auth.getUser()).data.user?.id,
        }])
        .select()
        .single();
      
      if (circuitError) throw circuitError;

      // Then, create the itinerary
      if (itinerary.length > 0) {
        const { error: itineraryError } = await supabase
          .from('itineraries')
          .insert(
            itinerary.map(day => ({
              ...day,
              circuit_id: circuitData.id,
            }))
          );
        
        if (itineraryError) throw itineraryError;
      }

      return circuitData;
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
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (itinerary.length === 0) {
      toast({
        title: "Attention",
        description: "Veuillez ajouter au moins un jour à l'itinéraire.",
        variant: "destructive",
      });
      return;
    }

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
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex items-center space-x-2">
          <Switch
            id="enabled"
            checked={formData.enabled}
            onCheckedChange={(checked) => 
              setFormData(prev => ({ ...prev, enabled: checked }))
            }
          />
          <Label htmlFor="enabled">Circuit actif</Label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <CircuitBasicInfo formData={formData} handleChange={handleChange} />
            <CircuitPricing 
              formData={formData} 
              handleChange={handleChange}
              handleSelectChange={handleSelectChange}
            />
            <CircuitLogistics formData={formData} handleChange={handleChange} />
          </div>

          <div className="space-y-8">
            <CircuitGallery
              mainImage={formData.main_image}
              gallery={formData.gallery}
              onMainImageChange={(url) => setFormData(prev => ({ ...prev, main_image: url }))}
              onGalleryChange={(urls) => setFormData(prev => ({ ...prev, gallery: urls }))}
            />
            <CircuitItinerary
              itinerary={itinerary}
              onItineraryChange={setItinerary}
            />
          </div>
        </div>
        
        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Création en cours..." : "Créer le circuit"}
        </Button>
      </form>
    </div>
  );
};

export default CreateCircuit;