import React from "react";
import Navbar from "../components/Navbar";
import TechPortion from "./components/TechPortion";

const page = () => {
  return (
    <div className="min-h-screen max-w-screen">
      <Navbar />
      <div className="max-w-screen-7xl items-center justify-center text-center mx-32">
        <h1 className="text-3xl mb-8 leading-12">Technology Stack and System Overview</h1>
        <TechPortion />
      </div>
    </div>
  );
};

export default page;
