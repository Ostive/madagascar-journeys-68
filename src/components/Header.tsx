import { useState } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { Link, useLocation } from "react-router-dom";
import { AuthDialog } from "./auth/AuthDialog";
import { useAuth } from "./auth/AuthProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DestinationsMenu } from "./navigation/DestinationsMenu";
import { CircuitsMenu } from "./navigation/CircuitsMenu";
import { BlogMenu } from "./navigation/BlogMenu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

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
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/">
                    <NavigationMenuLink
                      className={`px-4 py-2 ${
                        location.pathname === "/" ? "text-emerald" : "text-dark hover:text-emerald"
                      }`}
                    >
                      Accueil
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <DestinationsMenu />
                <CircuitsMenu />
                <NavigationMenuItem>
                  <Link to="/about">
                    <NavigationMenuLink
                      className={`px-4 py-2 ${
                        location.pathname === "/about" ? "text-emerald" : "text-dark hover:text-emerald"
                      }`}
                    >
                      À propos
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <BlogMenu />
                <NavigationMenuItem>
                  <Link to="/contact">
                    <NavigationMenuLink
                      className={`px-4 py-2 ${
                        location.pathname === "/contact" ? "text-emerald" : "text-dark hover:text-emerald"
                      }`}
                    >
                      Contact
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
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
          <nav className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className={`font-opensans ${
                  location.pathname === "/" ? "text-emerald" : "text-dark hover:text-emerald"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Accueil
              </Link>
              <Link
                to="/destinations"
                className={`font-opensans ${
                  location.pathname === "/destinations" ? "text-emerald" : "text-dark hover:text-emerald"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Destinations
              </Link>
              <Link
                to="/circuits"
                className={`font-opensans ${
                  location.pathname === "/circuits" ? "text-emerald" : "text-dark hover:text-emerald"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Circuits
              </Link>
              <Link
                to="/about"
                className={`font-opensans ${
                  location.pathname === "/about" ? "text-emerald" : "text-dark hover:text-emerald"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                À propos
              </Link>
              <Link
                to="/blog"
                className={`font-opensans ${
                  location.pathname === "/blog" ? "text-emerald" : "text-dark hover:text-emerald"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                to="/contact"
                className={`font-opensans ${
                  location.pathname === "/contact" ? "text-emerald" : "text-dark hover:text-emerald"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              {user ? (
                <Button
                  variant="outline"
                  className="border-emerald text-emerald hover:bg-emerald hover:text-white w-full transition-all duration-200"
                  onClick={() => signOut()}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Déconnexion
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="border-emerald text-emerald hover:bg-emerald hover:text-white w-full transition-all duration-200 "
                  onClick={() => {
                    setIsAuthDialogOpen(true);
                    setIsMenuOpen(false);
                  }}
                >
                  <User className="h-4 w-4 rounded" />
                  Se connecter
                </Button>
              )}
            </div>
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
