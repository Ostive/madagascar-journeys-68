import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Rocket, Home, ArrowLeft, Search, Compass, Map } from "lucide-react";
import { motion } from "framer-motion";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50 to-white flex items-center">
      {/* Curved Separator */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-white">
        <svg
          className="absolute -top-px left-0 right-0 h-20 w-full text-white"
          preserveAspectRatio="none"
          viewBox="0 0 1440 48"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 48h1440V0c-211.52 37.03-421.507 51.137-629.96 42.32C601.587 33.503 385.353 13.367 0 0v48z" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="text-center space-y-12 pt-24">
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-9xl font-bold bg-gradient-to-r from-emerald-500 to-emerald-700 bg-clip-text text-transparent">
              404
            </div>
            <h2 className="text-4xl font-bold text-gray-900">
              Oups ! Page non trouvée
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              La page que vous recherchez a peut-être été supprimée, a changé de nom ou est temporairement indisponible.
            </p>
          </motion.div>

          {/* Search Section */}
          <motion.div
            className="max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Rechercher sur le site..."
                className="pl-10 h-14 text-base shadow-sm rounded-3xl"
              />
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col items-center space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex gap-4 flex-wrap justify-center">
              <Button
                className="bg-gradient-to-r from-emerald-400 to-teal-500 text-white h-12 px-6 text-base md:text-lg gap-2 font-medium rounded-3xl transition-opacity hover:opacity-90"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="h-5 w-5" />
                Retour
              </Button>
              <Button
                className="bg-gradient-to-r from-emerald-400 to-teal-500 text-white h-12 px-6 text-base md:text-lg gap-2 font-medium rounded-3xl transition-opacity hover:opacity-90"
                onClick={() => navigate("/")}
              >
                <Home className="h-5 w-5" />
                Accueil
              </Button>
            </div>

            <div className="text-gray-500 text-sm">
              Ou explorez nos pages populaires :
            </div>

            <div className="flex gap-4 flex-wrap justify-center">
              <Button
                variant="outline"
                onClick={() => navigate("/blog")}
                className="gap-2 text-emerald-700 border-2 border-emerald-700 hover:bg-emerald-50 h-12 px-6 text-base font-medium rounded-3xl transition-opacity hover:opacity-90"
              >
                <Rocket className="h-5 w-5" />
                Découvrir le blog
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/destinations")}
                className="gap-2 text-emerald-700 border-2 border-emerald-700 hover:bg-emerald-50 h-12 px-6 text-base font-medium rounded-3xl transition-opacity hover:opacity-90"
              >
                <Compass className="h-5 w-5" />
                Nos destinations
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/circuits")}
                className="gap-2 text-emerald-700 border-2 border-emerald-700 hover:bg-emerald-50 h-12 px-6 text-base font-medium rounded-3xl transition-opacity hover:opacity-90"
              >
                <Map className="h-5 w-5" />
                Nos circuits
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
