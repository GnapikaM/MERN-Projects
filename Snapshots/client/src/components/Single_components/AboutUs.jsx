import React from "react";
import { Link } from "react-router-dom";

import { groupPhoto } from "../../assets/images";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const AboutUs = () => {
  return (
    <div className="max-w-6xl m-auto flex flex-col items-center lg:flex-row bg-white rounded shadow-md">
      <div className="flex w-[300px] lg:w-1/4">
        <img src={groupPhoto} alt="group-photo" className="w-full" />
      </div>
      <div className="flex flex-col items-center lg:w-3/4 p-4">
        <h1 className="text-3xl font-bold mb-4 max-sm:mb-0 text-gray-800 text-center lg:text-left">
          About Us
        </h1>
        <p className="text-gray-600 text-center lg:text-left max-sm:hidden">
          "Welcome to <span>SnapShots</span>, the vibrant intersection of
          passion and innovation. Our global platform unites creators and
          enthusiasts alike. Conceived from a dream to surpass the ordinary,
          Snapshots is a haven where creativity not only survives
          but flourishes. Embark on a transformative journey with us, where
          discovery, empowerment, and shared experiences weave a tapestry of
          inspiration, connecting a diverse community of like-minded individuals
          who collectively shape the narrative of our unique and dynamic space."
        </p>
        <p className="text-gray-600 text-center lg:text-left sm:hidden">
          "Welcome to <span>SnapShots</span>, the vibrant intersection of
          passion and innovation. Our global platform unites creators and
          enthusiasts alike."
        </p>
        <div className="bg-[#393E46] text-white py-2 px-6 rounded-full inline-block mt-4 lg:mt-5 hover:bg-[#00ADB5] transition-all duration-300 cursor-pointer">
          <Link to="/about" onClick={scrollToTop}>
            Know Us More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
