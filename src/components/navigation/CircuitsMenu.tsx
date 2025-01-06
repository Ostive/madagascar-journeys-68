import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Calendar, Mountain, Crown, Users } from "lucide-react";
import { Link } from "react-router-dom";

const durations = [
  { name: "Courts séjours", desc: "Moins de 5 jours", path: "/circuits?duration=court" },
  { name: "Circuits d'une semaine", desc: "7 jours", path: "/circuits?duration=semaine" },
  { name: "Grands circuits", desc: "2 semaines ou plus", path: "/circuits?duration=long" },
];

const themes = [
  { name: "Aventure", desc: "Randonnées, trekking", icon: Mountain, path: "/circuits?theme=aventure" },
  { name: "Nature", desc: "Parcs nationaux, faune", icon: Mountain, path: "/circuits?theme=nature" },
  { name: "Luxe et confort", desc: "Séjours haut de gamme", icon: Crown, path: "/circuits?theme=luxe" },
  { name: "Culture et traditions", desc: "Villages, rencontres", icon: Users, path: "/circuits?theme=culture" },
];

export function CircuitsMenu() {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>Circuits</NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
          <div className="row-span-3">
            <h4 className="mb-3 text-sm font-medium leading-none">Par durée</h4>
            <div className="flex flex-col gap-2">
              {durations.map((duration) => (
                <Link
                  key={duration.name}
                  to={duration.path}
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm font-medium leading-none">{duration.name}</span>
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {duration.desc}
                  </p>
                </Link>
              ))}
            </div>
          </div>
          <div className="row-span-3">
            <h4 className="mb-3 text-sm font-medium leading-none">Par thématique</h4>
            <div className="flex flex-col gap-2">
              {themes.map(({ name, desc, icon: Icon, path }) => (
                <Link
                  key={name}
                  to={path}
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium leading-none">{name}</span>
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {desc}
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