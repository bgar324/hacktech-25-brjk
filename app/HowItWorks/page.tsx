"use client"

import { motion } from "framer-motion";
import React from "react";
import Navbar from "../components/Navbar";
import ImageText from "./components/ImageText";
import Footer from "../components/Footer";

// export const metadata = {
//   title: "how it works | het.ai",
//   description:
//     "Detecting wrist and hand strain before you even feel it with Leap Motion real-time tracking.",
// };

const Page = () => {
  return (
    <>
      <div className="min-h-screen max-w-screen flex flex-col">
        <div className="flex-1">
          <Navbar />
          <div className="max-w-screen-7xl items-center justify-center text-center px-4 md:px-32">
            <h1 className="text-xl md:text-3xl mb-4 md:leading-12 font-semibold">
              Detecting wrist and hand strain before you even feel it
            </h1>
            <p className="text-gray-700 mb-6 text-sm md:text-base">
              Our system captures real-time wrist and hand data, analyzes
              posture angles, and delivers instant ergonomic feedback to help
              prevent strain and injury.
            </p>
            <div className="flex flex-col gap-12">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <ImageText
                  imageSrc="/static/howitworks-images/first-iteration.jpg"
                  altText="first-iteration"
                  title="Leap Motion Sensor"
                  descriptionToImage="First iteration of our sensor"
                  description="The Leap Motion sensor captures precise 3D data of the user's hand and wrist movements in real time. Using infrared cameras and motion tracking algorithms, it monitors posture at over 100 frames per second. This allows our system to detect wrist angles, hand positioning, and ergonomic risks instantly and non-invasively."
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <ImageText
                  imageSrc="/static/howitworks-images/overview.jpg"
                  altText="overview"
                  title="Real-Time Hand Tracking via Leap"
                  description="Our system captures and visualizes hand and finger movements in real time using the Leap Motion Controller. As users type or position their hands, the sensor tracks joint positions and renders a 3D skeletal model at 120 frames per second—laying the foundation for precise ergonomic diagnostics."
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <ImageText
                  imageSrc="/static/howitworks-images/working-data.jpg"
                  altText="working-data"
                  title="Working Data"
                  description="Our system processes the raw data from the Leap Motion sensor to extract meaningful information about hand and wrist movements. This includes tracking joint angles, hand positions, and other relevant metrics that help us assess ergonomic risks."
                />
              </motion.div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Page;
