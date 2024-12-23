import { Facebook, Instagram, Twitter } from "lucide-react";

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
            <p className="text-white/70 font-opensans">
              Votre partenaire de confiance pour découvrir les merveilles de Madagascar
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-poppins font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-white/70 font-opensans">
              <li>Email: contact@madagascar-travel.com</li>
              <li>Tél: +261 20 22 123 456</li>
              <li>Antananarivo, Madagascar</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-poppins font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors font-opensans">
                  À propos
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors font-opensans">
                  Destinations
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors font-opensans">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors font-opensans">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-xl font-poppins font-semibold mb-4">Suivez-nous</h3>
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
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-white/70 font-opensans">
          <p>© 2024 Madagascar Travel. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;