import React from "react";
import { Link } from "react-router-dom";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const PopularContent = () => {
  return (
    <div className="mx-10 max-sm:mx-4 py-16 max-sm:py-6 max-sm:-mt-6 bg-gradient-to-b from-teal-500 to-indigo-600 rounded-lg">
      <div className="max-w-2xl mx-auto p-2 max-sm:py-4 text-gray-50">
        <h2 className="text-[35px] max-sm:text-[30px] font-bold mb-4">
          Ready to Explore Popular Content?
        </h2>
        <p className="text-lg text-gray-200 mb-6 mt-10 max-sm:mb-3 max-sm:mt-0">
          Discover trending recipes, creative DIY projects, and captivating
          pottery items. Join our community and explore what's popular now!
        </p>
        <div className="bg-yellow-400 hover:bg-yellow-500 transition duration-300 text-white font-bold text-lg py-2 px-6 rounded-full inline-block cursor-pointer">
          <Link to="/popular-posts" onClick={scrollToTop}>
            Explore Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PopularContent;
