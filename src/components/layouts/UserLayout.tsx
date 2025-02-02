import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { User, CalendarDays, Heart, Bell, Settings } from "lucide-react";
import { useAuth } from "../auth/AuthProvider";

export const UserLayout = () => {
  const location = useLocation();
  const { user } = useAuth();

  const navigation = [
    {
      title: "Mon compte",
      href: "/account",
      icon: User,
    },
    {
      title: "Mes réservations",
      href: "/mes-reservations",
      icon: CalendarDays,
    },
    {
      title: "Mes favoris",
      href: "/mes-favoris",
      icon: Heart,
    },
    {
      title: "Notifications",
      href: "/notifications",
      icon: Bell,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-emerald-50 pt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-64 space-y-2">
            <div className="p-4 rounded-lg bg-white shadow-lg border border-emerald-100">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 text-xl font-medium">
                  {user?.email?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-medium text-gray-900">{user?.email}</div>
                  <div className="text-emerald-600 text-sm">Membre</div>
                </div>
              </div>
              <nav className="space-y-1">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={cn(
                        "flex items-center space-x-2 px-3 py-2 rounded-md transition-colors",
                        isActive
                          ? "bg-emerald-500 text-white"
                          : "text-gray-600 hover:text-emerald-600 hover:bg-emerald-50"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="p-6 rounded-lg bg-white shadow-lg border border-emerald-100">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
