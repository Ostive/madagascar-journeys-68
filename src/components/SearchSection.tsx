import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Search, MapPin, Calendar, Users } from "lucide-react";

const destinations = [
  {
    title: "Circuit Nord",
    description: "Découverte des plages et des îles paradisiaques",
    duration: "8 jours",
    price: "1500"
  },
  {
    title: "Circuit Sud",
    description: "Exploration des parcs nationaux et de la culture locale",
    duration: "10 jours",
    price: "1800"
  },
  {
    title: "Tour Complet",
    description: "Une immersion totale dans la diversité malgache",
    duration: "15 jours",
    price: "2500"
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                <option>Durée</option>
                <option>1 semaine</option>
                <option>2 semaines</option>
                <option>3 semaines</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="text-emerald" />
              <select className="flex-1 p-2 border rounded">
                <option>Type de voyage</option>
                <option>Aventure</option>
                <option>Culture</option>
                <option>Détente</option>
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
              <div className="p-6">
                <h3 className="text-xl font-poppins font-semibold mb-2">
                  {circuit.title}
                </h3>
                <p className="text-dark/70 mb-4 font-opensans">
                  {circuit.description}
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-dark/70">Durée: {circuit.duration}</p>
                    <p className="text-lg font-semibold text-emerald">
                      À partir de {circuit.price}€
                    </p>
                  </div>
                  <Button variant="outline" className="hover:bg-emerald hover:text-white">
                    Détails
                  </Button>
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