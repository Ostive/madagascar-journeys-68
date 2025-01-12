import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useMutation } from "@tanstack/react-query";
import CircuitBasicInfo from "@/components/admin/forms/circuit/CircuitBasicInfo";
import CircuitPricing from "@/components/admin/forms/circuit/CircuitPricing";

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

  const handleSelectChange = (value: string, name: string) => {
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
      
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-8">
        <CircuitBasicInfo formData={formData} handleChange={handleChange} />
        <CircuitPricing 
          formData={formData} 
          handleChange={handleChange}
          handleSelectChange={handleSelectChange}
        />
        
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