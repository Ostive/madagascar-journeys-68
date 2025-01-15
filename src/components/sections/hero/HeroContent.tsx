import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Calendar, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HeroContent = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex items-center">
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white mb-4 md:mb-6 leading-tight">
              <span className="block mb-1 md:mb-2">Explorez</span>
              <span className="hidden sm:block mb-1 md:mb-2">la magie de</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-500">
                Madagascar
              </span>
            </h1>
            <p className="text-base md:text-xl text-white/90 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8 md:mb-12 hidden sm:block">
              Une île unique où nature exceptionnelle et culture authentique se rencontrent
            </p>
            
            {/* Stats - Hidden on mobile */}
            <div className="hidden md:grid grid-cols-3 gap-4 md:gap-8 text-white/80">
              <div>
                <div className="text-2xl md:text-3xl font-bold mb-1">50+</div>
                <div className="text-xs md:text-sm">Destinations</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold mb-1">1000+</div>
                <div className="text-xs md:text-sm">Voyages</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold mb-1">4.9/5</div>
                <div className="text-xs md:text-sm">Note</div>
              </div>
            </div>
          </motion.div>

          {/* Right side - Search form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-black/40 backdrop-blur-lg rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl border border-white/10"
          >
            <h2 className="text-xl md:text-2xl font-bold text-white mb-6 md:mb-8">
              Planifiez votre voyage
            </h2>
            <div className="space-y-4 md:space-y-6">
              <div className="relative">
                <MapPin className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
                <input
                  type="text"
                  placeholder="Destination"
                  className="w-full h-12 md:h-14 pl-10 md:pl-12 pr-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-sm md:text-base"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
                <input
                  type="text"
                  placeholder="Date"
                  className="w-full h-12 md:h-14 pl-10 md:pl-12 pr-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-sm md:text-base"
                />
              </div>
              <div className="relative">
                <Users className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
                <input
                  type="text"
                  placeholder="Voyageurs"
                  className="w-full h-12 md:h-14 pl-10 md:pl-12 pr-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-sm md:text-base"
                />
              </div>
              <Button
                onClick={() => navigate("/search")}
                className="w-full h-12 md:h-14 bg-gradient-to-r from-emerald-400 to-teal-500 text-white rounded-xl hover:opacity-90 transition-opacity text-base md:text-lg font-medium mt-2"
              >
                Rechercher
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroContent;