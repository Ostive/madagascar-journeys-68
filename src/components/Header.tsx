import { useState } from "react";
import { Menu, X, LogOut, ChevronDown } from "lucide-react";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
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
        { name: "Nord", path: "/destinations?region=nord" },
        { name: "Sud", path: "/destinations?region=sud" },
        { name: "Est", path: "/destinations?region=est" },
        { name: "Ouest", path: "/destinations?region=ouest" },
        { name: "Centre", path: "/destinations?region=centre" },
      ],
    },
    {
      title: "Circuits",
      path: "/circuits",
      submenu: [
        { name: "Courts séjours", path: "/circuits?duration=court" },
        { name: "Circuits d'une semaine", path: "/circuits?duration=semaine" },
        { name: "Grands circuits", path: "/circuits?duration=long" },
      ],
    },
    {
      title: "Blog",
      path: "/blog",
      submenu: [
        { name: "Conseils pratiques", path: "/blog/preparer-voyage" },
        { name: "Guides des régions", path: "/blog/explorer-nord" },
        { name: "Inspirations", path: "/blog/top-plages" },
        { name: "Actualités", path: "/blog/evenements" },
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

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-dark" />
            ) : (
              <Menu className="h-6 w-6 text-dark" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden py-4 bg-white rounded-lg shadow-lg">
            <Accordion type="single" collapsible className="w-full">
              {mobileMenuItems.map((item, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  {item.submenu ? (
                    <>
                      <AccordionTrigger className="px-4 py-2 hover:text-emerald">
                        {item.title}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col space-y-2 pl-6">
                          {item.submenu.map((subItem, subIndex) => (
                            <Link
                              key={subIndex}
                              to={subItem.path}
                              className="text-sm text-gray-600 hover:text-emerald py-2"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </>
                  ) : (
                    <div className="px-4 py-2">
                      <Link
                        to={item.path}
                        className="text-dark hover:text-emerald"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.title}
                      </Link>
                    </div>
                  )}
                </AccordionItem>
              ))}
            </Accordion>
          </nav>
        )}
      </div>
      <AuthDialog
        isOpen={isAuthDialogOpen}
        onClose={() => setIsAuthDialogOpen(false)}
      />
    </header>
  );
};

export default Header;