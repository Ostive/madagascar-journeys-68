import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { MapPin, Palmtree, Mountain, Building } from "lucide-react";
import { Link } from "react-router-dom";

const regions = [
  { 
    name: "Nord", 
    examples: "Nosy Be, Diego Suarez", 
    path: "/destinations?region=nord",
    image: "https://my-make-bucket.s3.eu-north-1.amazonaws.com/Photos/n23fvkcer7vlg7vmb1w9.webp"
  },
  { 
    name: "Sud", 
    examples: "Tuléar, Isalo", 
    path: "/destinations?region=sud",
    image: "https://www.parcs-madagascar.com/parcs/images/andringitra/andringitra.jpg"
  },
  { 
    name: "Est", 
    examples: "Sainte-Marie, Pangalanes", 
    path: "/destinations?region=est",
    image: "https://madagascar-green-island-discovery.com/wp-content/uploads/2020/07/Masoala.jpg"
  },
  { 
    name: "Ouest", 
    examples: "Morondava, Bemaraha", 
    path: "/destinations?region=ouest",
    image: "https://ifc.shorthandstories.com/b-tir-des-opportunit-s-madagascar-un-microcr-dit-la-fois/assets/YC1RKIcLkR/madagascartanadronejs-frame-0ms-1920x1080.jpg"
  },
  { 
    name: "Centre", 
    examples: "Antananarivo, Antsirabe", 
    path: "/destinations?region=centre",
    image: "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcRIMiXSoT13oLl0l9VUfehrkIhRNg4b4H7-WhBG6Rua997J47UGzc8utoOgBUAiuKC_OcoTVpX1yj7iAOsAjo_yY8PovuQtbpVgHEmzyA"
  },
];

const types = [
  { name: "Plages et lagons", icon: Palmtree, path: "/destinations?type=plages" },
  { name: "Parcs nationaux et réserves", icon: MapPin, path: "/destinations?type=parcs" },
  { name: "Villes et villages historiques", icon: Building, path: "/destinations?type=villes" },
  { name: "Paysages montagneux", icon: Mountain, path: "/destinations?type=montagnes" },
];

export function DestinationsMenu() {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>Destinations</NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="p-6 w-[800px]">
          <div className="mb-6">
            <h4 className="mb-3 text-sm font-medium leading-none">Par région</h4>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {regions.map((region) => (
                <Link
                  key={region.name}
                  to={region.path}
                  className="block min-w-[180px] select-none rounded-md no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  <div className="relative h-24 overflow-hidden rounded-md">
                    <img 
                      src={region.image} 
                      alt={region.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute bottom-2 left-2 text-white">
                      <div className="text-sm font-medium leading-none">{region.name}</div>
                      <p className="text-xs leading-snug text-white/80 mt-1">
                        {region.examples}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="mb-3 text-sm font-medium leading-none">Par type</h4>
            <div className="grid grid-cols-2 gap-2">
              {types.map(({ name, icon: Icon, path }) => (
                <Link
                  key={name}
                  to={path}
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium leading-none">{name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}