import { useAuth } from "@/components/auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const Reservations = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const { data: reservations, isLoading } = useQuery({
    queryKey: ["reservations", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reservation_requests")
        .select("*, destination_id")
        .eq("user_id", user?.id);

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  if (!user) return null;

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Mes Réservations</h1>

      {isLoading ? (
        <div className="flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : reservations?.length === 0 ? (
        <Card>
          <CardContent className="p-6">
            <p className="text-center text-gray-500">
              Vous n'avez pas encore de réservations.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {reservations?.map((reservation) => (
            <Card key={reservation.id}>
              <CardHeader>
                <CardTitle>
                  Réservation {reservation.destination_id}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p>Type de voyage: {reservation.travel_type}</p>
                  <p>Adultes: {reservation.adults_count}</p>
                  <p>Enfants: {reservation.children_count}</p>
                  {reservation.start_date && (
                    <p>
                      Du {new Date(reservation.start_date).toLocaleDateString()}
                      {reservation.end_date && 
                        ` au ${new Date(reservation.end_date).toLocaleDateString()}`
                      }
                    </p>
                  )}
                  <p>Statut: {reservation.status}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reservations;
