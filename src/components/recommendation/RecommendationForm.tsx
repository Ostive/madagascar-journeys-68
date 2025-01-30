import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, ArrowLeft } from "lucide-react";
import { FormFields, FormField } from "@/types";

const formSchema = z.object({
  groupSize: z.string().min(1, "Veuillez sélectionner avec qui vous voyagez"),
  seasonPreference: z.string().min(1, "Veuillez sélectionner une saison").optional(),
  region: z.array(z.string()).min(1, "Sélectionnez au moins une région").optional(),
  duration: z.string().min(1, "Veuillez sélectionner une durée").optional(),
  interests: z.array(z.string()).min(1, "Sélectionnez au moins un intérêt").optional(),
  travelStyle: z.string().optional(),
  activityLevel: z.string().optional()
});

type Option = {
  value: string;
  label: string;
  description?: string;
  image: string;
};

const durations: Option[] = [
  {
    value: "short",
    label: "Court séjour",
    description: "5-7 jours",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&auto=format&fit=crop&q=60"
  },
  {
    value: "medium",
    label: "Séjour moyen",
    description: "8-14 jours",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop&q=60"
  },
  {
    value: "long",
    label: "Long séjour",
    description: "15+ jours",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=60"
  },
  {
    value: "inspire",
    label: "Inspirez-moi",
    description: "Je ne sais pas encore",
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&auto=format&fit=crop&q=60"
  }
];

const interests: Option[] = [
  {
    value: "nature",
    label: "Nature & Faune",
    image: "https://images.unsplash.com/photo-1625457674917-f632347961d1?w=800&auto=format&fit=crop&q=60"
  },
  {
    value: "culture",
    label: "Culture & Traditions",
    image: "https://images.unsplash.com/photo-1589197331516-4d84b72ebee3?w=800&auto=format&fit=crop&q=60"
  },
  {
    value: "adventure",
    label: "Aventure",
    image: "https://images.unsplash.com/photo-1625457671853-5645c512f7e0?w=800&auto=format&fit=crop&q=60"
  },
  {
    value: "beach",
    label: "Plages & Îles",
    image: "https://images.unsplash.com/photo-1625457675650-d6a114727377?w=800&auto=format&fit=crop&q=60"
  },
  {
    value: "inspire",
    label: "Inspirez-moi",
    description: "Je suis ouvert à tout",
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&auto=format&fit=crop&q=60"
  }
];

const regions: Option[] = [
  {
    value: "north",
    label: "Nord",
    description: "Diego-Suarez, Nosy Be, Montagne d'Ambre",
    image: "https://images.unsplash.com/photo-1625457674917-f632347961d1?w=800&auto=format&fit=crop&q=60"
  },
  {
    value: "east",
    label: "Est",
    description: "Sainte-Marie, Tamatave, Parc d'Andasibe",
    image: "https://images.unsplash.com/photo-1589197331516-4d84b72ebee3?w=800&auto=format&fit=crop&q=60"
  },
  {
    value: "south",
    label: "Sud",
    description: "Fort-Dauphin, Parc de l'Isalo, Tuléar",
    image: "https://images.unsplash.com/photo-1625457671853-5645c512f7e0?w=800&auto=format&fit=crop&q=60"
  },
  {
    value: "west",
    label: "Ouest",
    description: "Morondava, Allée des Baobabs, Tsingy",
    image: "https://images.unsplash.com/photo-1625457675650-d6a114727377?w=800&auto=format&fit=crop&q=60"
  },
  {
    value: "center",
    label: "Centre",
    description: "Antananarivo, Antsirabe, Lac Tritriva",
    image: "https://images.unsplash.com/photo-1589197331516-4d84b72ebee3?w=800&auto=format&fit=crop&q=60"
  }
];

const seasons: Option[] = [
  {
    value: "apr_jun",
    label: "Avril - Juin",
    description: "Saison fraîche et sèche, idéale pour la randonnée",
    image: "https://images.unsplash.com/photo-1625457671853-5645c512f7e0?w=800&auto=format&fit=crop&q=60"
  },
  {
    value: "jul_sep",
    label: "Juillet - Septembre",
    description: "Haute saison, baleines à bosse à Sainte-Marie",
    image: "https://images.unsplash.com/photo-1472566316349-bce77aa2a778?w=800&auto=format&fit=crop&q=60"
  },
  {
    value: "oct_dec",
    label: "Octobre - Décembre",
    description: "Printemps malgache, chaleur modérée",
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&auto=format&fit=crop&q=60"
  },
  {
    value: "jan_mar",
    label: "Janvier - Mars",
    description: "Saison des pluies, paysages verdoyants",
    image: "https://images.unsplash.com/photo-1589197331516-4d84b72ebee3?w=800&auto=format&fit=crop&q=60"
  }
];

const travelCompanions: Option[] = [
  {
    value: "solo",
    label: "Solo",
    description: "Voyage en solitaire",
    image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=800&auto=format&fit=crop&q=60"
  },
  {
    value: "couple",
    label: "En couple",
    description: "Voyage romantique",
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&auto=format&fit=crop&q=60"
  },
  {
    value: "family",
    label: "En famille",
    description: "Avec enfants",
    image: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&auto=format&fit=crop&q=60"
  },
  {
    value: "friends",
    label: "Entre amis",
    description: "Petit groupe",
    image: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=800&auto=format&fit=crop&q=60"
  },
  {
    value: "group",
    label: "Grand groupe",
    description: "5+ personnes",
    image: "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?w=800&auto=format&fit=crop&q=60"
  }
];

const steps = [
  {
    title: "Avec qui partez-vous ?",
    description: "Sélectionnez votre type de voyage",
    field: "groupSize",
    options: travelCompanions
  },
  {
    title: "Quand souhaitez-vous partir ?",
    description: "Choisissez la meilleure période pour votre voyage",
    field: "seasonPreference",
    options: seasons
  },
  {
    title: "Quelle région vous intéresse ?",
    description: "Sélectionnez la région que vous souhaitez découvrir",
    field: "region",
    options: regions,
    multiple: true
  },
  {
    title: "Durée",
    description: "Combien de temps souhaitez-vous voyager ?",
    field: "duration",
    options: durations
  },
  {
    title: "Centres d'intérêt",
    description: "Que souhaitez-vous découvrir ?",
    field: "interests",
    options: interests,
    multiple: true
  }
];

export const RecommendationForm = () => {
  const [step, setStep] = useState(0);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [isInspireMode, setIsInspireMode] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
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

  const currentStep = steps[step];
  const isLastStep = step === steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      form.handleSubmit(onSubmit)();
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleInspireMe = () => {
    setIsInspireMode(true);
    console.log("Showing inspired suggestions");
  };

  const handleOptionSelect = (value: string) => {
    const currentField = currentStep.field as FormField;
    
    if (value === 'inspire') {
      if (currentField === 'interests') {
        setSelectedInterests([value]);
        form.setValue('interests', [value]);
      } else {
        form.setValue(currentField, value);
      }
      handleNext();
      return;
    }

    if (currentStep.multiple) {
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
      form.setValue(currentField, value);
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    console.log("Showing filtered results");
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
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-300"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
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
              {currentStep.title}
            </h3>
            <p className="text-gray-600">
              {currentStep.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentStep.options.map((option) => (
              <Card
                key={option.value}
                className={cn(
                  "relative overflow-hidden cursor-pointer transition-all duration-300 transform hover:scale-105 bg-white/40 backdrop-blur-sm border-emerald-100 shadow-lg shadow-emerald-100/20",
                  (currentStep.multiple
                    ? (currentStep.field === 'region' ? selectedRegions.includes(option.value) : selectedInterests.includes(option.value))
                    : form.watch(currentStep.field) === option.value)
                    ? "ring-4 ring-emerald-500"
                    : ""
                )}
                onClick={() => handleOptionSelect(option.value)}
              >
                <div className="absolute inset-0">
                  <img
                    src={option.image}
                    alt={option.label}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
                </div>
                <div className="relative p-6 flex flex-col h-[200px] justify-end">
                  <h4 className="text-xl font-semibold text-white mb-2">
                    {option.label}
                  </h4>
                  {option.description && (
                    <p className="text-white/80 text-sm">
                      {option.description}
                    </p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={step === 0}
          className="flex items-center gap-2 bg-white/40 hover:bg-white/60 text-gray-800"
        >
          <ArrowLeft className="w-4 h-4" />
          Précédent
        </Button>
        <Button
          onClick={handleNext}
          disabled={
            currentStep.multiple
              ? (currentStep.field === 'region' ? selectedRegions.length === 0 : selectedInterests.length === 0)
              : !form.watch(currentStep.field)
          }
          className="flex items-center gap-2 bg-gradient-to-r from-emerald-400 to-teal-500 text-white hover:opacity-90"
        >
          {isLastStep ? "Voir les résultats" : "Suivant"}
          {!isLastStep && <ArrowRight className="w-4 h-4" />}
        </Button>
      </div>
    </div>
  );
};
