import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { CalendarDays, Clock, Users } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface Reservation {
  id: string;
  created_at: string;
  start_date: string;
  end_date: string;
  status: "pending" | "confirmed" | "cancelled";
  participants: number;
  circuit: {
    id: string;
    title: string;
    image_url: string;
    duration: number;
    price: number;
  };
}

const statusConfig = {
  pending: {
    label: "En attente",
    className: "bg-yellow-50 text-yellow-700 border-yellow-200",
  },
  confirmed: {
    label: "Confirmé",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  cancelled: {
    label: "Annulé",
    className: "bg-red-50 text-red-700 border-red-200",
  },
};

const Reservations = () => {
  const { user } = useAuth();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const { data, error } = await supabase
          .from("reservations")
          .select("*, circuit:circuits(*)")
          .eq("user_id", user?.id)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setReservations(data || []);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchReservations();
    }
  }, [user]);

  if (loading) {
    return <div className="text-gray-600">Chargement de vos réservations...</div>;
  }

  if (reservations.length === 0) {
    return (
      <div className="text-center py-12">
        <CalendarDays className="mx-auto h-12 w-12 text-gray-300" />
        <h3 className="mt-4 text-lg font-medium text-gray-900">Aucune réservation</h3>
        <p className="mt-2 text-gray-500">
          Vous n'avez pas encore effectué de réservation.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Mes Réservations</h2>
        <p className="text-gray-500">Suivez l'état de vos réservations</p>
      </div>

      <div className="space-y-4">
        {reservations.map((reservation) => (
          <div
            key={reservation.id}
            className="rounded-lg border border-gray-200 bg-white overflow-hidden shadow-sm"
          >
            <div className="sm:flex">
              <div className="sm:w-48 h-32 sm:h-auto">
                <img
                  src={reservation.circuit.image_url}
                  alt={reservation.circuit.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-lg font-medium text-gray-900">
                    {reservation.circuit.title}
                  </h3>
                  <div
                    className={cn(
                      "mt-2 sm:mt-0 px-3 py-1 rounded-full text-sm border",
                      statusConfig[reservation.status].className
                    )}
                  >
                    {statusConfig[reservation.status].label}
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center text-gray-500">
                    <CalendarDays className="h-5 w-5 mr-2" />
                    <span>
                      {format(new Date(reservation.start_date), "d MMMM yyyy", {
                        locale: fr,
                      })}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>{reservation.circuit.duration} jours</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Users className="h-5 w-5 mr-2" />
                    <span>{reservation.participants} participants</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Réservé le{" "}
                    {format(new Date(reservation.created_at), "d MMMM yyyy", {
                      locale: fr,
                    })}
                  </div>
                  <div className="font-medium text-emerald-600">
                    {(reservation.circuit.price * reservation.participants).toLocaleString()} €
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reservations;
