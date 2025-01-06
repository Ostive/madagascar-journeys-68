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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { AuthDialog } from "@/components/auth/AuthDialog";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Calendar, User, UserPlus, Building } from "lucide-react";

const formSchema = z.object({
  travel_type: z.enum(["solo", "couple", "family", "friends", "group"]),
  adults_count: z.number().min(1).optional(),
  children_count: z.number().min(0).optional(),
  group_type: z.enum(["friends", "school", "business", "other"]).optional(),
  group_size: z.number().min(1).optional(),
  has_dates: z.boolean(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  estimated_month: z.string().optional(),
  estimated_season: z.string().optional(),
});

interface ReservationFormProps {
  destinationId?: string;
  circuitId?: string;
  title: string;
  description: string;
  duration: string;
  price: string;
  onClose: () => void;
}

const ReservationForm = ({
  destinationId,
  circuitId,
  title,
  description,
  duration,
  price,
  onClose,
}: ReservationFormProps) => {
  const [step, setStep] = useState(1);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      travel_type: "solo",
      has_dates: true,
    },
  });

  const travelType = form.watch("travel_type");
  const hasDates = form.watch("has_dates");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user) {
      setShowAuthDialog(true);
      return;
    }

    try {
      const { error } = await supabase.from("reservation_requests").insert({
        user_id: user.id,
        destination_id: destinationId,
        travel_type: values.travel_type,
        adults_count: values.adults_count,
        children_count: values.children_count,
        group_type: values.group_type,
        group_size: values.group_size,
        start_date: values.start_date,
        end_date: values.end_date,
        estimated_month: values.estimated_month,
        estimated_season: values.estimated_season,
      });

      if (error) throw error;

      toast({
        title: "Demande envoyée !",
        description: "Nous vous contacterons dans les plus brefs délais.",
      });
      onClose();
    } catch (error) {
      console.error("Error submitting reservation:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de votre demande.",
        variant: "destructive",
      });
    }
  };

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <>
      <Card className="p-6 max-w-2xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">{title}</h2>
          <p className="text-gray-600">{description}</p>
          <div className="mt-2 text-sm text-gray-500">
            <div>Durée : {duration}</div>
            <div>Prix indicatif : {price}€ par personne</div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="travel_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Avec qui partez-vous ?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="solo" id="solo" />
                              <label htmlFor="solo" className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                Seul(e)
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="couple" id="couple" />
                              <label htmlFor="couple" className="flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                En couple
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="family" id="family" />
                              <label htmlFor="family" className="flex items-center gap-2">
                                <UserPlus className="h-4 w-4" />
                                En famille
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="friends" id="friends" />
                              <label htmlFor="friends" className="flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                Entre amis
                              </label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="group" id="group" />
                              <label htmlFor="group" className="flex items-center gap-2">
                                <Building className="h-4 w-4" />
                                En groupe
                              </label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {(travelType === "family" || travelType === "group") && (
                    <div className="space-y-4">
                      {travelType === "family" && (
                        <>
                          <FormField
                            control={form.control}
                            name="adults_count"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nombre d'adultes</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    min="1"
                                    {...field}
                                    onChange={(e) =>
                                      field.onChange(parseInt(e.target.value))
                                    }
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="children_count"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nombre d'enfants</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    min="0"
                                    {...field}
                                    onChange={(e) =>
                                      field.onChange(parseInt(e.target.value))
                                    }
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </>
                      )}

                      {travelType === "group" && (
                        <>
                          <FormField
                            control={form.control}
                            name="group_type"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Type de groupe</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Sélectionnez le type de groupe" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="friends">
                                      Groupe d'amis
                                    </SelectItem>
                                    <SelectItem value="school">
                                      Groupe scolaire
                                    </SelectItem>
                                    <SelectItem value="business">
                                      Groupe professionnel
                                    </SelectItem>
                                    <SelectItem value="other">Autre</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="group_size"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Taille du groupe</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    min="1"
                                    {...field}
                                    onChange={(e) =>
                                      field.onChange(parseInt(e.target.value))
                                    }
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </>
                      )}
                    </div>
                  )}
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="has_dates"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Connaissez-vous les dates précises de votre voyage ?
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={(value) => field.onChange(value === "true")}
                            defaultValue={field.value ? "true" : "false"}
                            className="grid grid-cols-2 gap-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="true" id="yes" />
                              <label htmlFor="yes">Oui</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="false" id="no" />
                              <label htmlFor="no">Non</label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {hasDates ? (
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="start_date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date de départ</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="end_date"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date de retour</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="estimated_month"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mois estimé</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionnez un mois" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {[
                                  "Janvier",
                                  "Février",
                                  "Mars",
                                  "Avril",
                                  "Mai",
                                  "Juin",
                                  "Juillet",
                                  "Août",
                                  "Septembre",
                                  "Octobre",
                                  "Novembre",
                                  "Décembre",
                                ].map((month) => (
                                  <SelectItem key={month} value={month.toLowerCase()}>
                                    {month}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="estimated_season"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Saison préférée</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionnez une saison" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="spring">Printemps</SelectItem>
                                <SelectItem value="summer">Été</SelectItem>
                                <SelectItem value="autumn">Automne</SelectItem>
                                <SelectItem value="winter">Hiver</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-between pt-6">
              {step > 1 && (
                <Button type="button" variant="outline" onClick={prevStep}>
                  Précédent
                </Button>
              )}
              {step < 2 ? (
                <Button type="button" onClick={nextStep}>
                  Suivant
                </Button>
              ) : (
                <Button type="submit">Envoyer ma demande</Button>
              )}
            </div>
          </form>
        </Form>
      </Card>

      <AuthDialog
        isOpen={showAuthDialog}
        onClose={() => setShowAuthDialog(false)}
      />
    </>
  );
};

export default ReservationForm;
