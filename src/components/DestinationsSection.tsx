import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { destinations } from "@/data/data";
import DestinationCard from "./cards/DestinationCard";
import { ArrowRight } from "lucide-react";

const DestinationsSection = () => {
  return (
    <section className="py-20 bg-gray-50" id="destinations">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-poppins font-bold text-dark text-center mb-4">
          Destinations Populaires
        </h2>
        <p className="text-lg text-dark/70 text-center mb-12 font-opensans">
          Explorez nos circuits les plus appréciés à travers Madagascar
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          {destinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          )).filter((_, index) => index < 4)}
        </div>

        <div className="mt-12 flex justify-center">
          <Link to="/destinations">
            <Button
              variant="outline"
              className="group flex items-center gap-2 transition-all duration-300 hover:bg-emerald hover:text-white"
            >
              Voir toutes les destinations
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default DestinationsSection;