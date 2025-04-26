"use client";

import Image from "next/image";
import Navbar from "./components/Navbar";
import React, { useState } from "react";
import Link from "next/link";

import { db } from "./firebase";

import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

export default function Home() {
  const firestore = db;

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const userDataCollection = collection(firestore, "first");

  async function addUserData() {
    try {
      const docRef = await addDoc(userDataCollection, {
        WristRadialAngle:  { x: 1, y: 2, z: 3 },
        PronationAngle: { x: 4, y: 5, z: 6 },
      });
      console.log("Document successfully written with ID:", docRef.id);
    } catch (error: any) {
      console.error("Error writing document:", error.message);
    }
  }

  async function readUserData(docId: string) {
    try {
      const docRef = doc(firestore, "first", docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (error: any) {
      console.error("Error reading document:", error.message);
    }
  }

  async function queryForWristRadial() {
    try {
      const customOrderQuery = query(
        collection(firestore, "first"),
        where("WristRadialAngle", "<", 100)
      );
      const querySnapshot = await getDocs(customOrderQuery);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
      });
    } catch (error: any) {
      console.error("Error querying documents:", error.message);
    }
  }

  async function queryForPronation() {
    try {
      const customOrderQuery = query(
        collection(firestore, "first"),
        where("PronationAngle", "<", 100)
      );
      const querySnapshot = await getDocs(customOrderQuery);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
      });
    } catch (error: any) {
      console.error("Error querying documents:", error.message);
    }
  }
  addUserData();

  return (
    <div className="min-h-screen max-w-screen">
      <Navbar />
      <div className="max-w-screen-7xl items-center justify-center text-center">
        <h1 className="text-3xl mt-8">russell's ergonomic tracker idea</h1>
        <p className="text-lg text-gray-700 mb-8 max-w-xl">
          Real-time ergonomic posture monitoring powered by Leap Motion,
          WolframAlpha calculations, and instant feedback that helps you type
          safer and longer.
        </p>
        <div className="flex gap-4">
          <Link
            href="/LogIn"
            className="px-6 py-3 bg-amber-400 text-white rounded-lg hover:bg-amber-500 transition"
          >
            Get Started
          </Link>
          <Link
            href="/HowItWorks"
            className="px-6 py-3 border border-gray-400 rounded-lg hover:bg-gray-100 transition"
          >
            How It Works
          </Link>
        </div>
      </div>
    </div>
  );
}
