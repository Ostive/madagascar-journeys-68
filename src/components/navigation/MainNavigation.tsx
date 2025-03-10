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
import { InspirationMenu } from "./InspirationMenu";
import { cn } from "@/lib/utils";
import { AuthDialog } from "@/components/auth/AuthDialog";
import { useState } from "react";

export const MainNavigation = () => {
  const location = useLocation();
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);

  return (
    <>
      <NavigationMenu className="mx-6">
        <NavigationMenuList className="gap-2">
          <DestinationsMenu />
          <CircuitsMenu />
          <InspirationMenu />
          <BlogMenu />
          <NavigationMenuItem>
            <Link to="/about">
              <NavigationMenuLink
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-full transition-colors",
                  "text-white/80 hover:text-white",
                  "hover:bg-white/10",
                  location.pathname === "/about" && "bg-white/10 text-white"
                )}
              >
                À propos
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/contact">
              <NavigationMenuLink
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-full transition-colors",
                  "text-white/80 hover:text-white",
                  "hover:bg-white/10",
                  location.pathname === "/contact" && "bg-white/10 text-white"
                )}
              >
                Contact
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <AuthDialog isOpen={isAuthDialogOpen} onClose={() => setIsAuthDialogOpen(false)} />
    </>
  );
};

export default MainNavigation;
