import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const navigation = {
  main: [
    { name: "Accueil", href: "/" },
    { name: "Destinations", href: "/destinations" },
    { name: "Circuits", href: "/circuits" },
    { name: "Blog", href: "/blog" },
    { name: "À Propos", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
  destinations: [
    { name: "Nosy Be", href: "/destinations/nosy-be" },
    { name: "Antananarivo", href: "/destinations/antananarivo" },
    { name: "Isalo", href: "/destinations/isalo" },
    { name: "Diego Suarez", href: "/destinations/diego-suarez" },
    { name: "Fort Dauphin", href: "/destinations/fort-dauphin" },
    { name: "Sainte Marie", href: "/destinations/sainte-marie" },
  ],
  circuits: [
    { name: "Nord Sauvage", href: "/circuits/nord-sauvage" },
    { name: "Route du Sud", href: "/circuits/route-du-sud" },
    { name: "Tsingy de Bemaraha", href: "/circuits/tsingy-de-bemaraha" },
    { name: "Baobabs et Plages", href: "/circuits/baobabs-et-plages" },
    { name: "Tour de l'Île", href: "/circuits/tour-de-l-ile" },
    { name: "Safari Photo", href: "/circuits/safari-photo" },
  ],
  social: [
    {
      name: "Facebook",
      href: "#",
      icon: Facebook,
    },
    {
      name: "Instagram",
      href: "#",
      icon: Instagram,
    },
    {
      name: "Twitter",
      href: "#",
      icon: Twitter,
    },
    {
      name: "YouTube",
      href: "#",
      icon: Youtube,
    },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-gray-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            {/* Company Info */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <img
                  className="h-16"
                  src="/logo-light.png"
                  alt="Madagascar Journeys"
                />
                <p className="mt-6 text-gray-400 max-w-md">
                  Votre partenaire de confiance pour découvrir Madagascar. Des voyages authentiques et inoubliables dans la Grande Île.
                </p>
                
                {/* Contact Info */}
                <div className="mt-6 space-y-4">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-emerald-500 mr-3" />
                    <span className="text-gray-400">123 Rue de Madagascar, Antananarivo</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-emerald-500 mr-3" />
                    <span className="text-gray-400">+261 34 12 345 67</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-emerald-500 mr-3" />
                    <span className="text-gray-400">contact@madagascar-journeys.com</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Navigation */}
            <div className="mt-16 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <h3 className="text-lg font-semibold text-white">Destinations</h3>
                  <ul className="mt-4 space-y-3">
                    {navigation.destinations.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          className="text-gray-400 hover:text-emerald-400 transition-colors"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mt-12 md:mt-0"
                >
                  <h3 className="text-lg font-semibold text-white">Circuits</h3>
                  <ul className="mt-4 space-y-3">
                    {navigation.circuits.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          className="text-gray-400 hover:text-emerald-400 transition-colors"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <h3 className="text-lg font-semibold text-white">Navigation</h3>
                  <ul className="mt-4 space-y-3">
                    {navigation.main.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          className="text-gray-400 hover:text-emerald-400 transition-colors"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mt-12 md:mt-0"
                >
                  <h3 className="text-lg font-semibold text-white">Légal</h3>
                  <ul className="mt-4 space-y-3">
                    <li>
                        <Link
                          to="/legal/mentions-legales"
                          className="text-gray-400 hover:text-emerald-400 transition-colors"
                        >
                        Mentions Légales
                      </Link>
                    </li>
                    <li>
                        <Link
                          to="/legal/politique-de-confidentialite"
                          className="text-gray-400 hover:text-emerald-400 transition-colors"
                        >
                        Politique de Confidentialité
                      </Link>
                    </li>
                    <li>
                        <Link
                          to="/legal/politique-cookies"
                          className="text-gray-400 hover:text-emerald-400 transition-colors"
                        >
                        Politique des Cookies
                      </Link>
                    </li>
                    <li>
                        <Link
                          to="/legal/cgv"
                          className="text-gray-400 hover:text-emerald-400 transition-colors"
                        >
                        CGV
                      </Link>
                    </li>
                    <li>
                        <Link
                          to="/legal/cgu"
                          className="text-gray-400 hover:text-emerald-400 transition-colors"
                        >
                        CGU
                      </Link>
                    </li>
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center">
              {/* Copyright */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-gray-400 text-sm text-center md:text-left"
              >
                &copy; {new Date().getFullYear()} Madagascar Journeys. Tous droits réservés.
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex space-x-6 mt-4 md:mt-0"
              >
                {navigation.social.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-gray-400 hover:text-emerald-400 transition-colors"
                    >
                      <span className="sr-only">{item.name}</span>
                      <Icon className="h-6 w-6" />
                    </a>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
