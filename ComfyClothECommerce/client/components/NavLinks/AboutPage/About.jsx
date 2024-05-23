import React from "react";
import { useTheme } from "../Theme/ThemeContext";
import { groupPhoto, groupPhoto1 } from "../../../assets/images";

const About = () => {
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
      <div className="pt-32 pb-16 pl-10 font-bold text-3xl sm:text-4xl tracking-[2px] max-lg:pb-8 max-[550px]:pt-36 max-[550px]:pl-4">
        <span style={{ color: `var(--highlight-color)` }}>Home</span> / About
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-8" style={{color: `var(--gray-color)`}}>
            <h1 className="text-4xl font-bold mb-4" style={{color: `var(--text-color)`}}>About Us</h1>
            <p className="text-lg">
              Welcome to our clothing e-commerce website! We are passionate
              about providing high-quality clothing and accessories to our
              customers.
            </p>
            <p className="text-lg mb-6">
              Our mission is to offer a wide selection of trendy and fashionable
              items at affordable prices. Whether you're looking for everyday
              basics or statement pieces, we've got you covered.
            </p>
            <p className="text-lg mb-6">
              At our store, customer satisfaction is our top priority. We strive
              to provide exceptional service and create a seamless shopping
              experience for every customer.
            </p>
            <p className="text-lg mb-6">Feel free to <span style={{color: `var(--highlight-color)`}}><a href="/contactUs">contact us</a></span> anytime ! </p>
            <p className="text-lg mb-6">
              Thank you for choosing us for your fashion needs. Happy shopping!
            </p>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            {theme === "dark" ? (
              <img
                src={groupPhoto}
                alt="About Us"
                className="w-full h-auto rounded-md shadow-lg"
              />
            ) : (
              <img
                src={groupPhoto1}
                alt="About Us"
                className="w-full h-auto rounded-md shadow-lg"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
