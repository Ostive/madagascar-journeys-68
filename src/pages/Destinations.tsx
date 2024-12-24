import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
  },
  {
    title: "Île Sainte-Marie",
    description: "Paradis tropical et observation des baleines",
    price: "950",
    image: "/images/sainte-marie.jpg"
  },
  {
    title: "Tsingy de Bemaraha",
    description: "Formations rocheuses uniques au monde",
    price: "1100",
    image: "/images/tsingy.jpg"
  }
];

const DestinationsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-poppins font-bold text-dark text-center mb-4">
            Nos Destinations
          </h1>
          <p className="text-lg text-dark/70 text-center mb-12 font-opensans">
            Découvrez les plus beaux endroits de Madagascar
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
        </div>
      </div>
    </div>
  );
};

export default DestinationsPage;