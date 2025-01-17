import { Link } from "react-router-dom";
import {
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { navigationConfig } from "./config";

export const CircuitsMenu = () => {
  const { circuits } = navigationConfig;

  return (
    <NavigationMenuItem className="relative">
      <Link to={circuits.path}>
        <NavigationMenuTrigger
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-full transition-colors bg-transparent",
            "text-white/80 hover:text-white",
            "hover:bg-white/10",
            "data-[state=open]:bg-white/10 data-[state=open]:text-white"
          )}
        >
          {circuits.title}
        </NavigationMenuTrigger>
      </Link>
      <NavigationMenuContent className="absolute left-0 mt-2">
        <div className="w-[600px] p-4 bg-[#0B1C2F]/95 shadow-lg backdrop-blur-lg rounded-2xl border border-white/10">
          <div className="grid grid-cols-2 gap-3">
            {circuits.submenu.map((item) => (
              <Link
                key={item.title}
                to={item.path}
                className={cn(
                  "flex items-start space-x-3 rounded-xl p-3",
                  "bg-white/5 hover:bg-white/10 transition-all",
                  "border border-white/10 hover:border-white/20",
                  "group"
                )}
              >
                <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="object-cover w-full h-full transition-transform group-hover:scale-110"
                  />
                </div>
                <div className="space-y-1 flex-1">
                  <h4 className="text-sm font-medium text-white group-hover:text-emerald-400">
                    {item.title}
                  </h4>
                  <p className="text-xs text-white/70 group-hover:text-white/90 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-4 flex justify-center">
            <Link
              to={circuits.path}
              className="px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-emerald-400 to-teal-500 
                       hover:opacity-90 rounded-full transition-all shadow-lg"
            >
              Voir tous les circuits
            </Link>
          </div>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};