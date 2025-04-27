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

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [flexion, setFlexion] = useState<number | null>(null);
  const [deviation, setDeviation] = useState<number | null>(null);
  const [pronation, setPronation] = useState<number | null>(null);
  const [history, setHistory] = useState<DataPoint[]>([]);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, setUser);
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    const framesRef = collection(db, "first");
    const q = query(framesRef, orderBy("timestamp", "asc"));
    const unsub = onSnapshot(
      q,
      (snap) => {
        if (snap.empty) return;
        const latest = snap.docs[snap.docs.length - 1].data();
        setFlexion(parseFloat(latest.flexion));
        setDeviation(parseFloat(latest.deviation));
        setPronation(parseFloat(latest.pronation));
      },
      console.error
    );
    return () => unsub();
  }, []);

  const startRecording = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8004/start-recording", {
        method: "GET",
      });
      if (response.ok) {
        setIsRecording(true);
        const data = await response.json();
        // console.log(data.message); // Log the message from FastAPI
      } else {
        console.error("Failed to start recording");
      }
    } catch (error) {
      console.error("Error while connecting to the backend:", error);
    }
  };

  useEffect(() => {
    if (!isRecording) return;
    setHistory([]);
    const q = query(collection(db, "first"), orderBy("timestamp", "asc"));
    const unsub = onSnapshot(
      q,
      (snap) => {
        if (snap.empty) return;
        const doc = snap.docs[snap.docs.length - 1];
        const data = doc.data();
        const ts =
          typeof data.timestamp?.toMillis === "function"
            ? data.timestamp.toMillis()
            : Date.now();
        setHistory((prev) => [
          ...prev,
          {
            timestamp: ts,
            flexion: parseFloat(data.flexion),
            deviation: parseFloat(data.deviation),
            pronation: parseFloat(data.pronation),
          },
        ]);
      },
      console.error
    );
    return () => unsub();
  }, [isRecording]);

  const handleRecordingClick = () => {
    if (!isRecording) {
      startRecording();
    } else {
      // you can add pause logic or navigation to diagnostics here
    }
  };

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
        <div className="text-center items-center">
          {user && (
            <h2 className="text-lg md:text-2xl font-mono font-semibold text-gray-700">
              hi, {user.displayName || "there"}!
            </h2>
          )}
          <h1 className="text-2xl md:text-4xl font-semibold text-center">
            Your Ergonomic Dashboard
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 w-full max-w-[1600px]">
          <div className="flex flex-col flex-1">
            <div className="flex-1 bg-white rounded-2xl shadow-lg p-8 flex items-center justify-center min-h-[600px]">
              <div className="text-gray-400 text-2xl">
                <HandVisualizer />
              </div>
            </div>
            <div className="mt-8 bg-blue-100 text-blue-800 p-6 rounded-lg shadow-sm flex items-center justify-center">
              <p className="text-base font-semibold">
                ⚠️ Try adjusting wrist posture – radial deviation is too high!
              </p>
            </div>
          </div>

          <div className="w-full lg:w-2/5 flex flex-col gap-4">
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

            <div className="bg-white rounded-2xl shadow-md p-5">
              <h2 className="text-2xl font-semibold mb-3 text-center">
                Live Wrist Graph
              </h2>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-base font-semibold">
                <GraphVisualizer data={history} />
              </div>
            </div>
            <button
              onClick={handleRecordingClick}
              className="mt-4 bg-gray-200 hover:bg-gray-200/80 p-3 rounded-lg"
            >
              {isRecording ? "Recording…" : "Start recording"}
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
