import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { Heart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface Circuit {
  id: string;
  title: string;
  description: string;
  image_url: string;
  duration: number;
  price: number;
}

const Favorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Circuit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const { data, error } = await supabase
          .from("favorites")
          .select("circuit_id, circuits(*)")
          .eq("user_id", user?.id);

        if (error) throw error;

        const circuits = data.map((fav) => fav.circuits);
        setFavorites(circuits);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchFavorites();
    }
  }, [user]);

  const removeFavorite = async (circuitId: string) => {
    try {
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", user?.id)
        .eq("circuit_id", circuitId);

      if (error) throw error;

      setFavorites((prev) => prev.filter((circuit) => circuit.id !== circuitId));
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  if (loading) {
    return <div className="text-gray-600">Chargement de vos favoris...</div>;
  }

  if (favorites.length === 0) {
    return (
      <div className="text-center py-12">
        <Heart className="mx-auto h-12 w-12 text-gray-300" />
        <h3 className="mt-4 text-lg font-medium text-gray-900">Aucun favori</h3>
        <p className="mt-2 text-gray-500">
          Vous n'avez pas encore ajouté de circuits à vos favoris.
        </p>
        <Link to="/circuits">
          <Button className="mt-4 bg-emerald-500 text-white hover:bg-emerald-600">
            Découvrir nos circuits
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Mes Favoris</h2>
        <p className="text-gray-500">Gérez vos circuits favoris</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {favorites.map((circuit) => (
          <div
            key={circuit.id}
            className="group relative rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden"
          >
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={circuit.image_url}
                alt={circuit.title}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  {circuit.title}
                </h3>
                <button
                  onClick={() => removeFavorite(circuit.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  title="Retirer des favoris"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
              <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                {circuit.description}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  {circuit.duration} jours
                </div>
                <div className="font-medium text-emerald-600">
                  {circuit.price.toLocaleString()} €
                </div>
              </div>
              <Link
                to={`/circuits/${circuit.id}`}
                className="mt-4 block text-center py-2 px-4 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors"
              >
                Voir le circuit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
