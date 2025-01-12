import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { AuthForm } from "./AuthForm";
import { ResetPasswordForm } from "./ResetPasswordForm";
import { SocialAuth } from "./SocialAuth";

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

  const handleSignIn = async (email: string, password: string) => {
    if (!validateForm(email, password)) return;
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      toast({
        title: "Connexion réussie",
        description: "Vous êtes maintenant connecté",
      });
      onClose();
    } catch (error: any) {
      let errorMessage = "Une erreur est survenue";
      if (error.message.includes("Invalid login credentials")) {
        errorMessage = "Email ou mot de passe incorrect";
      }
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (email: string, password: string) => {
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
      });
      onClose();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur d'inscription",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (email: string) => {
    if (!email) {
      setErrors({ email: "Email requis" });
      return;
    }
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
      });

      if (error) throw error;

      toast({
        title: "Email envoyé",
        description: "Vérifiez votre email pour réinitialiser votre mot de passe",
      });
      setIsResetPassword(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: error.message,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-white to-gray-50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-emerald to-ocean bg-clip-text text-transparent">
            {isResetPassword
              ? "Réinitialiser le mot de passe"
              : isSignUp
              ? "Créer un compte"
              : "Bienvenue sur MadagascarTravel"}
          </DialogTitle>
        </DialogHeader>

        {isResetPassword ? (
          <ResetPasswordForm
            onSubmit={handleResetPassword}
            onBack={() => setIsResetPassword(false)}
            loading={loading}
            errors={errors}
          />
        ) : (
          <>
            <AuthForm
              isSignUp={isSignUp}
              onSubmit={isSignUp ? handleSignUp : handleSignIn}
              onToggleMode={() => setIsSignUp(!isSignUp)}
              onResetPassword={() => setIsResetPassword(true)}
              loading={loading}
              errors={errors}
            />
            <SocialAuth onGoogleSignIn={handleGoogleSignIn} loading={loading} />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};