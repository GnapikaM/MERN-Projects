import React, { useEffect, useState } from "react";
import "../../css/theme.css";
import { useTheme } from "../Theme/ThemeContext";
import LargeScreenUI from "./LargeScreenUI";
import SmallScreenUI from "./SmallScreenUI";

const Products = () => {
  const { theme } = useTheme();

  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1024);

  const handleResize = () => {
    setIsLargeScreen(window.innerWidth > 1024);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`${theme === "dark" ? "dark-theme" : "light-theme"}`}
      style={{
        backgroundColor: `var(--body-bg-color)`,
        color: `var(--text-color)`,
      }}
    >
      <div className="pt-32 pb-16 pl-10 font-bold text-3xl sm:text-4xl tracking-[2px] max-lg:pb-8 max-[550px]:pt-36 max-[550px]:pl-4">
        <span style={{ color: `var(--highlight-color)` }}>Home</span> / Products
      </div>

      {isLargeScreen ? <LargeScreenUI /> : <SmallScreenUI />}
    </div>
  );
};

export default Products;
