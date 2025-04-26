import React from "react";
import Navbar from "../components/Navbar";
import ImageText from "./components/ImageText";
import Footer from "../components/Footer";

const page = () => {
  return (
    <div className="min-h-screen max-w-screen">
      <Navbar />
      <div className="max-w-screen-7xl items-center justify-center text-center mx-32">
        <h1 className="text-3xl mb-4 leading-12">
          Detecting wrist and hand strain before you even feel it
        </h1>
        <p className="text-gray-700 mb-6">
          Our system captures real-time wrist and hand data, analyzes posture
          angles, and delivers instant ergonomic feedback to help prevent strain
          and injury.
        </p>
        <div className="flex flex-col gap-12">
          <ImageText
            imageSrc="/static/howitworks-images/first-iteration.jpg"
            altText="first-iteration"
            title="Leap Motion Sensor"
            descriptionToImage="First iteration of our sensor"
            description="The Leap Motion sensor captures precise 3D data of the user's hand and wrist movements in real time. Using infrared cameras and motion tracking algorithms, it monitors posture at over 100 frames per second. This allows our system to detect wrist angles, hand positioning, and ergonomic risks instantly and non-invasively."
          />
          <ImageText
            imageSrc="/static/howitworks-images/overview.jpg"
            altText="overview"
            title="Real-Time Hand Tracking via Leap"
            description="Our system captures and visualizes hand and finger movements in real time using the Leap Motion Controller. As users type or position their hands, the sensor tracks joint positions and renders a 3D skeletal model at 120 frames per second—laying the foundation for precise ergonomic diagnostics."
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default page;
