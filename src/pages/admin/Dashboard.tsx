import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Users,
  Route,
  CalendarDays,
  Heart,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

interface DashboardStats {
  totalUsers: number;
  totalCircuits: number;
  totalBookings: number;
  totalFavorites: number;
  recentBookings: any[];
  userGrowth: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalCircuits: 0,
    totalBookings: 0,
    totalFavorites: 0,
    recentBookings: [],
    userGrowth: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [
          { count: usersCount },
          { count: circuitsCount },
          { count: bookingsCount },
          { count: favoritesCount },
          { data: recentBookings },
        ] = await Promise.all([
          supabase.from("users").select("*", { count: "exact" }),
          supabase.from("circuits").select("*", { count: "exact" }),
          supabase.from("reservations").select("*", { count: "exact" }),
          supabase.from("favorites").select("*", { count: "exact" }),
          supabase
            .from("reservations")
            .select("*, circuit:circuits(title)")
            .order("created_at", { ascending: false })
            .limit(5),
        ]);

        setStats({
          totalUsers: usersCount || 0,
          totalCircuits: circuitsCount || 0,
          totalBookings: bookingsCount || 0,
          totalFavorites: favoritesCount || 0,
          recentBookings: recentBookings || [],
          userGrowth: 12, // Example growth percentage
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const stats_cards = [
    {
      title: "Utilisateurs",
      value: stats.totalUsers,
      icon: Users,
      growth: stats.userGrowth,
      trend: "up",
    },
    {
      title: "Circuits",
      value: stats.totalCircuits,
      icon: Route,
      growth: 8,
      trend: "up",
    },
    {
      title: "Réservations",
      value: stats.totalBookings,
      icon: CalendarDays,
      growth: -5,
      trend: "down",
    },
    {
      title: "Favoris",
      value: stats.totalFavorites,
      icon: Heart,
      growth: 15,
      trend: "up",
    },
  ];

  if (loading) {
    return (
      <div className="text-gray-600">
        Chargement du tableau de bord...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Tableau de bord</h2>
        <p className="mt-1 text-gray-500">
          Vue d'ensemble de votre activité
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats_cards.map((stat) => (
          <div
            key={stat.title}
            className="p-6 rounded-lg bg-white border border-gray-100 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div
                className={`p-2 rounded-lg ${
                  stat.trend === "up"
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-red-50 text-red-600"
                }`}
              >
                <stat.icon className="h-5 w-5" />
              </div>
              <div className="flex items-center space-x-1">
                <span
                  className={`text-sm ${
                    stat.trend === "up" ? "text-emerald-600" : "text-red-600"
                  }`}
                >
                  {stat.growth}%
                </span>
                {stat.trend === "up" ? (
                  <ArrowUpRight className="h-4 w-4 text-emerald-600" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-600" />
                )}
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.title}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Bookings */}
      <div className="rounded-lg border border-gray-100 overflow-hidden">
        <div className="bg-white px-6 py-4 border-b border-gray-100">
          <h3 className="font-medium text-gray-900">Réservations récentes</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {stats.recentBookings.map((booking) => (
            <div
              key={booking.id}
              className="flex items-center justify-between p-4 bg-white hover:bg-gray-50"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <CalendarDays className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {booking.circuit.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(booking.created_at).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
              <div
                className={`px-3 py-1 rounded-full text-sm ${
                  booking.status === "confirmed"
                    ? "bg-emerald-50 text-emerald-700"
                    : booking.status === "pending"
                    ? "bg-yellow-50 text-yellow-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {booking.status === "confirmed"
                  ? "Confirmé"
                  : booking.status === "pending"
                  ? "En attente"
                  : "Annulé"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;