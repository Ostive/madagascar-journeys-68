import { Link } from "react-router-dom";
import {
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { BookOpen, MapPin, Compass, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

export const BlogMenu = () => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger
        className={cn(
          "px-3 py-2 text-sm font-medium rounded-lg transition-colors bg-transparent",
          "text-white/90 hover:text-white hover:bg-white/10",
          "data-[state=open]:bg-white/10 data-[state=open]:text-white"
        )}
      >
        Blog
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="w-[400px] p-3 backdrop-blur-xl bg-black/20">
          <div className="grid gap-2">
            {[
              {
                title: "Conseils pratiques",
                description: "Préparez votre voyage à Madagascar",
                icon: <BookOpen className="h-5 w-5" />,
                href: "/blog/preparer-voyage",
              },
              {
                title: "Guides des régions",
                description: "Découvrez nos guides détaillés",
                icon: <MapPin className="h-5 w-5" />,
                href: "/blog/explorer-nord",
              },
              {
                title: "Inspirations",
                description: "Idées et suggestions de voyages",
                icon: <Compass className="h-5 w-5" />,
                href: "/blog/top-plages",
              },
              {
                title: "Actualités",
                description: "Les dernières nouvelles touristiques",
                icon: <Bell className="h-5 w-5" />,
                href: "/blog/evenements",
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