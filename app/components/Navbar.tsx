"use client";

import React, { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { auth } from "../firebase";
import { signOut, onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // subscribe to auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    router.push("/LogIn");
  };

  const pathname = usePathname();

  return (
    <div className="relative flex items-center justify-between px-8 py-3 border-b-[1.5px] border-gray-300 mb-8">
      {/* LEFT */}
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/"
              className="px-4 py-1 rounded-full font-mono hover:bg-gray-300/70 transition text-lg flex flex-row"
            >
              het.ai
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* CENTER */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <NavigationMenu>
          <NavigationMenuList className="flex items-center gap-4">
            {["HowItWorks", "Documentation", "ScienceBehind"].map(
              (page, index) => {
                const pagePath = `/${page}`;
                const isActive = pathname === pagePath;

                return (
                  <React.Fragment key={page}>
                    <NavigationMenuItem>
                      <NavigationMenuLink
                        href={pagePath}
                        className={`px-3 py-1 rounded-full transition ${
                          isActive ? "bg-gray-300/70" : "hover:bg-gray-300/70"
                        }`}
                      >
                        {page === "HowItWorks"
                          ? "How It Works"
                          : page === "ScienceBehind"
                          ? "Science Behind"
                          : "Documentation"}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    {index < 2 && (
                      <Separator
                        orientation="vertical"
                        className="h-6 bg-gray-400"
                      />
                    )}
                  </React.Fragment>
                );
              }
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* RIGHT */}
      <div className="flex gap-4">
        {user ? (
          <>
            <Button
              asChild
              variant="default"
              className="bg-blue-300 rounded-full hover:bg-blue-400 cursor-pointer"
            >
              <a href="/Dashboard" target="_blank">
                Dashboard
              </a>
            </Button>
            <Button
              variant="default"
              className="bg-amber-400 rounded-full hover:bg-amber-500 cursor-pointer"
              onClick={handleSignOut}
            >
              Log Out
            </Button>
          </>
        ) : (
          <Button
            asChild
            variant="default"
            className="bg-amber-400 hover:bg-amber-500 rounded-full cursor-pointer"
          >
            <a href="/LogIn">Log In</a>
          </Button>
        )}
      </div>
    </div>
  );
}
