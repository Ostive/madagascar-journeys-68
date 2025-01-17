import { useState, useEffect } from "react";
import { Menu, X, LogOut, ChevronDown, ArrowLeft, Palmtree, Mountain, Building, MapPin, BookOpen, Compass, Bell, ChevronRight } from "lucide-react";
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
import { MainNavigation } from "@/components/navigation/MainNavigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navigationConfig } from "@/components/navigation/config";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

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
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mobileMenuItems = [
    navigationConfig.destinations,
    navigationConfig.circuits,
    navigationConfig.blog,
    navigationConfig.about,
    navigationConfig.contact,
  ];

  const handleMenuItemClick = (item: typeof mobileMenuItems[number]) => {
    if ('submenu' in item) {
      setActiveSubmenu(item.title);
    } else {
      setIsMenuOpen(false);
      setActiveSubmenu(null);
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-[#0B1C2F]/95 backdrop-blur-lg shadow-lg" : "bg-transparent",
        isHomePage ? "text-white" : "bg-[#0B1C2F]/95 backdrop-blur-lg shadow-lg"
      )}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
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
            <SheetContent side="right" className="w-full sm:w-[400px] bg-gray-900/95 backdrop-blur-xl border-white/10 p-0">
              <div className="h-full flex flex-col">
                {/* Main Menu */}
                <div
                  className={`flex-1 overflow-y-auto ${
                    activeSubmenu ? "hidden" : "block"
                  }`}
                >
                  <div className="p-6">
                    <div className="space-y-6">
                      {mobileMenuItems.map((item) => (
                        <div key={item.title} className="py-1">
                          {'submenu' in item ? (
                            <button
                              onClick={() => handleMenuItemClick(item)}
                              className="flex items-center justify-between w-full text-lg font-medium text-white/90 hover:text-white transition-colors group"
                            >
                              <span>{item.title}</span>
                              <ChevronRight className="h-5 w-5 opacity-75 group-hover:opacity-100 transition-all" />
                            </button>
                          ) : (
                            <Link
                              to={item.path}
                              onClick={() => handleMenuItemClick(item)}
                              className="block text-lg font-medium text-white/90 hover:text-white transition-colors"
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
                    <div className="sticky top-0 z-10 p-6 pb-4 bg-gradient-to-b from-gray-900/95 via-gray-900/95 to-gray-900/0">
                      <button
                        onClick={() => setActiveSubmenu(null)}
                        className="flex items-center text-sm text-white/75 hover:text-white transition-colors mb-4"
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Retour
                      </button>
                      <h3 className="text-xl font-semibold text-white">{activeSubmenu}</h3>
                    </div>
                    <div className="px-4 pb-6">
                      <div className="grid gap-4">
                        {Object.values(navigationConfig)
                          .find((item) => item.title === activeSubmenu)
                          ?.submenu?.map((subItem) => (
                            <Link
                              key={subItem.title}
                              to={subItem.path}
                              onClick={() => setIsMenuOpen(false)}
                              className="group relative overflow-hidden rounded-2xl"
                            >
                              <div className="relative aspect-[16/9] overflow-hidden">
                                <img 
                                  src={subItem.image} 
                                  alt={subItem.title}
                                  className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                              </div>
                              <div className="absolute inset-0 p-4 flex flex-col justify-end">
                                <h4 className="text-lg font-semibold text-white group-hover:text-white/90 transition-colors">
                                  {subItem.title}
                                </h4>
                                {subItem.description && (
                                  <p className="mt-1 text-sm text-white/80 group-hover:text-white/70 transition-colors line-clamp-2">
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

      <AuthDialog
        isOpen={isAuthDialogOpen}
        onClose={() => setIsAuthDialogOpen(false)}
      />
    </header>
  );
};

export default Header;
