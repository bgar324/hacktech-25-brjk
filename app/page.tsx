"use client";
import Image from "next/image";
import Navbar from "./components/Navbar";
// /app/page.tsx
import React, { useState, useEffect } from "react";
import { getFirestore, query, QuerySnapshot, where } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  DocumentData,
  collection,
  addDoc,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { Special_Elite } from "next/font/google";

export default function Home() {
  // Initialize Firestore
  const firestore = getFirestore();
  
  // Create state
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  
  // Collection reference
  const userDataCollection = collection(firestore, "first");
  
  // Function to add a document
  async function addUserData() {
    try {
      const docRef = await addDoc(userDataCollection, {
        WristRadialAngle: 100,
        PronationAngle: "100",
      });
      console.log("Document successfully written with ID:", docRef.id);
    } catch (error: any) {
      console.error("Error writing document:", error.message);
    }
  }
  
  // Function to read a single document
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
    const customeOrderQuery = query(
          collection(firestore, 'first'),
          where('WristRadialAngle',  '<', 100)
    );
    const querySnapshot = await getDocs(customeOrderQuery);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
    });
  }
  async function queryForRadial() {
    const customeOrderQuery = query(
          collection(firestore, 'first'),
          where('PronationAngle',  '<', 100)
    );
    const querySnapshot = await getDocs(customeOrderQuery);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
    });
  }

  return (
    <div className="min-h-screen max-w-screen">
      <Navbar isSignedIn/>
      <div className="max-w-screen-7xl items-center justify-center text-center">
        <h1>russell's ergonomic tracker idea</h1>
      </div>
    </div>
  );
}
