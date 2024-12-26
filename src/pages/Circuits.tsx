import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users, Star } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const circuits = [
  {
    title: "Grand Tour de Madagascar",
    description: "Un voyage complet à travers les plus beaux sites de l'île",
    duration: "15 jours",
    persons: "4-12 personnes",
    price: "2499",
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e"
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

const CircuitsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-4">Nos Circuits</h1>
        <p className="text-gray-600 mb-8">
          Des itinéraires soigneusement conçus pour vous faire découvrir les merveilles de Madagascar. 
          Chaque circuit est une aventure unique, adaptée à vos envies et à votre rythme.
        </p>

        <Card className="p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="text-emerald">⚡</span> Filtrer les circuits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Toutes les difficultés" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les difficultés</SelectItem>
                <SelectItem value="easy">Facile</SelectItem>
                <SelectItem value="moderate">Modéré</SelectItem>
                <SelectItem value="difficult">Difficile</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Toutes les tailles" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les tailles</SelectItem>
                <SelectItem value="small">2-4 personnes</SelectItem>
                <SelectItem value="medium">4-8 personnes</SelectItem>
                <SelectItem value="large">8+ personnes</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Tous les prix" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les prix</SelectItem>
                <SelectItem value="budget">Moins de 1000€</SelectItem>
                <SelectItem value="mid">1000€ - 2000€</SelectItem>
                <SelectItem value="luxury">Plus de 2000€</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Toutes les durées" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les durées</SelectItem>
                <SelectItem value="short">1-3 jours</SelectItem>
                <SelectItem value="medium">4-7 jours</SelectItem>
                <SelectItem value="long">8+ jours</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {circuits.map((circuit) => (
            <Card key={circuit.title} className="overflow-hidden">
              <div className="relative h-48">
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
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{circuit.title}</h3>
                <p className="text-gray-600 mb-4">{circuit.description}</p>
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
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
                  <Button className="bg-emerald hover:bg-emerald/90">
                    Réserver
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CircuitsPage;