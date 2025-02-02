import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Map,
  Route,
  FileText,
  CalendarDays,
  Users,
  Image,
  Settings,
  Menu,
  X,
} from "lucide-react";

export const AdminLayout = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigation = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Destinations",
      href: "/admin/destinations",
      icon: Map,
    },
    {
      title: "Circuits",
      href: "/admin/circuits",
      icon: Route,
    },
    {
      title: "Blogs",
      href: "/admin/blogs",
      icon: FileText,
    },
    {
      title: "Réservations",
      href: "/admin/bookings",
      icon: CalendarDays,
    },
    {
      title: "Utilisateurs",
      href: "/admin/users",
      icon: Users,
    },
    {
      title: "Médias",
      href: "/admin/media",
      icon: Image,
    },
    {
      title: "Paramètres",
      href: "/admin/settings",
      icon: Settings,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-emerald-50">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-lg bg-white shadow-lg border border-emerald-100 text-gray-600 hover:text-emerald-600"
        >
          {isSidebarOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen transition-transform lg:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-full w-64 bg-white border-r border-emerald-100 shadow-lg p-4">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-emerald-600">Admin Panel</h1>
          </div>

          <nav className="space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors",
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

      {/* Main content */}
      <div className="lg:pl-64">
        <main className="p-8">
          <div className="rounded-lg bg-white shadow-lg border border-emerald-100 p-6">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};