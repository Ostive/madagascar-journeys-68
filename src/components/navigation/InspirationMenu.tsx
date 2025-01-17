import { Link } from "react-router-dom";
import {
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { navigationConfig } from "./config";
import { ArrowRight } from "lucide-react";

export const InspirationMenu = () => {
  const { inspiration } = navigationConfig;

  return (
    <NavigationMenuItem>
      <Link to={inspiration.path}>
        <NavigationMenuTrigger
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-full transition-colors bg-transparent",
            "text-white/80 hover:text-white",
            "hover:bg-white/10",
            "data-[state=open]:bg-white/10 data-[state=open]:text-white"
          )}
        >
          {inspiration.title}
        </NavigationMenuTrigger>
      </Link>
      <NavigationMenuContent className="bg-transparent">
        <div className="w-[800px] relative">
          <div
            className="absolute inset-0 bg-[url('https://eagjtgrzswxqaclxeuom.supabase.co/storage/v1/object/public/blog/inspirations.webp')] bg-cover bg-center backdrop-blur-lg"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              backgroundBlendMode: "multiply",
            }}
          />
          <div className="relative z-10 p-8">
            <div className="grid grid-cols-2 gap-6">
              {inspiration.submenu?.map((item) => (
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
                    <p className="text-sm text-white/70 group-hover:text-white/90 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <Link
                to={inspiration.path}
                className="px-8 py-3 text-base font-medium text-white bg-emerald-500 
                         rounded-full hover:bg-emerald-600 transition-all shadow-lg flex items-center"
              >
                Laissez-vous inspirer
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};
