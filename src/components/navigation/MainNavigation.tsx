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

export const MainNavigation = () => {
  const location = useLocation();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/">
            <NavigationMenuLink
              className={`px-4 py-2 ${
                location.pathname === "/" ? "text-emerald" : "text-dark hover:text-emerald"
              }`}
            >
              Accueil
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <DestinationsMenu />
        <CircuitsMenu />
        <NavigationMenuItem>
          <Link to="/about">
            <NavigationMenuLink
              className={`px-4 py-2 ${
                location.pathname === "/about" ? "text-emerald" : "text-dark hover:text-emerald"
              }`}
            >
              À propos
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <BlogMenu />
        <NavigationMenuItem>
          <Link to="/contact">
            <NavigationMenuLink
              className={`px-4 py-2 ${
                location.pathname === "/contact" ? "text-emerald" : "text-dark hover:text-emerald"
              }`}
            >
              Contact
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};