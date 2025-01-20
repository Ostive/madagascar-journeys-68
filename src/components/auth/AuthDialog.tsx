import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { AuthForm } from "./AuthForm";
import { ResetPasswordForm } from "./ResetPasswordForm";
import { SocialAuth } from "./SocialAuth";
import { motion, AnimatePresence } from "framer-motion";

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const authSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

export const AuthDialog = ({ isOpen, onClose }: AuthDialogProps) => {
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const { toast } = useToast();

  const validateForm = (email: string, password: string) => {
    try {
      authSchema.parse({ email, password });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.errors.reduce(
          (acc, curr) => ({
            ...acc,
            [curr.path[0]]: curr.message,
          }),
          {}
        );
        setErrors(formattedErrors);
      }
      return false;
    }
  };

  const handleSignIn = async (email: string, password: string): Promise<void> => {
    if (!validateForm(email, password)) return;
    setLoading(true);
    
    try {
      const { data: { user }, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log("Logged in user:", user);
      
      if (error) throw error;
      
      toast({
        title: "Connexion réussie",
        description: "Vous êtes maintenant connecté",
        className: "bg-emerald-50 border-emerald-200",
      });
      onClose();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error 
        ? error.message.includes("Invalid login credentials")
          ? "Email ou mot de passe incorrect"
          : error.message
        : "Une erreur est survenue";
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async (): Promise<void> => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Déconnexion réussie",
        description: "Vous êtes maintenant déconnecté",
        className: "bg-emerald-50 border-emerald-200",
      });
      onClose();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
      toast({
        variant: "destructive",
        title: "Erreur de déconnexion",
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (email: string): Promise<void> => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) throw error;

      toast({
        title: "Email envoyé",
        description: "Vérifiez votre email pour réinitialiser votre mot de passe",
        className: "bg-emerald-50 border-emerald-200",
      });
      setIsResetPassword(false);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Une erreur est survenue";
      toast({
        variant: "destructive",
        title: "Erreur",
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (email: string, password: string): Promise<void> => {
    if (!validateForm(email, password)) return;
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        if (error.message.includes("User already registered")) {
          toast({
            variant: "destructive",
            title: "Compte existant",
            description: "Un compte existe déjà avec cet email. Veuillez vous connecter.",
          });
          setIsSignUp(false);
          return;
        }
        throw error;
      }

      toast({
        title: "Inscription réussie",
        description: "Vérifiez votre email pour confirmer votre compte",
        className: "bg-emerald-50 border-emerald-200",
      });
      onClose();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error 
        ? error.message.includes("User already registered")
          ? "Un compte existe déjà avec cet email"
          : error.message
        : "Une erreur est survenue lors de l'inscription";
      toast({
        variant: "destructive",
        title: "Erreur d'inscription",
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden bg-white dark:bg-gray-900">
        <DialogTitle className="sr-only">
          {isSignUp ? "Créer un compte" : "Se connecter"}
        </DialogTitle>
        <div className="grid sm:grid-cols-2">
          {/* Left side - Decorative */}
          <div className="hidden sm:block relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-emerald-600" />
            <div className="relative h-full p-8 flex flex-col justify-between text-white">
              <div className="text-2xl font-bold">Madagascar Journeys</div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold">Découvrez Madagascar</h3>
                <p className="text-base opacity-90">
                  Rejoignez-nous pour vivre des expériences uniques et explorer les merveilles de Madagascar
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Auth form */}
          <div className="p-8">
            <AnimatePresence mode="wait">
              {isResetPassword ? (
                <motion.div
                  key="reset"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <ResetPasswordForm
                    onSubmit={handleResetPassword}
                    onBack={() => setIsResetPassword(false)}
                    loading={loading}
                    errors={errors}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="auth"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                        {isSignUp ? "Créer un compte" : "Se connecter"}
                      </h2>
                      <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
                        {isSignUp
                          ? "Rejoignez-nous pour découvrir Madagascar"
                          : "Bon retour parmi nous !"}
                      </p>
                    </div>

                    <SocialAuth />

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-gray-300 dark:border-gray-700" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">
                          Ou avec email
                        </span>
                      </div>
                    </div>

                    <AuthForm
                      isSignUp={isSignUp}
                      onSubmit={isSignUp ? handleSignUp : handleSignIn}
                      onToggleMode={() => setIsSignUp(!isSignUp)}
                      onResetPassword={() => setIsResetPassword(true)}
                      loading={loading}
                      errors={errors}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
