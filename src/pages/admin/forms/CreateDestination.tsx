import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ImageUploadSection } from "@/components/admin/destination/ImageUploadSection";
import { HighlightsSection } from "@/components/admin/destination/HighlightsSection";
import { PackageOptionsSection } from "@/components/admin/destination/PackageOptionsSection";
import { DurationSection } from "@/components/admin/destination/DurationSection";
import { FAQSection } from "@/components/admin/destination/FAQSection";
import { LocationSection } from "@/components/admin/destination/LocationSection";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";

interface FAQ {
  question: string;
  answer: string;
}

interface FormData {
  name: string;
  description: string;
  long_description: string;
  price: number;
  location: string;
  direction: string;
  duration: string;
  main_image: string;
  best_time_to_visit: string;
  highlights: string[];
  included: string[];
  not_included: string[];
  gallery: string[];
  faqs: FAQ[];
}

const CreateDestination = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    long_description: "",
    price: 0,
    location: "",
    direction: "",
    duration: "",
    main_image: "",
    best_time_to_visit: "",
    highlights: [],
    included: [],
    not_included: [],
    gallery: [],
    faqs: [],
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

  useEffect(() => {
    if (dateRange?.from && dateRange?.to) {
      const duration = `${format(dateRange.from, "d MMM")} - ${format(dateRange.to, "d MMM")}`;
      setFormData(prev => ({ ...prev, duration }));
    }
  }, [dateRange]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data: destinationData, error: destinationError } = await supabase
        .from('destinations')
        .insert([{
          name: formData.name,
          description: formData.description,
          long_description: formData.long_description,
          price: formData.price,
          location: formData.location,
          direction: formData.direction,
          duration: formData.duration,
          main_image: formData.main_image,
          best_time_to_visit: formData.best_time_to_visit,
          gallery: [formData.main_image, ...formData.gallery],
        }])
        .select()
        .single();

      if (destinationError) throw destinationError;

      // Insert FAQs
      if (formData.faqs.length > 0) {
        const { error: faqError } = await supabase
          .from('faqs')
          .insert(
            formData.faqs.map(faq => ({
              destination_id: destinationData.id,
              question: faq.question,
              answer: faq.answer,
            }))
          );

        if (faqError) throw faqError;
      }

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
            name="name"
            value={formData.name}
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
            name="long_description"
            value={formData.long_description}
            onChange={handleInputChange}
            placeholder="Entrez une description détaillée"
            className="min-h-[200px]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Prix</label>
          <Input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Entrez le prix"
            required
          />
        </div>

        <LocationSection
          location={formData.location}
          direction={formData.direction}
          onLocationChange={(value) => setFormData(prev => ({ ...prev, location: value }))}
          onDirectionChange={(value) => setFormData(prev => ({ ...prev, direction: value }))}
        />

        <DurationSection
          value={dateRange}
          onChange={setDateRange}
        />

        <div className="space-y-2">
          <label className="text-sm font-medium">Meilleure période</label>
          <Input
            name="best_time_to_visit"
            value={formData.best_time_to_visit}
            onChange={handleInputChange}
            placeholder="Entrez la meilleure période pour visiter"
          />
        </div>

        <ImageUploadSection
          mainImage={formData.main_image}
          gallery={formData.gallery}
          onMainImageChange={(url) => setFormData(prev => ({ ...prev, main_image: url }))}
          onGalleryChange={(urls) => setFormData(prev => ({ ...prev, gallery: urls }))}
        />

        <HighlightsSection
          selectedHighlights={formData.highlights}
          onHighlightsChange={(highlights) => setFormData(prev => ({ ...prev, highlights }))}
        />

        <PackageOptionsSection
          included={formData.included}
          notIncluded={formData.not_included}
          onIncludedChange={(included) => setFormData(prev => ({ ...prev, included }))}
          onNotIncludedChange={(notIncluded) => setFormData(prev => ({ ...prev, not_included: notIncluded }))}
        />

        <FAQSection
          faqs={formData.faqs}
          onChange={(faqs) => setFormData(prev => ({ ...prev, faqs }))}
        />

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