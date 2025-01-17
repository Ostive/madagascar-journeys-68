import { Link } from "react-router-dom";
import { MainNavigation } from "./MainNavigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { AuthDialog } from "@/components/auth/AuthDialog";
import { useState } from "react";

export const Header = () => {
  const { user } = useAuth();
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="bg-[#0B1C2F]/80 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-8">
              <Link to="/" className="text-white font-bold text-xl">
                Madagascar Journeys
              </Link>
              <MainNavigation />
            </div>
            <div className="flex items-center gap-4">
              {user ? (
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/10 transition-all"
                >
                  Mon compte
                </Button>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    className="text-white hover:bg-white/10 transition-all"
                    onClick={() => setIsAuthDialogOpen(true)}
                  >
                    Se connecter
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-emerald-400 to-teal-500 text-white 
                             hover:opacity-90 transition-all rounded-full px-6"
                    onClick={() => setIsAuthDialogOpen(true)}
                  >
                    S'inscrire
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <AuthDialog isOpen={isAuthDialogOpen} onClose={() => setIsAuthDialogOpen(false)} />
    </header>
  );
};
