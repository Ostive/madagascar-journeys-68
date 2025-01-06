import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import QuizChoiceCard from "@/components/quiz/QuizChoiceCard";
import QuizStepper from "@/components/quiz/QuizStepper";
import QuizNavigation from "@/components/quiz/QuizNavigation";

interface QuizFormData {
  travelType: string[];
  duration: string;
  region: string;
  activities: string[];
  budget: string;
  additionalInfo?: string;
  email?: string;
}

const Quiz = () => {
  const [step, setStep] = useState(1);
  const { register, handleSubmit, watch, setValue } = useForm<QuizFormData>();
  const { toast } = useToast();

  const onSubmit = async (data: QuizFormData) => {
    try {
      const { error } = await supabase.from("quiz_responses").insert([
        {
          travel_type: data.travelType,
          duration: data.duration,
          region: data.region,
          activities: data.activities,
          budget: data.budget,
          additional_info: data.additionalInfo,
          email: data.email,
        },
      ]);

      if (error) throw error;

      toast({
        title: "Merci pour vos réponses !",
        description: "Nous allons vous proposer des destinations adaptées à vos envies.",
      });
    } catch (error) {
      toast({
        title: "Une erreur est survenue",
        description: "Veuillez réessayer plus tard.",
        variant: "destructive",
      });
    }
  };

  const travelTypes = [
    { title: "Aventure", image: "https://images.unsplash.com/photo-1516939884455-1445c8652f83?q=80&w=2342&auto=format&fit=crop" },
    { title: "Luxe", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2340&auto=format&fit=crop" },
    { title: "Découverte culturelle", image: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?q=80&w=2340&auto=format&fit=crop" },
    { title: "Nature et paysages", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2338&auto=format&fit=crop" },
    { title: "Famille", image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=2340&auto=format&fit=crop" },
    { title: "Voyage romantique", image: "https://images.unsplash.com/photo-1514917595581-c2d99d58cf4a?q=80&w=2340&auto=format&fit=crop" },
  ];

  const durations = [
    { title: "Moins de 3 jours", image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2348&auto=format&fit=crop" },
    { title: "3 à 7 jours", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2340&auto=format&fit=crop" },
    { title: "1 à 2 semaines", image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2348&auto=format&fit=crop" },
    { title: "Plus de 2 semaines", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop" },
  ];

  const regions = [
    { title: "Nord", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2346&auto=format&fit=crop" },
    { title: "Sud", image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=2340&auto=format&fit=crop" },
    { title: "Est", image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=2368&auto=format&fit=crop" },
    { title: "Ouest", image: "https://images.unsplash.com/photo-1468413253725-0d5181091126?q=80&w=2340&auto=format&fit=crop" },
    { title: "Centre", image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=2574&auto=format&fit=crop" },
  ];

  const activities = [
    { title: "Randonnée", image: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2340&auto=format&fit=crop" },
    { title: "Plongée sous-marine", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2340&auto=format&fit=crop" },
    { title: "Safari", image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2348&auto=format&fit=crop" },
    { title: "Visite culturelle", image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?q=80&w=2340&auto=format&fit=crop" },
    { title: "Farniente sur la plage", image: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?q=80&w=2348&auto=format&fit=crop" },
    { title: "Exploration de parcs naturels", image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=2352&auto=format&fit=crop" },
  ];

  const budgets = [
    { title: "Moins de 500 €", image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=2340&auto=format&fit=crop" },
    { title: "500 € à 1000 €", image: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?q=80&w=2340&auto=format&fit=crop" },
    { title: "Plus de 1000 €", image: "https://images.unsplash.com/photo-1549421263-5ec394a5ad4c?q=80&w=2340&auto=format&fit=crop" },
  ];

  const steps = [
    // Travel Type
    <Card key="travel-type" className="p-6 space-y-4 max-w-4xl mx-auto">
      <h3 className="text-xl font-semibold text-center mb-8">
        Quel type de voyage recherchez-vous ?
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {travelTypes.map((type) => (
          <QuizChoiceCard
            key={type.title}
            title={type.title}
            image={type.image}
            selected={watch("travelType")?.includes(type.title)}
            onClick={() => {
              const current = watch("travelType") || [];
              if (current.includes(type.title)) {
                setValue(
                  "travelType",
                  current.filter((t) => t !== type.title)
                );
              } else {
                setValue("travelType", [...current, type.title]);
              }
            }}
          />
        ))}
      </div>
    </Card>,

    // Duration
    <Card key="duration" className="p-6 space-y-4 max-w-4xl mx-auto">
      <h3 className="text-xl font-semibold text-center mb-8">
        Combien de temps prévoyez-vous pour votre voyage ?
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {durations.map((duration) => (
          <QuizChoiceCard
            key={duration.title}
            title={duration.title}
            image={duration.image}
            selected={watch("duration") === duration.title}
            onClick={() => setValue("duration", duration.title)}
          />
        ))}
      </div>
    </Card>,

    // Region
    <Card key="region" className="p-6 space-y-4 max-w-4xl mx-auto">
      <h3 className="text-xl font-semibold text-center mb-8">
        Quelle région de Madagascar voulez-vous explorer ?
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {regions.map((region) => (
          <QuizChoiceCard
            key={region.title}
            title={region.title}
            image={region.image}
            selected={watch("region") === region.title}
            onClick={() => setValue("region", region.title)}
          />
        ))}
      </div>
    </Card>,

    // Activities
    <Card key="activities" className="p-6 space-y-4 max-w-4xl mx-auto">
      <h3 className="text-xl font-semibold text-center mb-8">
        Quelles activités vous intéressent le plus ?
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((activity) => (
          <QuizChoiceCard
            key={activity.title}
            title={activity.title}
            image={activity.image}
            selected={watch("activities")?.includes(activity.title)}
            onClick={() => {
              const current = watch("activities") || [];
              if (current.includes(activity.title)) {
                setValue(
                  "activities",
                  current.filter((a) => a !== activity.title)
                );
              } else {
                setValue("activities", [...current, activity.title]);
              }
            }}
          />
        ))}
      </div>
    </Card>,

    // Budget
    <Card key="budget" className="p-6 space-y-4 max-w-4xl mx-auto">
      <h3 className="text-xl font-semibold text-center mb-8">
        Quel est votre budget pour ce voyage par personne ?
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {budgets.map((budget) => (
          <QuizChoiceCard
            key={budget.title}
            title={budget.title}
            image={budget.image}
            selected={watch("budget") === budget.title}
            onClick={() => setValue("budget", budget.title)}
          />
        ))}
      </div>
    </Card>,

    // Additional Info and Email
    <Card key="additional" className="p-6 space-y-4 max-w-2xl mx-auto">
      <h3 className="text-xl font-semibold text-center">Informations complémentaires</h3>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="additional-info">
            Souhaitez-vous ajouter des informations spécifiques ?
          </Label>
          <Textarea
            id="additional-info"
            placeholder="Vos commentaires..."
            {...register("additionalInfo")}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">
            Souhaitez-vous recevoir les suggestions par email ?
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="votre@email.com"
            {...register("email")}
          />
        </div>
      </div>
    </Card>,
  ];

  return (
    <section className="py-16 px-4 md:px-0">
      <div className="max-w-6xl mx-auto">
        <QuizStepper currentStep={step} totalSteps={steps.length} />
        {steps[step - 1]}
        <QuizNavigation
          onBack={() => setStep(step > 1 ? step - 1 : 1)}
          onNext={() => setStep(step < steps.length ? step + 1 : step)}
          showSubmit={step === steps.length}
          onSubmit={handleSubmit(onSubmit)}
        />
      </div>
    </section>
  );
};

export default Quiz;