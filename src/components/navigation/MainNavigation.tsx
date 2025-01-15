import { Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { DestinationsMenu } from "./DestinationsMenu";
import { CircuitsMenu } from "./CircuitsMenu";
import { BlogMenu } from "./BlogMenu";
import { cn } from "@/lib/utils";

export const MainNavigation = () => {
  const location = useLocation();

  return (
    <NavigationMenu className="mx-6">
      <NavigationMenuList className="gap-1">
        <NavigationMenuItem>
        </NavigationMenuItem>
        <DestinationsMenu />
        <CircuitsMenu />
        <NavigationMenuItem>
          <Link to="/about">
            <NavigationMenuLink
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                "text-white/90 hover:text-white hover:bg-white/10",
                location.pathname === "/about" && "bg-white/10 text-white"
              )}
            >
              À propos
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <BlogMenu />
        <NavigationMenuItem>
          <Link to="/contact">
            <NavigationMenuLink
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                "text-white/90 hover:text-white hover:bg-white/10",
                location.pathname === "/contact" && "bg-white/10 text-white"
              )}
            >
              Contact
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MainNavigation;