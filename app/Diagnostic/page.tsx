// app/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { db } from "../firebase";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";

type PointAverage = { x: number; y: number; z: number };

export default function Page() {
  const [pointAverage, setPointAverage] = useState<PointAverage | null>(null);

  useEffect(() => {
    const framesRef = collection(db, "first");
    const q = query(framesRef, orderBy("timestamp", "desc"), limit(1));
    const unsub = onSnapshot(q, (snap) => {
      if (snap.empty) return;
      const data = snap.docs[0].data();
      const raw = data.pointAverage;
      setPointAverage({
        x: parseFloat(raw.x),
        y: parseFloat(raw.y),
        z: parseFloat(raw.z),
      });
    });
    return () => unsub();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        <h1 className="text-center text-xl md:text-3xl mb-8">
          Your diagnostics for this session
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {pointAverage ? (
            <>
              <div className="bg-white shadow rounded-2xl p-6">
                <p className="text-sm text-gray-500 uppercase">Average Radial degree</p>
                <p className="mt-2 text-4xl font-extrabold text-gray-900">
                  {pointAverage.x.toFixed(2)}°
                </p>
              </div>
              <div className="bg-white shadow rounded-2xl p-6">
                <p className="text-sm text-gray-500 uppercase">Average Flexion degree</p>
                <p className="mt-2 text-4xl font-extrabold text-gray-900">
                  {pointAverage.y.toFixed(2)}°
                </p>
              </div>
              <div className="bg-white shadow rounded-2xl p-6">
                <p className="text-sm text-gray-500 uppercase">Average Pronation degree</p>
                <p className="mt-2 text-4xl font-extrabold text-gray-900">
                  {pointAverage.z.toFixed(2)}°
                </p>
              </div>
            </>
          ) : (
            <div className="col-span-full text-center text-gray-600">
              Loading data…
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
