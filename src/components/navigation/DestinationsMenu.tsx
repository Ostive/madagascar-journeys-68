import {
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { MapPin, Palmtree, Mountain, Building } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const regions = [
  { 
    name: "Nord",
    image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?auto=format&fit=crop&w=800&q=80",
    description: "Découvrez les plages paradisiaques et les îles du Nord"
  },
  {
    name: "Sud",
    image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?auto=format&fit=crop&w=800&q=80",
    description: "Explorez les parcs nationaux et les paysages uniques du Sud"
  },
  {
    name: "Est",
    image: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?auto=format&fit=crop&w=800&q=80",
    description: "Visitez les forêts tropicales et les côtes sauvages de l'Est"
  },
  {
    name: "Ouest",
    image: "https://images.unsplash.com/photo-1452378174528-3090a4bba7b2?auto=format&fit=crop&w=800&q=80",
    description: "Admirez les baobabs et les formations rocheuses de l'Ouest"
  },
  {
    name: "Centre",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&q=80",
    description: "Découvrez la culture et l'histoire au cœur de Madagascar"
  }
];

const types = [
  {
    icon: <Palmtree className="h-4 w-4" />,
    name: "Plages",
    description: "Découvrez nos plus belles plages"
  },
  {
    icon: <Mountain className="h-4 w-4" />,
    name: "Montagnes",
    description: "Explorez nos sommets majestueux"
  },
  {
    icon: <Building className="h-4 w-4" />,
    name: "Villes",
    description: "Visitez nos villes historiques"
  }
];

export function DestinationsMenu() {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="text-dark hover:text-emerald">
        <MapPin className="h-4 w-4 mr-1" />
        Destinations
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="p-6 w-[800px] mx-auto">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-sm font-medium leading-none">Par région</h4>
              <Link to="/destinations">
                <Button 
                  variant="ghost" 
                  className="text-sm hover:text-emerald hover:bg-emerald/10"
                >
                  Voir toutes les destinations
                </Button>
              </Link>
            </div>
            <div className="flex justify-center gap-4 overflow-x-auto pb-4">
              {regions.map((region) => (
                <Link
                  key={region.name}
                  to={`/destinations?region=${region.name.toLowerCase()}`}
                  className="relative group min-w-[160px] h-[120px] rounded-lg overflow-hidden"
                >
                  <img
                    src={region.image}
                    alt={region.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                  <div className="absolute inset-0 p-4 flex flex-col justify-end">
                    <h3 className="text-white font-medium mb-1">{region.name}</h3>
                    <p className="text-white/80 text-sm line-clamp-2">{region.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-medium leading-none">Par type</h4>
            <div className="grid grid-cols-3 gap-4">
              {types.map((type) => (
                <Link
                  key={type.name}
                  to={`/destinations?type=${type.name.toLowerCase()}`}
                  className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  <div className="flex items-center gap-2">
                    {type.icon}
                    <div className="text-sm font-medium leading-none">{type.name}</div>
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {type.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}