import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const durations = [
  { 
    name: "Courts séjours", 
    desc: "Moins de 5 jours", 
    path: "/circuits?duration=court",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80"
  },
  { 
    name: "Circuits d'une semaine", 
    desc: "7 jours", 
    path: "/circuits?duration=semaine",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80"
  },
  { 
    name: "Grands circuits", 
    desc: "2 semaines ou plus", 
    path: "/circuits?duration=long",
    image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=800&q=80"
  },
];

const themes = [
  { 
    name: "Aventure", 
    desc: "Randonnées, trekking", 
    path: "/circuits?theme=aventure",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80"
  },
  { 
    name: "Nature", 
    desc: "Parcs nationaux, faune", 
    path: "/circuits?theme=nature",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80"
  },
  { 
    name: "Luxe et confort", 
    desc: "Séjours haut de gamme", 
    path: "/circuits?theme=luxe",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
  },
  { 
    name: "Culture et traditions", 
    desc: "Villages, rencontres", 
    path: "/circuits?theme=culture",
    image: "https://images.unsplash.com/photo-1533669955142-6a73332af4db?auto=format&fit=crop&w=800&q=80"
  },
];

export function CircuitsMenu() {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>Circuits</NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="grid gap-3 p-6 md:w-[400px] lg:w-[600px] lg:grid-cols-[.75fr_1fr]">
          <div className="row-span-3">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-sm font-medium leading-none">Par durée</h4>
              <Link to="/circuits">
                <Button 
                  variant="ghost" 
                  className="text-sm hover:text-emerald hover:bg-emerald/10"
                >
                  Voir tous
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              {durations.map((duration) => (
                <Link
                  key={duration.name}
                  to={duration.path}
                  className="block select-none space-y-1 rounded-md leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground overflow-hidden group"
                >
                  <div className="relative h-24 w-full">
                    <img
                      src={duration.image}
                      alt={duration.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                    <div className="absolute inset-0 p-3 flex flex-col justify-end">
                      <span className="text-white font-medium mb-1">{duration.name}</span>
                      <p className="text-white/80 text-sm">{duration.desc}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="row-span-3">
            <h4 className="mb-3 text-sm font-medium leading-none">Par thématique</h4>
            <div className="grid grid-cols-2 gap-2">
              {themes.map((theme) => (
                <Link
                  key={theme.name}
                  to={theme.path}
                  className="block select-none rounded-md leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground overflow-hidden group"
                >
                  <div className="relative h-24">
                    <img
                      src={theme.image}
                      alt={theme.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                    <div className="absolute inset-0 p-3 flex flex-col justify-end">
                      <span className="text-white font-medium mb-1">{theme.name}</span>
                      <p className="text-white/80 text-sm line-clamp-1">{theme.desc}</p>
                    </div>
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