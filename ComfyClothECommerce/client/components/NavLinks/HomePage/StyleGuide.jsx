import React from "react";
import { BackButton, ScrollToTop } from "./Components";
import { useTheme } from "../Theme/ThemeContext";

const StyleGuide = () => {
    const {theme } = useTheme();
    ScrollToTop();
  return (
    <div
      className={`${theme === "dark" ? "dark-theme" : "light-theme"}`}
      style={{ backgroundColor: `var(--body-bg-color)`, minHeight: "100vh" }}
    >
      <section className="pb-8 pt-32 max-[550px]:pt-40">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12" style={{color: `var(--text-color)`}}>
            Spring Fashion Trends <span style={{color: `var(--highlight-color)`}}> 2024</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://img.freepik.com/free-photo/fashion-portrait-two-young-hippie-women-models-summer-sunny-day-bright-colorful-hipster-clothes_158538-10433.jpg?t=st=1713632958~exp=1713636558~hmac=8ac8f3db95af232bc6c27d8761a4b7b3df1724856bd6cda366d8126d82771af6&w=900"
                alt="Trend 1"
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2" style={{color: `var(--text-color)`}}>Bright Colors</h3>
                <p style={{color: `var(--gray-color)`}}>
                  Embrace bold and vibrant colors to make a statement this
                  spring.
                </p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://img.freepik.com/free-photo/purple-casual-jumper-hangers-womans-hand-against-rail-with-snow-white-clothing_273609-32782.jpg?t=st=1713633110~exp=1713636710~hmac=54c0cf0cca8a0aefeb9f2ac7cf71e4c9f94e90fb1411d0567bd2806abd8878e9&w=900"
                alt="Trend 2"
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2" style={{color: `var(--text-color)`}}>Pastel Hues</h3>
                <p style={{color: `var(--gray-color)`}}>
                  Soft pastel shades are perfect for creating a dreamy and
                  romantic look.
                </p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://img.freepik.com/premium-photo/mesh-bag-cotton-bags_87742-13897.jpg?w=826"
                alt="Trend 3"
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2" style={{color: `var(--text-color)`}}>
                  Sustainable Fashion
                </h3>
                <p style={{color: `var(--gray-color)`}}>
                  Opt for eco-friendly materials and ethical fashion choices to
                  stay on trend.
                </p>
              </div>
            </div>
          </div>
        </div>
        <BackButton />
      </section>
    </div>
  );
};

export default StyleGuide;
