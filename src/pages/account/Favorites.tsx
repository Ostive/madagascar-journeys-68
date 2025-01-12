import { useAuth } from "@/components/auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";

const Favorites = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Mes Favoris</h1>
      
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-gray-500">
            Cette fonctionnalité sera bientôt disponible.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Favorites;