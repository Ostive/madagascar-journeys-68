import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, ArrowLeft } from "lucide-react";

const steps = [
  {
    title: "Avec qui voyagez-vous ?",
    description: "Sélectionnez votre type de voyage",
    field: "groupSize",
    options: [
      { value: "solo", label: "Solo" },
      { value: "couple", label: "En couple" },
      { value: "family", label: "En famille" },
      { value: "friends", label: "Entre amis" },
      { value: "group", label: "En groupe" }
    ]
  },
  {
    title: "Quelle durée souhaitez-vous ?",
    description: "Choisissez la durée idéale pour votre voyage",
    field: "duration",
    options: [
      { value: "3-5", label: "3-5 jours" },
      { value: "6-10", label: "6-10 jours" },
      { value: "11-15", label: "11-15 jours" },
      { value: "15+", label: "Plus de 15 jours" }
    ]
  },
  // ... Add other steps as needed
];

const formSchema = z.object({
  groupSize: z.string().min(1, "Veuillez sélectionner avec qui vous voyagez"),
  seasonPreference: z.string().min(1, "Veuillez sélectionner une saison").optional(),
  region: z.array(z.string()).min(1, "Sélectionnez au moins une région").optional(),
  duration: z.string().min(1, "Veuillez sélectionner une durée").optional(),
  interests: z.array(z.string()).min(1, "Sélectionnez au moins un intérêt").optional(),
  travelStyle: z.string().optional(),
  activityLevel: z.string().optional()
});

type FormData = z.infer<typeof formSchema>;

export const RecommendationForm = () => {
  const [step, setStep] = useState(0);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [isInspireMode, setIsInspireMode] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      groupSize: "",
      duration: "",
      interests: [],
      travelStyle: "",
      activityLevel: "",
      seasonPreference: "",
      region: []
    },
  });

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleInspireMe = () => {
    setIsInspireMode(true);
  };

  const handleOptionSelect = (value: string) => {
    const currentField = steps[step].field;
    
    if (value === 'inspire') {
      if (currentField === 'interests') {
        setSelectedInterests([value]);
        form.setValue('interests', [value]);
      } else {
        form.setValue(currentField as keyof FormData, value);
      }
      handleNext();
      return;
    }

    if (steps[step].multiple) {
      if (currentField === 'region') {
        const newRegions = selectedRegions.includes(value)
          ? selectedRegions.filter(r => r !== value)
          : [...selectedRegions, value];
        setSelectedRegions(newRegions);
        form.setValue('region', newRegions);
      } else if (currentField === 'interests') {
        const newInterests = selectedInterests.includes(value)
          ? selectedInterests.filter(i => i !== value)
          : [...selectedInterests, value];
        setSelectedInterests(newInterests);
        form.setValue('interests', newInterests);
      }
    } else {
      form.setValue(currentField as keyof FormData, value);
      handleNext();
    }
  };

  if (isInspireMode) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent mb-2">
            Nos meilleures suggestions
          </h3>
          <p className="text-gray-600">
            Découvrez nos circuits les plus populaires
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent">
          Trouvez votre circuit idéal
        </h2>
        <Button
          variant="outline"
          onClick={handleInspireMe}
          className="flex items-center gap-2 bg-white/40 hover:bg-white/60 text-gray-800"
        >
          <span>Inspirez-moi</span>
          <span className="text-xs text-gray-600">Suggestions aléatoires</span>
        </Button>
      </div>

      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {steps.map((s, i) => (
            <div
              key={i}
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full border-2",
                i === step
                  ? "border-emerald-500 bg-emerald-500 text-white"
                  : i < step
                  ? "border-emerald-500 bg-emerald-500 text-white"
                  : "border-gray-400 text-gray-400"
              )}
            >
              {i < step ? (
                <Check className="w-4 h-4" />
              ) : (
                <span>{i + 1}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent mb-2">
              {steps[step].title}
            </h3>
            <p className="text-gray-600">
              {steps[step].description}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
