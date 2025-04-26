import React from "react";

const Navbar = () => {
  return (
    <div className="flex items-center px-8 py-3 border-b-[0.75px] border-gray-200 mb-8">
      <div className="flex-shrink-0">
        <a href = "/" className="px-2 py-1 hover:bg-gray-300/70 duration-200 ease-in-out rounded-full transition cursor-pointer">
          russell
        </a>
      </div>
      <div className="flex-1 flex justify-center gap-8 pl-4">
        <a href = "/HowItWorks" className="cursor-pointer px-2 py-1 hover:bg-gray-300/70 duration-200 ease-in-out rounded-full transition">
          how it works
        </a>
        <a href = "/Documentation" className="cursor-pointer px-2 py-1 hover:bg-gray-300/70 duration-200 ease-in-out rounded-full transition">
          documentation
        </a>
        <a className="cursor-pointer px-2 py-1 hover:bg-gray-300/70 duration-200 ease-in-out rounded-full transition">
          science behind
        </a>
      </div>
      <div className="flex-shrink-0 flex gap-4">
        <a href = "/LogIn"className="px-6 py-1 bg-amber-400 hover:bg-amber-400/80 rounded-lg transition cursor:pointer">
          log in
        </a>
      </div>
    </div>
  );
};

export default Navbar;
