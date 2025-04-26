import React from "react";
import Navbar from "../components/Navbar";
import TechPortion from "./components/TechPortion";

const page = () => {
  return (
    <div className="min-h-screen max-w-screen">
      <Navbar isSignedIn/>
      <div className="max-w-screen-7xl items-center justify-center text-center mx-32">
        <h1 className="text-3xl mb-4 leading-12">Technology Stack and System Architecture</h1>
        <p className="text-gray-700 mb-6">
          Our ergonomic tracking system is built using modern technologies across multiple layers,
          from sensor data capture to user interface. Below is a detailed breakdown of each component:
        </p>
        <TechPortion />
      </div>
    </div>
  );
};

export default page;
