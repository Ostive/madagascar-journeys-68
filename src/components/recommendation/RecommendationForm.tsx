import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  duration: z.string(),
  budget: z.string(),
  travelStyle: z.string(),
  interests: z.array(z.string()).min(1, "Sélectionnez au moins un intérêt"),
  activityLevel: z.string(),
  seasonPreference: z.string(),
  groupSize: z.string(),
});

export const RecommendationForm = () => {
  const [step, setStep] = useState(1);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      duration: "",
      budget: "",
      travelStyle: "",
      interests: [],
      activityLevel: "",
      seasonPreference: "",
      groupSize: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    // Here we'll add logic to recommend circuits based on the form values
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-[#0B1C2F]/95 backdrop-blur-lg border-white/10 p-6 rounded-2xl">
      <h2 className="text-2xl font-bold text-white mb-6">Trouvez votre circuit idéal</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Durée souhaitée du voyage</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Sélectionnez une durée" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="short">Court séjour (3-5 jours)</SelectItem>
                        <SelectItem value="medium">Séjour moyen (6-12 jours)</SelectItem>
                        <SelectItem value="long">Long séjour (13+ jours)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Budget par personne</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Sélectionnez un budget" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="budget">Économique (&lt; 1000€)</SelectItem>
                        <SelectItem value="comfort">Confort (1000€ - 2000€)</SelectItem>
                        <SelectItem value="luxury">Luxe (&gt; 2000€)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="button"
                onClick={() => setStep(2)}
                className="w-full bg-gradient-to-r from-emerald-400 to-teal-500 text-white hover:opacity-90"
              >
                Suivant
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="travelStyle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Style de voyage préféré</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Sélectionnez un style" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="adventure">Aventure</SelectItem>
                        <SelectItem value="cultural">Culturel</SelectItem>
                        <SelectItem value="relaxation">Détente</SelectItem>
                        <SelectItem value="nature">Nature</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="activityLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Niveau d'activité souhaité</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Sélectionnez un niveau" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="easy">Tranquille</SelectItem>
                        <SelectItem value="moderate">Modéré</SelectItem>
                        <SelectItem value="active">Actif</SelectItem>
                        <SelectItem value="challenging">Sportif</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-2">
                <Button
                  type="button"
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="flex-1 text-white border-white/20 hover:bg-white/10"
                >
                  Précédent
                </Button>
                <Button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex-1 bg-gradient-to-r from-emerald-400 to-teal-500 text-white hover:opacity-90"
                >
                  Suivant
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="seasonPreference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Saison préférée</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Sélectionnez une saison" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="dry">Saison sèche (Avril - Octobre)</SelectItem>
                        <SelectItem value="wet">Saison des pluies (Novembre - Mars)</SelectItem>
                        <SelectItem value="any">Peu importe</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="groupSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Taille du groupe</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Sélectionnez une taille" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="solo">Voyage solo</SelectItem>
                        <SelectItem value="couple">Couple</SelectItem>
                        <SelectItem value="family">Famille</SelectItem>
                        <SelectItem value="group">Groupe (5+ personnes)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-2">
                <Button
                  type="button"
                  onClick={() => setStep(2)}
                  variant="outline"
                  className="flex-1 text-white border-white/20 hover:bg-white/10"
                >
                  Précédent
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-emerald-400 to-teal-500 text-white hover:opacity-90"
                >
                  Trouver mon circuit idéal
                </Button>
              </div>
            </div>
          )}
        </form>
      </Form>
    </Card>
  );
};
