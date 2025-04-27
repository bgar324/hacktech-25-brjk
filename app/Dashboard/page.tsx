"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { auth } from "../firebase";
import { db } from "../firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";
import HandVisualizer from "./components/HandVisualizer";
import GraphVisualizer, { DataPoint } from "./components/GraphVisualizer";
import { ArrowRight } from "lucide-react";

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [flexion, setFlexion] = useState<number | null>(null);
  const [deviation, setDeviation] = useState<number | null>(null);
  const [pronation, setPronation] = useState<number | null>(null);
  const [history, setHistory] = useState<DataPoint[]>([]);

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  useEffect(() => {
    const ref = collection(db, "first");
    const q = query(ref, orderBy("timestamp", "asc"));
    const unsub = onSnapshot(q, snap => {
      if (snap.empty) return;
      const latest = snap.docs[snap.docs.length - 1].data() as any;
      setFlexion(parseFloat(latest.flexion));
      setDeviation(parseFloat(latest.deviation));
      setPronation(parseFloat(latest.pronation));
    });
    return () => unsub();
  }, []);

  const toggleRecording = async () => {
    if (!isRecording) {
      await fetch("http://127.0.0.1:8005/start-recording");
      setHistory([]);
      setIsRecording(true);
    } else {
      await fetch("http://127.0.0.1:8005/stop-recording");
      setIsRecording(false);
    }
  };

  useEffect(() => {
    if (!isRecording) return;
    if (
      flexion !== null &&
      deviation !== null &&
      pronation !== null
    ) {
      setHistory(prev => [
        ...prev,
        {
          timestamp: Date.now(),
          flexion,
          deviation,
          pronation,
        },
      ]);
    }
  }, [flexion, deviation, pronation, isRecording]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow w-full max-w-6xl mx-auto flex flex-col gap-8 px-4 py-8">
        {user && (
          <h2 className="text-center text-2xl font-mono font-semibold text-gray-700">
            Hi, {user.displayName || "there"}!
          </h2>
        )}
        <h1 className="text-center text-4xl font-semibold">
          Your Ergonomic Dashboard
        </h1>

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1 flex flex-col gap-8">
            <div className="flex-1 bg-white rounded-2xl shadow-lg p-8 flex items-center justify-center min-h-[600px]">
              <h2 className="text-2xl font-semibold mb-4 text-center">
                Live Hand
              </h2>
              <HandVisualizer />
            </div>
            <div className="bg-blue-100 text-blue-800 p-6 rounded-lg shadow-sm text-center">
              ⚠️ Try adjusting wrist posture – radial deviation is too high!
            </div>
          </div>

          <div className="w-full lg:w-2/5 flex flex-col gap-6">
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-semibold mb-4 text-center">
                Live Diagnostics
              </h2>
              <div className="space-y-3 text-base text-gray-700">
                <div className="flex justify-between">
                  <span>Flexion:</span>
                  <span className="font-semibold text-green-600">
                    {flexion !== null ? `${flexion.toFixed(2)}°` : "–"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Radial Deviation:</span>
                  <span className="font-semibold text-yellow-500">
                    {deviation !== null ? `${deviation.toFixed(2)}°` : "–"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Pronation:</span>
                  <span className="font-semibold text-blue-400">
                    {pronation !== null ? `${pronation.toFixed(2)}°` : "–"}
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full h-[300px] bg-white rounded-lg overflow-hidden">
              <h2 className="text-2xl font-semibold mb-4 text-center pt-2">
                Live Wrist
              </h2>
              <GraphVisualizer data={history} />
            </div>

            <button
              onClick={toggleRecording}
              className="mt-4 bg-gray-300/40 hover:bg-gray-300/80 p-3 rounded-lg transition"
            >
              {isRecording ? "Stop recording" : "Start recording"}
            </button>

            <a
              href="/Diagnostic"
              className="flex items-center justify-center w-fit px-3 py-1 rounded-full hover:bg-gray-300/40 transition"
            >
              View Diagnostic
              <ArrowRight size={16} className="ml-1" />
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
