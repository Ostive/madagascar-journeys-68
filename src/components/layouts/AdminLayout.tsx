import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/components/auth/AuthProvider";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  Map, 
  MapPin, 
  BookOpen, 
  Users, 
  Settings,
  FileText,
  Calendar
} from "lucide-react";
import { Outlet, Link, useLocation } from "react-router-dom";

export function AdminLayout() {
  const location = useLocation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      toast({
        title: "Accès refusé",
        description: "Vous devez être connecté pour accéder à cette page.",
        variant: "destructive",
      });
      navigate("/");
      return;
    }

    if (user.email !== "admin@gmail.com") {
      toast({
        title: "Accès refusé",
        description: "Vous n'avez pas les droits d'accès à cette page.",
        variant: "destructive",
      });
      navigate("/");
      return;
    }
  }, [user, navigate, toast]);

  if (!user || user.email !== "admin@gmail.com") {
    return null;
  }

  const items = [
    {
      title: "Dashboard",
      url: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Circuits",
      url: "/admin/circuit",
      icon: Map,
    },
    {
      title: "Destinations",
      url: "/admin/destination",
      icon: MapPin,
    },
    {
      title: "Réservations",
      url: "/admin/bookings",
      icon: Calendar,
    },
    {
      title: "Blog",
      url: "/admin/blog",
      icon: FileText,
    },
    {
      title: "Utilisateurs",
      url: "/admin/users",
      icon: Users,
    },
    {
      title: "Paramètres",
      url: "/admin/settings",
      icon: Settings,
    },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Administration</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname === item.url}
                        tooltip={item.title}
                      >
                        <Link to={item.url}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <main className="flex-1 overflow-x-hidden p-8">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}