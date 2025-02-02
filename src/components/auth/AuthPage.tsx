import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';
import { AuthForm } from './AuthForm';
import { ResetPasswordForm } from './ResetPasswordForm';
import { SocialAuth } from './SocialAuth';

const authSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
});

const AuthPage: React.FC = () => {
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
        setErrors(formattedErrors); // Set validation errors
      }
      return false;
    }
  };

  const handleSignIn = async (email: string, password: string): Promise<void> => {
    if (!validateForm(email, password)) return;
    setLoading(true);
    const { error } = await supabase.auth.signIn({ email, password });
    if (error) {
      setErrors({ email: error.message, password: error.message }); // Set error messages
      toast({
        variant: 'destructive',
        title: 'Erreur de connexion',
        description: error.message,
      });
      setLoading(false);
      return;
    }
    // Handle successful sign-in
  };

  return (
    <div className="auth-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 100px)' }}>
      <div className="auth-card" style={{ width: '400px', height: '600px' }}>
        <h2>{isSignUp ? 'Register' : 'Login'}</h2>
        {isResetPassword ? (
          <ResetPasswordForm />
        ) : (
          <AuthForm onSignIn={handleSignIn} loading={loading} errors={errors} />
        )}
        <SocialAuth />
        <button onClick={() => setIsSignUp(!isSignUp)}>
          Switch to {isSignUp ? 'Login' : 'Register'}
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
