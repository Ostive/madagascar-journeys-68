import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { destinations } from "@/data/destinations";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { formSchema, FormSchema, ReservationRequest } from "@/components/reservation/reservationSchema";
import ReservationAvatar from "@/components/reservation/ReservationAvatar";
import TravelGroupStep from "@/components/reservation/steps/TravelGroupStep";
import DateSelectionStep from "@/components/reservation/steps/DateSelectionStep";
import QuizStepper from "@/components/quiz/QuizStepper";
import Header from "@/components/Header";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";

const STEPS = [
  {
    title: "Groupe de voyage",
    message: "Dites-nous avec qui vous voyagez pour que nous puissions adapter votre expérience.",
  },
  {
    title: "Dates",
    message: "Choisissez vos dates de voyage ou indiquez-nous votre période préférée.",
  },
];

const Reservation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [step, setStep] = useState(1);

  const destination = destinations.find((d) => d.id === id);

  if (!destination) {
    return <div>Destination non trouvée</div>;
  }

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      travel_type: "solo",
      has_dates: true,
    },
  });

  const onSubmit = async (values: FormSchema) => {
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour continuer",
        variant: "destructive",
      });
      return;
    }

    try {
      // Create a properly typed request object
      const reservationRequest: ReservationRequest = {
        user_id: user.id,
        destination_id: id!,
        travel_type: values.travel_type,
        adults_count: values.adults_count,
        children_count: values.children_count,
        group_type: values.group_type,
        group_size: values.group_size,
        start_date: values.start_date,
        end_date: values.end_date,
        estimated_month: values.estimated_month,
        estimated_season: values.estimated_season,
      };

      const { error } = await supabase
        .from("reservation_requests")
        .insert(reservationRequest);

      if (error) throw error;

      toast({
        title: "Demande envoyée !",
        description: "Nous vous contacterons dans les plus brefs délais.",
      });
      navigate("/");
    } catch (error) {
      console.error("Error submitting reservation:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de votre demande.",
        variant: "destructive",
      });
    }
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />
      <Header />
      <div className="p-8 md:p-14" />

      <div className="max-w-3xl mx-auto px-4 pb-14">
        <QuizStepper currentStep={step} totalSteps={STEPS.length} />
        
        <Card className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">{destination.title}</h2>
            <p className="text-gray-600">{destination.description}</p>
            <div className="mt-2 text-sm text-gray-500">
              <div>Durée : {destination.duration}</div>
              <div>Prix indicatif : {destination.price}€ par personne</div>
            </div>
          </div>

          <ReservationAvatar
            step={step}
            message={STEPS[step - 1].message}
          />

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <TravelGroupStep form={form} />
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <DateSelectionStep form={form} />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex justify-between pt-6">
                {step > 1 && (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Précédent
                  </Button>
                )}
                {step < STEPS.length ? (
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
      </div>

      <Footer />
    </div>
  );
};

export default Reservation;