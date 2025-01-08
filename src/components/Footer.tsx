import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald" />
                123 Rue Principale, Antananarivo
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-emerald" />
                +261 20 12 345 67
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-emerald" />
                contact@madagascartravel.com
              </p>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/destinations" className="hover:text-emerald transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link to="/circuits" className="hover:text-emerald transition-colors">
                  Circuits
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-emerald transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-emerald transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-emerald transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Informations légales</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/mentions-legales" className="hover:text-emerald transition-colors">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link to="/politique-confidentialite" className="hover:text-emerald transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link to="/cgu" className="hover:text-emerald transition-colors">
                  CGU
                </Link>
              </li>
              <li>
                <Link to="/cgv" className="hover:text-emerald transition-colors">
                  CGV
                </Link>
              </li>
              <li>
                <Link to="/politique-cookies" className="hover:text-emerald transition-colors">
                  Politique des cookies
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Suivez-nous</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-emerald transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-emerald transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-emerald transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="text-center">
            <p>&copy; {new Date().getFullYear()} Madagascar Travel. Tous droits réservés.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;