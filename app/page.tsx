"use client";

import Image from "next/image";
import Navbar from "./components/Navbar";
import React, { useState } from "react";
import Link from "next/link";
import Footer from "./components/Footer";

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
    <>
      <div className="min-h-screen max-w-screen flex flex-col">
        <div className="flex-1">
          <Navbar />
          <div className="max-w-screen-7xl items-center justify-center text-center">
            <div className="flex flex-col justify-center text-center items-center ">
              <Image
                src="/static/logo.png"
                alt="logo"
                width={300}
                height={300}
              />
              <h1 className="text-3xl mt-8">het.ai</h1>
              <p className="font-mono text-gray-600">
                hand ∙ ergonomic ∙ tracker
              </p>
              <p className="font-mono text-gray-400 italic text-sm">
                (with wolfram|alpha)
              </p>
              <a
                href="/Dashboard"
                className="bg-amber-400 rounded-full hover:bg-amber-500 px-4 py-2 font-mono mt-4 duration-200 ease-in-out transition-all"
              >
                dashboard
              </a>
            </div>
          </div>
        </div>  
        <Footer />
      </div>
    </>
  );
}
