import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { navigationConfig } from "./config";
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const DestinationsMenu = () => {
  const { destinations } = navigationConfig;

  return (
    <NavigationMenuItem className="relative">
      <NavigationMenuTrigger
        className={cn(
          "px-4 py-2 text-sm font-medium rounded-full transition-colors bg-transparent",
          "text-white/80 hover:text-white",
          "hover:bg-white/10"
        )}
      >
        {destinations.title}
      </NavigationMenuTrigger>

      <NavigationMenuContent className="bg-transparent">
        <div
          className="w-[800px] overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-lg" />
          
          <div className="relative z-10 p-8">
            <div className="grid grid-cols-2 gap-6">
              {destinations.submenu.map((item) => (
                <Link
                  key={item.title}
                  to={item.path}
                  className="flex items-start space-x-4 rounded-2xl p-4 bg-white/5 border border-white/10
                    hover:bg-white/10 transition-all group"
                >
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="space-y-1 flex-1">
                    <h4 className="text-base font-medium text-white group-hover:text-emerald-400 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-sm text-white/70 group-hover:text-white/90 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <Link
                to={destinations.path}
                className="px-8 py-3 text-base font-medium text-white bg-emerald-500 
                  rounded-full hover:bg-emerald-600 transition-all shadow-lg flex items-center"
              >
                Voir toutes les destinations
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};
