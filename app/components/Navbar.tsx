import React from "react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"

interface NavbarProps {
  isSignedIn?: boolean;
}

const Navbar = ({ isSignedIn = false }: NavbarProps) => {
  return (
    <div className="flex items-center justify-between px-8 py-3 border-b-[1.25px] border-gray-200 mb-8">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink 
              href="/"
              className="px-3 py-1 hover:bg-gray-300/70 duration-200 ease-in-out rounded-full transition cursor-pointer"
            >
              russell
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <NavigationMenu className = "absolute left-1/2 transform -translate-x-1/2">
        <NavigationMenuList className="gap-8">
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/HowItWorks"
              className="px-3 py-1 hover:bg-gray-300/70 duration-200 ease-in-out rounded-full transition cursor-pointer"
            >
              how it works
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/Documentation"
              className="px-3 py-1 hover:bg-gray-300/70 duration-200 ease-in-out rounded-full transition cursor-pointer"
            >
              documentation
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              href = "/ScienceBehind"
              className="px-3 py-1 hover:bg-gray-300/70 duration-200 ease-in-out rounded-full transition cursor-pointer"
            >
              science behind
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex gap-4">
        {isSignedIn ? (
          <>
            <Button
              asChild
              variant="default"
              className="bg-blue-300 hover:bg-blue-300/80"
            >
              <a href="/Dashboard">dashboard</a>
            </Button>
            <Button
              asChild
              variant="default"
              className="bg-amber-200 hover:bg-amber-200/80"
            >
              <a href="/LogIn">log in</a>
            </Button>
          </>
        ) : (
          <Button
            asChild
            variant="default"
            className="bg-amber-400 hover:bg-amber-400/80"
          >
            <a href="/LogIn">log in</a>
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
