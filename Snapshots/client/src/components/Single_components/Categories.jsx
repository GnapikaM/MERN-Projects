import React from "react";
import { categories } from "../../constants";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();

  const handleViewPosts = (categoryTitle) => {
    navigate(`/all-posts?category=${encodeURIComponent(categoryTitle)}`);
  };

  return (
    <div className="max-sm:-mt-12">
      <h2 className="text-[35px] max-sm:text-[30px] font-bold mb-4 relative z-10">
        What is included on this page?
      </h2>
      <div className="m-5 max-lg:m-2 grid grid-cols-1 max-xl:grid-cols-2 lg:grid-cols-4 max-lg:gap-2 gap-8">
        {categories.map((category) => (
          <div
            key={category.title}
            className="bg-white p-6 max-sm:p-1 rounded-lg shadow-md border-2 border-[#393E46] max-sm:border-[1px]"
          >
            <div className="flex justify-center mb-7 max-sm:mb-0 max-sm:hidden">
              <img
                src={category.imageSrc}
                alt={category.imageAlt}
                width={category.imageWidth}
              />
            </div>
            <div className="flex justify-center mb-7 max-sm:mb-0 sm:hidden">
              <img
                src={category.imageSrc}
                alt={category.imageAlt}
                width={category.imageWidthsm}
              />
            </div>
            <h3 className="text-xl font-semibold bg-[#393E46] text-white p-2 my-4 max-sm:p-0 max-sm:text-lg max-sm:my-2 max-sm:bg-white max-sm:text-[#393E46]">
              {category.title}
            </h3>
            <p className="text-gray-600 max-sm:hidden">{category.desc}</p>
            <p className="text-gray-600 sm:hidden">{category.descsm}</p>
            <button
              className="bg-[#393E46] transition-all hover:bg-[#00ADB5] text-white py-2 px-4 rounded-full mt-5 max-sm:mt-2 max-sm:p-1 max-sm:rounded"
              onClick={() => handleViewPosts(category.title)}
            >
              View Posts
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
