import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import CircuitBasicInfo from "@/components/admin/forms/circuit/CircuitBasicInfo";
import CircuitPricing from "@/components/admin/forms/circuit/CircuitPricing";
import CircuitLogistics from "@/components/admin/forms/circuit/CircuitLogistics";
import CircuitItinerary from "@/components/admin/forms/circuit/CircuitItinerary";
import CircuitGallery from "@/components/admin/forms/circuit/CircuitGallery";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to create a circuit",
          variant: "destructive"
        });
        navigate('/admin/login');
      } else {
        setCurrentUser(user);
      }
    };

    checkAuth();
  }, [navigate, toast]);

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      if (!currentUser) {
        throw new Error("User not authenticated");
      }

      setIsSubmitting(true);
      
      // First, create the circuit
      const { data: circuitData, error: circuitError } = await supabase
        .from('circuits')
        .insert([{
          ...data,
          rating: 0,
          user_id: currentUser.id,
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
        title: "Circuit Created",
        description: "The circuit was successfully created.",
      });
      navigate('/admin/circuits');
    },
    onError: (error: any) => {
      console.error('Error creating circuit:', error);
      toast({
        title: "Error",
        description: error.message || "Unable to create the circuit. Please try again.",
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

  const handleSubmit = () => {
    // Validate form data before submission
    if (!formData.name || formData.duration_days <= 0 || formData.price <= 0) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly",
        variant: "destructive"
      });
      return;
    }

    createMutation.mutate(formData);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Create New Circuit</CardTitle>
          <Button 
            variant="outline" 
            onClick={() => navigate('/admin/circuits')}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} /> Back to Circuits
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <CircuitBasicInfo 
            formData={formData} 
            handleChange={handleChange}
          />
          <CircuitPricing 
            formData={formData} 
            handleChange={handleChange}
            handleSelectChange={handleSelectChange}
          />
          <CircuitLogistics 
            formData={formData} 
            handleChange={handleChange}
          />
          <CircuitItinerary 
            itinerary={itinerary}
            onItineraryChange={setItinerary}
          />
          <CircuitGallery 
            mainImage={formData.main_image}
            gallery={formData.gallery}
            onMainImageChange={(url) => setFormData(prev => ({ ...prev, main_image: url }))}
            onGalleryChange={(urls) => setFormData(prev => ({ ...prev, gallery: urls }))}
          />
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="circuit-enabled"
              checked={formData.enabled}
              onCheckedChange={(checked) => setFormData(prev => ({...prev, enabled: checked}))}
            />
            <Label htmlFor="circuit-enabled">Circuit Enabled</Label>
          </div>

          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? "Creating..." : "Create Circuit"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreateCircuit;