import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { MapPin, Palmtree, Mountain, Building } from "lucide-react";
import { Link } from "react-router-dom";

const regions = [
  { name: "Nord", examples: "Nosy Be, Diego Suarez", path: "/destinations?region=nord" },
  { name: "Sud", examples: "Tuléar, Isalo", path: "/destinations?region=sud" },
  { name: "Est", examples: "Sainte-Marie, Pangalanes", path: "/destinations?region=est" },
  { name: "Ouest", examples: "Morondava, Bemaraha", path: "/destinations?region=ouest" },
  { name: "Centre", examples: "Antananarivo, Antsirabe", path: "/destinations?region=centre" },
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
        <div className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
          <div className="row-span-3">
            <h4 className="mb-3 text-sm font-medium leading-none">Par région</h4>
            <div className="flex flex-col gap-2">
              {regions.map((region) => (
                <Link
                  key={region.name}
                  to={region.path}
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  <div className="text-sm font-medium leading-none">{region.name}</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {region.examples}
                  </p>
                </Link>
              ))}
            </div>
          </div>
          <div className="row-span-3">
            <h4 className="mb-3 text-sm font-medium leading-none">Par type</h4>
            <div className="flex flex-col gap-2">
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