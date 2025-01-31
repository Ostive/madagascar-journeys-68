import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Check the current authentication state
        const { data: { user }, error } = await supabase.auth.getUser();

        if (error) {
          throw error;
        }

        if (user) {
          // Attempt to create or update user profile
          const { error: profileError } = await supabase
            .from('profiles')
            .upsert({
              id: user.id,
              email: user.email,
              avatar: user.user_metadata?.avatar || user.user_metadata?.avatar_url,
              username: user.email?.split('@')[0],
            }, { 
              onConflict: 'id' 
            });

          if (profileError) {
            console.error('Profile update error:', profileError);
          }

          // Show success toast
          toast({
            title: 'Authentification réussie',
            description: `Bienvenue, ${user.email}`,
            className: 'bg-emerald-50 border-emerald-200',
          });

          // Redirect to dashboard or home
          navigate('/');
        } else {
          throw new Error('Aucun utilisateur authentifié');
        }
      } catch (err) {
        const errorMessage = err instanceof Error 
          ? err.message 
          : 'Une erreur est survenue lors de la connexion';

        setError(errorMessage);
        toast({
          title: 'Erreur de connexion',
          description: errorMessage,
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    handleAuthCallback();
  }, [navigate, toast]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center space-y-4">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-emerald-500" />
          <p>Authentification en cours...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-red-500">Erreur de connexion</h2>
          <p>{error}</p>
          <Button onClick={() => navigate('/login')}>
            Retour à la connexion
          </Button>
        </div>
      </div>
    );
  }

  return null;
};

export default AuthCallback;
