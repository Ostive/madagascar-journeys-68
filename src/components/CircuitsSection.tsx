import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Clock, Users, Star } from "lucide-react";

const circuits = [
  {
    title: "Grand Tour de Madagascar",
    description: "Un voyage complet à travers les plus beaux sites de l'île",
    duration: "15 jours",
    persons: "4-12 personnes",
    price: "2499",
    rating: "4.8",
    image: "/lovable-uploads/b33d8cd1-7240-4e19-8051-c0c3dc7afd42.png"
  },
  {
    title: "Route du Sud",
    description: "Découverte des parcs nationaux et des plages du Sud",
    duration: "8 jours",
    persons: "6-10 personnes",
    price: "1299",
    rating: "4.6",
    image: "/lovable-uploads/b33d8cd1-7240-4e19-8051-c0c3dc7afd42.png"
  },
  {
    title: "Aventure Nord-Ouest",
    description: "Entre tsingys, baobabs et plages paradisiaques",
    duration: "12 jours",
    persons: "4-8 personnes",
    price: "1899",
    rating: "4.9",
    image: "/lovable-uploads/b33d8cd1-7240-4e19-8051-c0c3dc7afd42.png"
  }
];

const CircuitsSection = () => {
  return (
    <section className="py-20 bg-white" id="circuits">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-poppins font-bold text-dark text-center mb-4">
          Nos Circuits Populaires
        </h2>
        <p className="text-lg text-dark/70 text-center mb-12 font-opensans">
          Découvrez nos itinéraires les plus appréciés à travers Madagascar
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {circuits.map((circuit) => (
            <Card key={circuit.title} className="overflow-hidden group">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={circuit.image}
                  alt={circuit.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-semibold">{circuit.rating}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-poppins font-semibold mb-2">
                  {circuit.title}
                </h3>
                <p className="text-dark/70 mb-4 font-opensans">
                  {circuit.description}
                </p>
                <div className="flex items-center gap-4 mb-4 text-sm text-dark/70">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {circuit.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {circuit.persons}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold text-emerald">
                    À partir de {circuit.price}€
                  </p>
                  <Button variant="outline" className="hover:bg-emerald hover:text-white rounded-full">
                    En savoir plus
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/circuits">
            <Button variant="outline" className="hover:bg-emerald hover:text-white">
              Voir tous les circuits
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CircuitsSection;