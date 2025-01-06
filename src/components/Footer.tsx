import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer className="bg-dark text-white" id="contact">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-poppins font-semibold mb-4">
              Madagascar Travel
            </h3>
            <p className="text-white/70 font-opensans mb-4">
              Votre partenaire de confiance pour découvrir les merveilles de Madagascar. Nous nous engageons à vous offrir des expériences de voyage inoubliables.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-emerald transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-emerald transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-emerald transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-poppins font-semibold mb-4">Contact</h3>
            <ul className="space-y-4 text-white/70 font-opensans">
              <li className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-emerald" />
                Antananarivo, Madagascar
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2 text-emerald" />
                +261 20 22 123 456
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-emerald" />
                contact@madagascar-travel.com
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-poppins font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-white/70 hover:text-white transition-colors font-opensans">
                  À propos
                </a>
              </li>
              <li>
                <a href="/destinations" className="text-white/70 hover:text-white transition-colors font-opensans">
                  Destinations
                </a>
              </li>
              <li>
                <a href="/circuits" className="text-white/70 hover:text-white transition-colors font-opensans">
                  Circuits
                </a>
              </li>
              <li>
                <a href="/blog" className="text-white/70 hover:text-white transition-colors font-opensans">
                  Blog
                </a>
              </li>
              <li>
                <a href="#faq" className="text-white/70 hover:text-white transition-colors font-opensans">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-poppins font-semibold mb-4">Newsletter</h3>
            <p className="text-white/70 font-opensans mb-4">
              Inscrivez-vous pour recevoir nos dernières actualités
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Votre email"
                className="w-full px-4 py-2 rounded bg-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-emerald"
              />
              <Button className="w-full bg-emerald hover:bg-emerald/90">
                S'inscrire
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/70 font-opensans">
          <p>© 2024 Madagascar Travel. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;