import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { destinations } from "@/data/data";
import DestinationCard from "./cards/DestinationCard";

const DestinationsSection = () => {
  return (
    <section className="py-20 bg-gray-50" id="destinations">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-dark mb-4">
              Destinations Populaires
            </h2>
            <p className="text-lg text-dark/70 font-opensans">
              Explorez nos circuits les plus appréciés à travers Madagascar
            </p>
          </div>
          <Link to="/destinations">
            <Button
              variant="outline"
              className="hover:bg-emerald hover:text-white"
            >
              Voir tout
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          )).filter((_, index) => index < 4)}
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;