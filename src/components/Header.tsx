import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { label: "Accueil", href: "/" },
    { label: "Destinations", href: "/destinations" },
    { label: "Circuits", href: "/circuits" },
    { label: "À propos", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed w-full bg-white/90 backdrop-blur-md z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-poppins font-bold text-dark">
              Madagascar<span className="text-emerald">Travel</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.href.startsWith("#") ? `/${item.href}` : item.href}
                className={`font-opensans transition-colors ${
                  location.pathname === item.href
                    ? "text-emerald"
                    : "text-dark hover:text-emerald"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Button className="bg-emerald hover:bg-emerald/90">
              Réserver maintenant
            </Button>
          </nav>

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
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href.startsWith("#") ? `/${item.href}` : item.href}
                  className={`font-opensans ${
                    location.pathname === item.href
                      ? "text-emerald"
                      : "text-dark hover:text-emerald"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Button className="bg-emerald hover:bg-emerald/90 w-full">
                Réserver maintenant
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;