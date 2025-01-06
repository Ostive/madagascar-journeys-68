import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { BookOpen, MapPin, Compass, Bell } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    title: "Conseils pratiques",
    items: [
      { name: "Préparer son voyage", path: "/blog/preparer-voyage" },
      { name: "Les indispensables", path: "/blog/indispensables" },
    ],
    icon: BookOpen,
  },
  {
    title: "Guides des régions",
    items: [
      { name: "Explorer le Nord", path: "/blog/explorer-nord" },
      { name: "Découverte du Sud", path: "/blog/decouverte-sud" },
    ],
    icon: MapPin,
  },
  {
    title: "Inspirations",
    items: [
      { name: "Top 10 des plages", path: "/blog/top-plages" },
      { name: "Meilleures expériences", path: "/blog/experiences" },
    ],
    icon: Compass,
  },
  {
    title: "Actualités",
    items: [
      { name: "Événements locaux", path: "/blog/evenements" },
      { name: "Nouveautés", path: "/blog/nouveautes" },
    ],
    icon: Bell,
  },
];

export function BlogMenu() {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>Blog</NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
          {categories.map(({ title, items, icon: Icon }) => (
            <div key={title} className="row-span-3">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium leading-none">
                <Icon className="h-4 w-4" />
                {title}
              </div>
              <div className="flex flex-col gap-2">
                {items.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">{item.name}</div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}