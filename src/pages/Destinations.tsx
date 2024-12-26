import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Calendar } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const destinations = [
  {
    title: "Parc National d'Andasibe",
    description: "Forêt tropicale abritant les célèbres lémuriens Indri",
    duration: "2 jours",
    difficulty: "Facile",
    price: "299",
    type: "Nature",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027"
  },
  {
    title: "Allée des Baobabs",
    description: "Site naturel emblématique de Madagascar",
    duration: "1 jour",
    difficulty: "Facile",
    price: "199",
    type: "Paysage",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
  },
  {
    title: "Nosy Be",
    description: "Île paradisiaque aux plages de sable blanc",
    duration: "5 jours",
    difficulty: "Modéré",
    price: "599",
    type: "Plage",
    image: "/lovable-uploads/e33ed146-65bb-44b8-9251-84d03d375284.png"
  }
];

const DestinationsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-4">Nos Destinations</h1>
        <p className="text-gray-600 mb-8">
          Explorez nos destinations soigneusement sélectionnées à Madagascar. Des plages paradisiaques aux forêts tropicales, 
          découvrez la diversité exceptionnelle de la Grande Île.
        </p>

        <Card className="p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="text-emerald">⚡</span> Filtrer les destinations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Tous les types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="nature">Nature</SelectItem>
                <SelectItem value="culture">Culture</SelectItem>
                <SelectItem value="beach">Plage</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Tous les budgets" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les budgets</SelectItem>
                <SelectItem value="low">Économique</SelectItem>
                <SelectItem value="medium">Intermédiaire</SelectItem>
                <SelectItem value="high">Premium</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Toutes les durées" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les durées</SelectItem>
                <SelectItem value="day">1 jour</SelectItem>
                <SelectItem value="short">2-3 jours</SelectItem>
                <SelectItem value="week">4+ jours</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Toutes les saisons" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les saisons</SelectItem>
                <SelectItem value="dry">Saison sèche</SelectItem>
                <SelectItem value="wet">Saison des pluies</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <Card key={destination.title} className="overflow-hidden">
              <div className="relative h-48">
                <img
                  src={destination.image}
                  alt={destination.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm">
                  {destination.type}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{destination.title}</h3>
                  <span className="text-sm text-gray-600">{destination.duration}</span>
                </div>
                <p className="text-gray-600 mb-4">{destination.description}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${
                    destination.difficulty === "Facile" ? "text-emerald" : 
                    destination.difficulty === "Modéré" ? "text-orange-500" : "text-red-500"
                  }`}>
                    {destination.difficulty}
                  </span>
                  <Button variant="link" className="text-emerald hover:text-emerald/90">
                    En savoir plus →
                  </Button>
                </div>
                <div className="absolute top-4 left-4 bg-emerald text-white px-3 py-1 rounded-full text-sm">
                  À partir de {destination.price}€
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DestinationsPage;