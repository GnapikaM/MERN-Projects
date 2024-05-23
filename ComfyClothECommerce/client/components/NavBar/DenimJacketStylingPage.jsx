import React from "react";
import { useTheme } from "../NavLinks/Theme/ThemeContext";
import { BackButton } from "../NavLinks/HomePage/Components";

const DenimJacketStylingPage = () => {
  const { theme } = useTheme();
  return (
    <div
      className={`${theme === "dark" ? "dark-theme" : "light-theme"}`}
      style={{
        backgroundColor: `var(--body-bg-color)`,
        color: `var(--text-color)`,
        minHeight: "100vh",
      }}
    >
      <div className="pb-8 pt-32 max-[550px]:pt-40 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto shadow-md rounded-md p-8">
            <h1 className="text-3xl font-bold mb-6">
              How to{" "}
              <span style={{ color: `var(--highlight-color)` }}>
                Style Denim Jackets
              </span>{" "}
              for Any Occasion
            </h1>
            <p className="mb-4" style={{ color: `var(--gray-color)` }}>
              Denim jackets are versatile and can be styled in numerous ways for
              different occasions. Whether you're going for a casual look or
              dressing up for a night out, here are some tips to help you style
              your denim jacket effortlessly:
            </p>
            <ul
              className="list-disc list-inside mb-4"
              style={{ color: `var(--gray-color)` }}
            >
              <li>
                Pair your denim jacket with a white t-shirt and jeans for a
                classic, casual look.
              </li>
              <li>
                Dress up your denim jacket by layering it over a button-down
                shirt and chinos.
              </li>
              <li>
                Add some edge to your outfit by wearing your denim jacket with a
                graphic tee and distressed jeans.
              </li>
              <li>
                For a chic and feminine look, style your denim jacket with a
                floral dress and ankle boots.
              </li>
              <li>
                Transition your denim jacket into cooler weather by layering it
                over a sweater and leggings.
              </li>
              <li>
                Accessorize your denim jacket with statement jewelry, scarves,
                or hats to elevate your look.
              </li>
            </ul>
            <p className="mb-4" style={{ color: `var(--gray-color)` }}>
              Experiment with different combinations and have fun expressing
              your personal style with a denim jacket!
            </p>
            <p className="mb-4" style={{ color: `var(--gray-color)` }}>
              Remember, the key to styling a denim jacket is to keep it
              versatile and adapt it to suit any occasion.
            </p>
            <p className="mb-4" style={{ color: `var(--gray-color)` }}>
              Whether you're running errands, meeting friends for brunch, or
              heading out for a night on the town, a denim jacket is the perfect
              wardrobe staple that will never go out of style.
            </p>
          </div>
        </div>
        <BackButton />
      </div>
    </div>
  );
};

export default DenimJacketStylingPage;
