import { useState, useEffect } from "react";
import { Menu, X, LogOut, ChevronDown, ArrowLeft, Palmtree, Mountain, Building, MapPin, BookOpen, Compass, Bell } from "lucide-react";
import { Button, type ButtonProps } from "./ui/button";
import { Link, useLocation } from "react-router-dom";
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
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mobileMenuItems = [
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

  interface MenuItem {
    title: string;
    path: string;
    submenu?: {
      name: string;
      path: string;
      icon?: JSX.Element;
      description?: string;
    }[];
  }

  const handleMenuItemClick = (item: MenuItem) => {
    if (item.submenu) {
      setActiveSubmenu(item.title);
    } else {
      setIsMenuOpen(false);
      setActiveSubmenu(null);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isHomePage
          ? isScrolled
            ? "bg-black/50 backdrop-blur-sm"
            : "bg-transparent"
          : "bg-gray-900"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-white">
              Madagascar Journeys
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4">
            <MainNavigation />
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {!user && (
              <Button 
                onClick={() => setIsAuthDialogOpen(true)}
                className="bg-transparent border-none text-white/90 hover:bg-white/5 hover:text-white"
              >
                Se connecter
              </Button>
            )}
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="relative h-8 w-8 rounded-full bg-transparent border-none hover:bg-white/5">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={user.photoURL || undefined}
                        alt={user.displayName || "User"}
                      />
                      <AvatarFallback>
                        {user.displayName?.[0] || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 backdrop-blur-xl bg-black/20 border-white/10"
                >
                  <DropdownMenuItem
                    className="text-white/90 focus:text-white focus:bg-white/10"
                    onClick={signOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Se déconnecter</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Mobile Menu Button */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button className="lg:hidden bg-transparent border-none text-white/90 hover:bg-white/5 hover:text-white">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:w-96 backdrop-blur-xl bg-black/20 border-white/10">
                <div className="h-full flex flex-col">
                  {/* Main Menu */}
                  <div
                    className={`flex-1 overflow-y-auto ${
                      activeSubmenu ? "hidden" : "block"
                    }`}
                  >
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

                  {/* Submenus */}
                  {activeSubmenu && (
                    <div className="flex-1 overflow-y-auto">
                      <div className="p-6">
                        <button
                          onClick={() => setActiveSubmenu(null)}
                          className="flex items-center text-sm text-gray-500 mb-6"
                        >
                          <ArrowLeft className="h-4 w-4 mr-2" />
                          Retour
                        </button>
                        <div className="space-y-6">
                          {mobileMenuItems
                            .find((item) => item.title === activeSubmenu)
                            ?.submenu?.map((subItem, index) => (
                              <Link
                                key={index}
                                to={subItem.path}
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50"
                              >
                                <div className="flex-shrink-0 p-2 rounded-lg bg-primary/10">
                                  {subItem.icon}
                                </div>
                                <div>
                                  <h4 className="text-base font-medium text-gray-900">
                                    {subItem.name}
                                  </h4>
                                  {subItem.description && (
                                    <p className="mt-1 text-sm text-gray-500">
                                      {subItem.description}
                                    </p>
                                  )}
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
      </div>

      <AuthDialog
        isOpen={isAuthDialogOpen}
        onClose={() => setIsAuthDialogOpen(false)}
      />
    </header>
  );
};

export default Header;
