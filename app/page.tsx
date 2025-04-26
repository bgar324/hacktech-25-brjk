"use client";

import Image from "next/image";
import Navbar from "./components/Navbar";
import React, { useState } from "react";

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
        WristRadialAngle: 100,
        PronationAngle: 100,
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

  return (
    <div className="min-h-screen max-w-screen">
      <Navbar isSignedIn />
      <div className="max-w-screen-7xl items-center justify-center text-center">
        <h1 className="text-3xl mt-8">russell's ergonomic tracker idea</h1>

      </div>
    </div>
  );
}
