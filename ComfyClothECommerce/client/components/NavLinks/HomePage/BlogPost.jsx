import React from "react";
import { useTheme } from "../Theme/ThemeContext";
import { BackButton, ScrollToTop } from "./Components";

const BlogPost = () => {
  const { theme } = useTheme();
  ScrollToTop();
  return (
    <div
      className={`${theme === "dark" ? "dark-theme" : "light-theme"}`}
      style={{ backgroundColor: `var(--body-bg-color)`, minHeight: "100vh" }}
    >
      <div className="container mx-auto pb-8 pt-32 max-[550px]:pt-40">
        <div className="max-w-3xl m-auto max-lg:mx-4">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6" style={{color: `var(--text-color)`}}>
            10 <span style={{color: `var(--highlight-color)`}}> Must-Have </span> Accessories for Every Wardrobe
          </h1>
          <img
            src="https://img.freepik.com/premium-photo/modern-open-wardrobe-dressing-room-no-people-generative-ai_233473-1111.jpg?w=900"
            alt="Accessories"
            className="w-full h-auto mb-6 rounded-lg shadow-lg"
          />
          <div className="prose prose-lg" style={{color: `var(--gray-color)`}}>
            <p>
              Accessories are the finishing touches that can elevate any outfit
              from ordinary to extraordinary. Whether you're dressing up for a
              special occasion or adding flair to your everyday look, having the
              right accessories in your wardrobe is essential. Here are 10
              must-have accessories that every fashion enthusiast should own:
            </p>
            <ol className="list-decimal pl-8 mt-4">
              <li>
                Statement Necklace: Add instant glamour to any outfit with a
                bold statement necklace.
              </li>
              <li>
                Classic Watch: A timeless accessory that never goes out of
                style.
              </li>
              <li>
                Leather Handbag: Invest in a quality leather handbag that
                complements your style and lasts for years.
              </li>
              <li>
                Sunglasses: Protect your eyes from the sun while adding a touch
                of coolness to your look.
              </li>
              <li>
                Scarves: Versatile and stylish, scarves can be worn in countless
                ways to add color and texture to your ensemble.
              </li>
              <li>
                Hats: From fedoras to beanies, hats are not only fashionable but
                also practical for bad hair days.
              </li>
              <li>
                Belts: Define your waist and add interest to your outfit with a
                chic belt.
              </li>
              <li>
                Statement Earrings: Make a statement with bold and eye-catching
                earrings.
              </li>
              <li>
                Bracelets: Stackable bracelets or a single statement piece can
                add personality to your wrist.
              </li>
              <li>
                Ankle Boots: A stylish and versatile footwear option that can be
                dressed up or down for any occasion.
              </li>
            </ol>
            <p>
              With these 10 must-have accessories in your wardrobe, you'll be
              ready to take on any fashion challenge with style and confidence.
            </p>
          </div>
        </div>
        <BackButton />
      </div>
    </div>
  );
};

export default BlogPost;
