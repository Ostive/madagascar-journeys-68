import { useState } from "react";
import { Menu, X, LogOut, ChevronDown, ArrowLeft, Palmtree, Mountain, Building, MapPin, BookOpen, Compass, Bell } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { AuthDialog } from "./auth/AuthDialog";
import { useAuth } from "./auth/AuthProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MainNavigation } from "./navigation/MainNavigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const { user, signOut } = useAuth();

  const mobileMenuItems = [
    {
      title: "Accueil",
      path: "/",
    },
    {
      title: "Destinations",
      path: "/destinations",
      submenu: [
        { 
          name: "Nord", 
          path: "/destinations?region=nord",
          icon: <Palmtree className="h-6 w-6" />,
          description: "Découvrez les plages paradisiaques et les îles du Nord"
        },
        { 
          name: "Sud", 
          path: "/destinations?region=sud",
          icon: <Mountain className="h-6 w-6" />,
          description: "Explorez les parcs nationaux et les paysages uniques du Sud"
        },
        { 
          name: "Est", 
          path: "/destinations?region=est",
          icon: <Palmtree className="h-6 w-6" />,
          description: "Visitez les forêts tropicales et les côtes sauvages de l'Est"
        },
        { 
          name: "Ouest", 
          path: "/destinations?region=ouest",
          icon: <Mountain className="h-6 w-6" />,
          description: "Admirez les baobabs et les formations rocheuses de l'Ouest"
        },
        { 
          name: "Centre", 
          path: "/destinations?region=centre",
          icon: <Building className="h-6 w-6" />,
          description: "Découvrez la culture et l'histoire au cœur de Madagascar"
        },
      ],
    },
    {
      title: "Circuits",
      path: "/circuits",
      submenu: [
        { name: "Courts séjours", icon: <MapPin className="h-6 w-6" />, path: "/circuits?duration=court" },
        { name: "Circuits d'une semaine", icon: <MapPin className="h-6 w-6" />, path: "/circuits?duration=semaine" },
        { name: "Grands circuits", icon: <MapPin className="h-6 w-6" />, path: "/circuits?duration=long" },
      ],
    },
    {
      title: "Blog",
      path: "/blog",
      submenu: [
        { name: "Conseils pratiques", icon: <BookOpen className="h-6 w-6" />, path: "/blog/preparer-voyage" },
        { name: "Guides des régions", icon: <MapPin className="h-6 w-6" />, path: "/blog/explorer-nord" },
        { name: "Inspirations", icon: <Compass className="h-6 w-6" />, path: "/blog/top-plages" },
        { name: "Actualités", icon: <Bell className="h-6 w-6" />, path: "/blog/evenements" },
      ],
    },
    {
      title: "À propos",
      path: "/about",
    },
    {
      title: "Contact",
      path: "/contact",
    },
  ];

  const handleMenuItemClick = (item: any) => {
    if (item.submenu) {
      setActiveSubmenu(item.title);
    } else {
      setIsMenuOpen(false);
      setActiveSubmenu(null);
    }
  };

  return (
    <header className="fixed w-full bg-white/90 backdrop-blur-md z-40 shadow-sm md:top-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-poppins font-bold text-dark">
              Madagascar<span className="text-emerald">Travel</span>
            </span>
          </Link>

          <nav className="hidden md:block">
            <MainNavigation />
          </nav>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-10 w-10 cursor-pointer hover:opacity-80 transition-opacity">
                  <AvatarImage src={user.user_metadata?.avatar_url || "/lovable-uploads/avatar.png"} />
                  <AvatarFallback className="bg-emerald text-white">
                    {user.email?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex flex-col space-y-1 p-2 border-b">
                  <p className="text-sm font-medium">{user.email?.split("@")[0]}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <Link to="/account">
                  <DropdownMenuItem>Mon compte</DropdownMenuItem>
                </Link>
                <Link to="/bookings">
                  <DropdownMenuItem>Mes réservations</DropdownMenuItem>
                </Link>
                <Link to="/favorites">
                  <DropdownMenuItem>Mes favoris</DropdownMenuItem>
                </Link>
                <DropdownMenuItem 
                  onClick={() => signOut()}
                  className="text-red-500 hover:text-red-600"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Déconnexion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="outline"
              className="text-dark border-none bg-transparent hover:text-emerald"
              onClick={() => setIsAuthDialogOpen(true)}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="/lovable-uploads/avatar.png" />
                <AvatarFallback>GT</AvatarFallback>
              </Avatar>
              <span className="hidden md:inline ml-2">Se connecter</span>
            </Button>
          )}

          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6 text-dark" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full p-0">
              <div className="h-full flex flex-col">
                {/* Menu principal */}
                <div className={`flex-1 overflow-y-auto ${activeSubmenu ? 'hidden' : 'block'}`}>
                  <div className="p-6">
                    <div className="space-y-4">
                      {mobileMenuItems.map((item, index) => (
                        <div key={index} className="py-2">
                          {item.submenu ? (
                            <button
                              onClick={() => handleMenuItemClick(item)}
                              className="flex items-center justify-between w-full text-lg font-medium text-gray-900"
                            >
                              {item.title}
                              <ChevronDown className="h-5 w-5" />
                            </button>
                          ) : (
                            <Link
                              to={item.path}
                              onClick={() => handleMenuItemClick(item)}
                              className="block text-lg font-medium text-gray-900"
                            >
                              {item.title}
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sous-menus */}
                {activeSubmenu && (
                  <div className="absolute inset-0 bg-white">
                    <div className="p-6">
                      <button
                        onClick={() => setActiveSubmenu(null)}
                        className="flex items-center text-gray-600 mb-6"
                      >
                        <ArrowLeft className="h-5 w-5 mr-2" />
                        Retour
                      </button>
                      <h2 className="text-xl font-semibold mb-4">{activeSubmenu}</h2>
                      <div className="space-y-4">
                        {mobileMenuItems
                          .find(item => item.title === activeSubmenu)
                          ?.submenu?.map((subItem, index) => (
                            <Link
                              key={index}
                              to={subItem.path}
                              onClick={() => {
                                setIsMenuOpen(false);
                                setActiveSubmenu(null);
                              }}
                              className="block"
                            >
                              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100">
                                {'icon' in subItem && subItem.icon}
                                <div>
                                  <h3 className="text-lg font-medium">{subItem.name}</h3>
                                  {'description' in subItem && (
                                    <p className="text-sm text-gray-600">{subItem.description}</p>
                                  )}
                                </div>
                              </div>
                            </Link>
                          ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <AuthDialog
        isOpen={isAuthDialogOpen}
        onClose={() => setIsAuthDialogOpen(false)}
      />
    </header>
  );
};

export default Header;