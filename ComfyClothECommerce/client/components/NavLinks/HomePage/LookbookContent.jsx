import React from "react";
import { BackButton, ScrollToTop } from "./Components";
import { useTheme } from "../Theme/ThemeContext";
import { useNavigate } from "react-router-dom";

const SummerLookbook = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  ScrollToTop();
  const lookbookData = [
    { image: "https://img.freepik.com/premium-photo/beautiful-young-woman-nice-blue-flower-print-spring-dress-straw-hat-studio-fashion-spring-summer-photo-emotions-pink-background_136403-12432.jpg?w=900", title: "Outfit 1" },
    { image: "https://img.freepik.com/premium-photo/young-girl-straw-hat-glasses-keeping-camera_132075-4105.jpg?w=900", title: "Outfit 2" },
    { image: "https://img.freepik.com/premium-photo/young-asian-woman-summer-swimming-suit-smile-happy-orange-background-with-copy-space_928174-1576.jpg?w=900", title: "Outfit 3" },
    { image: "https://img.freepik.com/free-photo/carefree-brunette-woman-trendy-pink-dress-straw-hat-holding-bamboo-bag-violet_273443-322.jpg?t=st=1713633700~exp=1713637300~hmac=fb8bb0ef437a45847025399068c0de90def08593ba5d9d117c78a9bf9fcd9051&w=900", title: "Outfit 4" },
    { image: "https://img.freepik.com/free-photo/young-beautiful-woman-looking-camera-hat-trendy-girl-casual-summer-white-t-shirt-yellow-skirt-round-sunglasses-positive-female-shows-facial-emotions-funny-model-isolated-blue_158538-15852.jpg?t=st=1713633664~exp=1713637264~hmac=0c7bb45c428810f6e0f45518444d8870744ca98e94901c727afabb527a693a40&w=826", title: "Outfit 5" },
    { image: "https://img.freepik.com/premium-photo/fashion-girl-stylish-clothes-colored-wall-background-autumn-bright-clothes-children_86390-1734.jpg?w=900", title: "Outfit 6" },
  ];

  return (
    <div
      className={`${theme === "dark" ? "dark-theme" : "light-theme"}`}
      style={{ backgroundColor: `var(--body-bg-color)`, minHeight: "100vh" }}
    >
      <section className="pb-8 pt-32 max-[550px]:pt-40">
        <div className="container mx-auto">
          <h2
            className="text-4xl font-bold text-center mb-12"
            style={{ color: `var(--text-color)` }}
          >
            Summer Lookbook:
            <span style={{ color: `var(--highlight-color)` }}>
              {" "}
              Casual Chic
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {lookbookData.map((item, index) => (
              <div key={index} className="rounded-lg overflow-hidden shadow-lg">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-96 object-cover object-center"
                />
                <div className="p-6">
                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{ color: `var(--text-color)` }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ color: `var(--gray-color)` }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    gravida ipsum eget quam eleifend aliquam.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <BackButton />
      </section>
    </div>
  );
};

export default SummerLookbook;
