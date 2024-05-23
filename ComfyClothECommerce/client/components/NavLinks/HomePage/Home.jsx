import React from "react";

import { useTheme } from "../Theme/ThemeContext";
import "../../css/theme.css";
import Hero from "./Hero";
import FeaturedProducts from "./FeaturedProducts";
import ProductCategories from "./ProductCategories";
import CallToAction from "./CallToAction";
import FeaturedContent from "./FeaturedContent";

const Home = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`${theme === "dark" ? "dark-theme" : "light-theme"}`}
      style={{ backgroundColor: `var(--body-bg-color)`, minHeight: "100vh" }}
    >
      <Hero />
      <FeaturedProducts />
      <ProductCategories />
      <FeaturedContent />
      <CallToAction />
    </div>
  );
};

export default Home;
