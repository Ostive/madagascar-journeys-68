import { Link } from "react-router-dom";
import {
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Palmtree, Mountain, Building } from "lucide-react";
import { cn } from "@/lib/utils";

export const DestinationsMenu = () => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger
        className={cn(
          "px-3 py-2 text-sm font-medium rounded-lg transition-colors bg-transparent",
          "text-white/90 hover:text-white hover:bg-white/10",
          "data-[state=open]:bg-white/10 data-[state=open]:text-white"
        )}
      >
        Destinations
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="w-[500px] p-3 backdrop-blur-xl bg-black/20">
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                title: "Nord",
                description: "Découvrez les plages paradisiaques et les îles du Nord",
                icon: <Palmtree className="h-5 w-5" />,
                href: "/destinations?region=nord",
              },
              {
                title: "Sud",
                description: "Explorez les parcs nationaux et les paysages uniques du Sud",
                icon: <Mountain className="h-5 w-5" />,
                href: "/destinations?region=sud",
              },
              {
                title: "Est",
                description: "Visitez les forêts tropicales et les côtes sauvages de l'Est",
                icon: <Palmtree className="h-5 w-5" />,
                href: "/destinations?region=est",
              },
              {
                title: "Ouest",
                description: "Admirez les baobabs et les formations rocheuses de l'Ouest",
                icon: <Mountain className="h-5 w-5" />,
                href: "/destinations?region=ouest",
              },
              {
                title: "Centre",
                description: "Découvrez la culture et l'histoire au cœur de Madagascar",
                icon: <Building className="h-5 w-5" />,
                href: "/destinations?region=centre",
              },
            ].map((item) => (
              <Link
                key={item.title}
                to={item.href}
                className={cn(
                  "flex items-start space-x-3 rounded-lg p-3",
                  "bg-white/5 hover:bg-white/10 transition-colors",
                  "group"
                )}
              >
                <div className="mt-1 rounded-lg bg-white/10 p-1.5 group-hover:bg-white/20 transition-colors">
                  {item.icon}
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium text-white group-hover:text-white/90">
                    {item.title}
                  </h4>
                  <p className="text-xs text-white/70 group-hover:text-white/80">
                    {item.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};