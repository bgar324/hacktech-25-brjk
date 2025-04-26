"use client";

import React, { useEffect, useState } from "react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { auth } from "../firebase";
import { signOut, onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";

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

  return (
    <div className="relative flex items-center justify-between px-8 py-3 border-b border-gray-200 mb-8">
      {/* LEFT */}
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="/" className="px-3 py-1 rounded-full hover:bg-gray-300/70 transition">
              russell
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* CENTER */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <NavigationMenu>
          <NavigationMenuList className="gap-8">
            {["HowItWorks","Documentation","ScienceBehind"].map((page) => (
              <NavigationMenuItem key={page}>
                <NavigationMenuLink
                  href={`/${page}`}
                  className="px-3 py-1 rounded-full hover:bg-gray-300/70 transition"
                >
                  {page === "HowItWorks" ? "how it works" : page === "ScienceBehind" ? "science behind" : "documentation"}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
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
              className="bg-blue-300 hover:bg-blue-400"
            >
              <a href="/Dashboard">dashboard</a>
            </Button>
            <Button
              variant="default"
              className="bg-amber-200 hover:bg-amber-300"
              onClick={handleSignOut}
            >
              log out
            </Button>
          </>
        ) : (
          <Button
            asChild
            variant="default"
            className="bg-amber-400 hover:bg-amber-500"
          >
            <a href="/LogIn">log in</a>
          </Button>
        )}
      </div>
    </div>
  );
}
