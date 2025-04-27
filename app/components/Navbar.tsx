"use client";

import React, { JSX, useEffect, useState } from "react";
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
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar(): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    router.push("/LogIn");
    setIsOpen(false);
  };

  const pages = [
    { path: "/HowItWorks", label: "How It Works" },
    { path: "/Documentation", label: "Documentation" },
    { path: "/ScienceBehind", label: "Problem Statement" },
  ];

  return (
    <nav className="relative bg-transparent border-b border-gray-300 mb-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-3">
        <a
          href="/"
          className="font-mono text-xl px-3 py-1 rounded-full transition-all hover:bg-gray-300/40 duration-200 ease-in-out"
        >
          het.ai
        </a>

        <button
          className="md:hidden flex items-center gap-1 p-2"
          onClick={() => setIsOpen((o) => !o)}
        >
          <ChevronDown
            size={20}
            className={isOpen ? "rotate-180 transition" : "transition"}
          />
        </button>

        <div className="hidden md:flex items-center space-x-4">
          <NavigationMenu>
            <NavigationMenuList className="flex items-center gap-4">
              {pages.map(({ path, label }) => {
                const active = pathname === path;
                return (
                  <NavigationMenuItem key={path}>
                    <NavigationMenuLink
                      href={path}
                      className={`px-3 py-1 rounded-full transition ${
                        active ? "bg-gray-300/70" : "hover:bg-gray-300/70"
                      }`}
                    >
                      {label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>

          <Separator orientation="vertical" className="h-6 bg-gray-400" />
          <Button
            asChild
            variant="default"
            className="rounded-full bg-blue-300 hover:bg-blue-400"
          >
            <a href="/Dashboard" target="_blank">
              Dashboard
            </a>
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ type: "tween", duration: 0.2 }}
            className="md:hidden absolute top-full left-0 w-full bg-[#ededed] border-t border-gray-200 z-50"
          >
            <div className="flex flex-col items-center space-y-2 py-4">
              {pages.map(({ path, label }) => (
                <a
                  key={path}
                  href={path}
                  className="px-4 py-2 rounded-full w-fit text-center hover:bg-gray-100 transition"
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                </a>
              ))}

              <div className="w-11/12 border-t border-gray-400 my-2" />

              {user ? (
                <>
                  <a
                    href="/Dashboard"
                    className="block px-4 py-2 rounded-full w-fit text-center hover:bg-blue-100 transition"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </a>
                  <button
                    className="px-4 py-2 rounded-full w-fit text-center hover:bg-amber-100 transition"
                    onClick={handleSignOut}
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <a
                  href="/LogIn"
                  className="block px-4 py-2 rounded-full w-fit text-center hover:bg-amber-100 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Log In
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
