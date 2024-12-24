import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const destinations = [
  {
    title: "Nosy Be",
    description: "Plages paradisiaques et eaux cristallines",
    price: "1200",
    image: "/images/nosy-be.jpg"
  },
  {
    title: "Parc National d'Isalo",
    description: "Canyons spectaculaires et randonnées inoubliables",
    price: "800",
    image: "/images/isalo.jpg"
  },
  {
    title: "Allée des Baobabs",
    description: "Paysages iconiques et couchers de soleil magiques",
    price: "600",
    image: "/images/baobabs.jpg"
  }
];

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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <Card key={destination.title} className="overflow-hidden group">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-poppins font-semibold mb-2">
                  {destination.title}
                </h3>
                <p className="text-dark/70 mb-4 font-opensans">
                  {destination.description}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold text-emerald">
                    À partir de {destination.price}€
                  </p>
                  <Button variant="outline" className="hover:bg-emerald hover:text-white">
                    En savoir plus
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/destinations">
            <Button variant="outline" className="hover:bg-emerald hover:text-white">
              Voir toutes les destinations
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;