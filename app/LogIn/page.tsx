"use client"

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Image from "next/image";

import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");

  const handleEmailAuth = async () => {
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      setError("");
    } catch (error: any) {
      setError(error.message);
      console.error("❌ Authentication error:", error.code, error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setError("");
    } catch (error: any) {
      setError(error.message);
      console.error("❌ Google sign-in error:", error.code, error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setError("");
    } catch (error: any) {
      setError(error.message);
      console.error("❌ Sign out error:", error.code, error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isSignedIn/>
      <div className="max-w-4xl mx-auto pt-20 px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex">
            <div className="hidden md:block w-1/2 p-4">
              <Image
                src="/static/login-images/hands.png"
                alt="Login illustration"
                layout="responsive"
                width={300}
                height={300}
                className="object-cover h-full rounded-md"
              />
            </div>
            <div className="w-full md:w-1/2 p-8">
              <h2 className="text-3xl font-bold mb-6">
                {isSignUp ? "Create Account" : "Welcome Back"}
              </h2>
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleEmailAuth}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  {isSignUp ? "Sign Up" : "Sign In"}
                </button>
                <button
                  onClick={handleGoogleSignIn}
                  className="w-full bg-white text-gray-700 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition duration-200 flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </button>
                <div className="text-center">
                  <button
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    {isSignUp
                      ? "Already have an account? Sign in"
                      : "Need an account? Sign up"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
