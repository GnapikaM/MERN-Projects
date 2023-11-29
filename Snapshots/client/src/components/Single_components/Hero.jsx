import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="mx-auto text-center py-24 pb-48 relative w-full h-full max-lg:pb-24">
      <div className="bg-hero bg-cover h-full w-full absolute -top-[82px] left-0 max-lg:top-0"></div>
      <div className="bg-hero-before bg-cover h-full w-full absolute -top-[82px] left-0 opacity-50 max-lg:top-0"></div>
      <h2 className="text-4xl font-bold mb-4 text-white relative z-10 max-sm:text-[40px]">
        Welcome to Your Website
      </h2>
      <p className="text-lg text-gray-300 mb-8 relative z-10">
        Explore amazing posts and connect with the community.
      </p>
      <button className="bg-[#393E46] hover:bg-[#00ADB5] text-white py-2 px-4 rounded-full cursor-pointer relative z-10 transition-all hover:scale-110">
        <Link to="/all-posts">Get Started</Link>
      </button>
    </div>
  );
};

export default Hero;
