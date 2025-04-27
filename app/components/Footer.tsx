import React from "react";
import { ArrowRightIcon } from "lucide-react";

const Footer = () => {
  return (
    <div className="text-gray-800 border-t-[1.25px] border-gray-200 bg-gray-200/80 w-full text-center items-center flex flex-col mt-8 py-4">
      <p className="text-sm md:text-base ">
        <span className="font-mono">© het.ai</span> | Product of HackTech '25
      </p>
      <div className="flex flex-row gap-8 mt-4 text-xs md:text-base px-12 md:px-0">
        <p>Benjamin Garcia</p>
        <p>Russell Soo</p>
        <p>Jonathan Soo</p>
        <p>Katelyn Teav</p>
      </div>
    </div>
  );
};

export default Footer;
