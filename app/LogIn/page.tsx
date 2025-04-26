"use client"

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Image from "next/image";

import { auth, db } from "../firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Logged in successfully!");
    } catch (error) {
      console.error("Error logging in with email and password:", error);
      alert("Failed to log in. Please check your credentials.");
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert("Logged in with Google successfully!");
    } catch (error) {
      console.error("Error logging in with Google:", error);
      alert("Failed to log in with Google.");
    }
  };

  return (
    <div className="min-h-screen max-w-screen">
      <Navbar />
      <div className="max-w-screen-7xl items-center justify-center text-center mx-64">
        <div className="w-auto flex flex-row px-8 gap-8">
          <div className="w-1/2 flex flex-col p-1">
            <Image
              src="/static/login-images/hands.png"
              alt="test"
              layout="responsive"
              width={300}
              height={300}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="w-1/2 text-left">
            <h1 className="text-2xl mb-2">Login</h1>
            <div className="border-b-[.5px] gray-200"></div>
            <p className="mt-4">Sign in to your account</p>
            <div className="mt-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 w-full mb-4"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border p-2 w-full mb-4"
              />
              <button
                onClick={handleEmailLogin}
                className="bg-blue-500 text-white px-4 py-2 rounded w-full mb-4"
              >
                Login with Email
              </button>
              <button
                onClick={handleGoogleLogin}
                className="bg-red-500 text-white px-4 py-2 rounded w-full"
              >
                Login with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
