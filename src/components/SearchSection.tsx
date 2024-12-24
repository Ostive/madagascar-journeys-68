import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Search, MapPin, Calendar, Users, Filter } from "lucide-react";

const destinations = [
  {
    title: "Grand Tour de Madagascar",
    description: "Un voyage complet à travers les plus beaux sites de l'île",
    duration: "15 jours",
    persons: "4-12 personnes",
    price: "2499",
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1580650587430-3d6c10b86e8f?w=800&auto=format&fit=crop"
  },
  {
    title: "Route du Sud",
    description: "Découverte des parcs nationaux et des plages du Sud",
    duration: "8 jours",
    persons: "6-10 personnes",
    price: "1299",
    rating: "4.6",
    image: "https://images.unsplash.com/photo-1580650587430-3d6c10b86e8f?w=800&auto=format&fit=crop"
  },
  {
    title: "Aventure Nord-Ouest",
    description: "Entre tsingys, baobabs et plages paradisiaques",
    duration: "12 jours",
    persons: "4-8 personnes",
    price: "1899",
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1580650587430-3d6c10b86e8f?w=800&auto=format&fit=crop"
  }
];

const SearchSection = () => {
  return (
    <section className="py-20 bg-gray-50" id="circuits">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-poppins font-bold text-dark text-center mb-4">
          Nos Circuits
        </h2>
        <p className="text-lg text-dark/70 text-center mb-12 font-opensans">
          Des itinéraires soigneusement conçus pour une expérience inoubliable
        </p>

        {/* Search Filters */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="text-emerald" />
              <select className="flex-1 p-2 border rounded">
                <option>Type de voyage</option>
                <option>Aventure</option>
                <option>Culture</option>
                <option>Détente</option>
                <option>Nature</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="text-emerald" />
              <select className="flex-1 p-2 border rounded">
                <option>Toutes les régions</option>
                <option>Nord</option>
                <option>Sud</option>
                <option>Est</option>
                <option>Ouest</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="text-emerald" />
              <select className="flex-1 p-2 border rounded">
                <option>Toutes les durées</option>
                <option>1 semaine</option>
                <option>2 semaines</option>
                <option>3 semaines</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="text-emerald" />
              <select className="flex-1 p-2 border rounded">
                <option>Tous les budgets</option>
                <option>< 1000€</option>
                <option>1000€ - 2000€</option>
                <option>> 2000€</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="text-emerald" />
              <select className="flex-1 p-2 border rounded">
                <option>Toutes les saisons</option>
                <option>Printemps</option>
                <option>Été</option>
                <option>Automne</option>
                <option>Hiver</option>
              </select>
            </div>
            <Button className="w-full bg-emerald hover:bg-emerald/90">
              <Search className="mr-2 h-4 w-4" />
              Rechercher
            </Button>
          </div>
        </div>

        {/* Circuits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((circuit) => (
            <Card key={circuit.title} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <img 
                  src={circuit.image} 
                  alt={circuit.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-sm">
                  ★ {circuit.rating}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-poppins font-semibold mb-2">
                  {circuit.title}
                </h3>
                <p className="text-dark/70 mb-4 font-opensans">
                  {circuit.description}
                </p>
                <div className="space-y-2">
                  <p className="text-sm text-dark/70">{circuit.duration}</p>
                  <p className="text-sm text-dark/70">{circuit.persons}</p>
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-lg font-semibold text-emerald">
                      À partir de {circuit.price}€
                    </p>
                    <Button variant="outline" className="hover:bg-emerald hover:text-white">
                      Réserver
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SearchSection;