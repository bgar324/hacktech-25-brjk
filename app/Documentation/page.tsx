"use client";

import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import TechPortion from "./components/TechPortion";
import Footer from "../components/Footer";

// export const metadata = {
//   title: "documentation | hacktech 25 BRJK",
//   description:
//     "Detecting wrist and hand strain before you even feel it with Leap Motion real-time tracking.",
// };

const Page = () => {
  return (
    <>
      <div className="min-h-screen max-w-screen flex flex-col">
        <div className="flex-1">
          <Navbar />
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="max-w-screen-7xl items-center justify-center text-center mx-32">
              <h1 className="text-3xl mb-4 leading-12">
                Technology Stack and System Architecture
              </h1>
              <p className="text-gray-700 mb-6">
                Our ergonomic tracking system is built using modern technologies
                across multiple layers, from sensor data capture to user
                interface. Below is a detailed breakdown of each component:
              </p>
              <TechPortion />
            </div>
          </motion.div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Page;
