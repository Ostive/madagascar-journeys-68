import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

const circuits = [
  {
    title: "Grand Tour de Madagascar",
    description: "Un voyage complet à travers les plus beaux sites de l'île",
    duration: "15 jours",
    persons: "4-12 personnes",
    price: "2499",
    rating: "4.8",
    image: "/images/grand-tour.jpg"
  },
  {
    title: "Route du Sud",
    description: "Découverte des parcs nationaux et des plages du Sud",
    duration: "8 jours",
    persons: "6-10 personnes",
    price: "1299",
    rating: "4.6",
    image: "/images/sud.jpg"
  },
  {
    title: "Aventure Nord-Ouest",
    description: "Entre tsingys, baobabs et plages paradisiaques",
    duration: "12 jours",
    persons: "4-8 personnes",
    price: "1899",
    rating: "4.9",
    image: "/images/nord-ouest.jpg"
  }
];

const CircuitsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-poppins font-bold text-dark text-center mb-4">
            Nos Circuits
          </h1>
          <p className="text-lg text-dark/70 text-center mb-12 font-opensans">
            Des itinéraires soigneusement conçus pour une expérience inoubliable
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {circuits.map((circuit) => (
              <Card key={circuit.title} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="grid md:grid-cols-2 h-full">
                  <div className="relative h-64 md:h-full">
                    <img
                      src={circuit.image}
                      alt={circuit.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-semibold">{circuit.rating}</span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col">
                    <h3 className="text-xl font-poppins font-semibold mb-2">
                      {circuit.title}
                    </h3>
                    <p className="text-dark/70 mb-4 font-opensans">
                      {circuit.description}
                    </p>
                    <div className="space-y-2 mb-4 mt-auto">
                      <p className="text-sm text-dark/70">
                        <span className="font-semibold">Durée:</span> {circuit.duration}
                      </p>
                      <p className="text-sm text-dark/70">
                        <span className="font-semibold">Groupe:</span> {circuit.persons}
                      </p>
                      <p className="text-lg font-semibold text-emerald">
                        À partir de {circuit.price}€
                      </p>
                    </div>
                    <Button className="w-full bg-emerald hover:bg-emerald/90">
                      Réserver
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircuitsPage;