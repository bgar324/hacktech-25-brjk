"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { auth } from "../firebase";
import { onAuthStateChanged, User } from "firebase/auth";

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen max-w-screen flex flex-col">
      <Navbar />
      <main className="flex-grow max-w-full w-full mx-auto flex flex-col gap-12 items-center justify-center px-24">
        <div className = "text-center items-center">
          {user && (
            <h2 className="text-2xl font-mono font-semibold text-gray-700">
              hi, {user.displayName || "there"}!
            </h2>
          )}
          <h1 className="text-4xl font-semibold text-center">
            Your Ergonomic Dashboard
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 w-full max-w-[1600px]">
          {/* Left side - Hand model */}
          <div className="flex flex-col flex-1">
            <div className="flex-1 bg-white rounded-2xl shadow-lg p-8 flex items-center justify-center min-h-[600px]">
              <div className="text-gray-400 text-2xl">
                (Live Hand Model Goes Here)
              </div>
            </div>
            <div className="mt-8 bg-blue-100 text-blue-800 p-6 rounded-lg shadow-sm flex items-center justify-center">
              <p className="text-base font-semibold">
                ⚠️ Try adjusting wrist posture – radial deviation is too high!
              </p>
            </div>
          </div>

          {/* Right side - Diagnostics + Graph */}
          <div className="w-full lg:w-2/5 flex flex-col gap-4">
            {/* Diagnostics */}
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-semibold mb-4 text-center">
                Diagnostics
              </h2>
              <div className="space-y-3 text-base text-gray-700">
                <div className="flex justify-between">
                  <span>Wrist Extension:</span>
                  <span className="font-semibold text-green-600">22°</span>
                </div>
                <div className="flex justify-between">
                  <span>Radial Deviation:</span>
                  <span className="font-semibold text-yellow-500">16°</span>
                </div>
                <div className="flex justify-between">
                  <span>Risk Level:</span>
                  <span className="font-semibold text-green-600">Low</span>
                </div>
                <div className="flex justify-between">
                  <span>Session Time:</span>
                  <span className="font-semibold text-gray-800">15 min</span>
                </div>
              </div>
            </div>

            {/* Live Graph */}
            <div className="bg-white rounded-2xl shadow-md p-5">
              <h2 className="text-2xl font-semibold mb-3 text-center">
                Live Wrist Graph
              </h2>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-base font-semibold">
                (Live Chart Goes Here)
              </div>
            </div>
            <button className="mt-8 bg-gray-200 hover:bg-gray-200/80 transition-all duration-200 ease-in-out not-only-of-type:text-blue-800 p-3 py-4 rounded-lg shadow-sm flex items-center justify-center cursor-pointer">
              Start recording
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
