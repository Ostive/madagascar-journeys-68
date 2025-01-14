import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { circuits } from "@/data/data";
import CircuitCard from "./cards/CircuitCard";
import { ArrowRight } from "lucide-react";

const CircuitsSection = () => {
  return (
    <section className="py-20 bg-white" id="circuits">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-dark mb-4">
              Nos Circuits Populaires
            </h2>
            <p className="text-lg text-dark/70 font-opensans">
              Découvrez nos itinéraires les plus appréciés à travers Madagascar
            </p>
          </div>
          <Link to="/circuits">
            <Button
              variant="outline"
              className="hidden md:flex items-center gap-2 hover:bg-emerald hover:text-white transition-all"
            >
              Voir tous les circuits
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          {circuits.map((circuit) => (
            <CircuitCard key={circuit.id} circuit={circuit} />
          )).filter((_, index) => index < 4)}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link to="/circuits">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 hover:bg-emerald hover:text-white"
            >
              Voir tous les circuits
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CircuitsSection;