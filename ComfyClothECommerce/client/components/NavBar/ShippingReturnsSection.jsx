import React from "react";
import { useState } from "react";
import { BackButton } from "../NavLinks/HomePage/Components";
import { useTheme } from "../NavLinks/Theme/ThemeContext";

const ShippingReturnsSection = () => {
  const {theme} = useTheme();
  const [showShipping, setShowShipping] = useState(true);
  const [showReturns, setShowReturns] = useState(false);

  const toggleShipping = () => {
    setShowShipping(!showShipping);
    setShowReturns(false);
  };

  const toggleReturns = () => {
    setShowReturns(!showReturns);
    setShowShipping(false);
  };

  return (
    <div
      className={`${
        theme === "dark" ? "dark-theme" : "light-theme"
      } flex justify-center items-center`}
      style={{
        backgroundColor: `var(--body-bg-color)`,
        color: `var(--text-color)`,
        minHeight: "100vh",
      }}
    >
    <div className="container mx-auto px-5 pb-8 pt-32 max-[550px]:pt-40">
      <div className="flex justify-between items-center mb-8 max-[550px]:flex-col">
        <h2 className="text-3xl font-bold max-[550px]:pb-4">
          Shipping & Returns
        </h2>
        <div className="space-x-4">
          <button
            onClick={toggleShipping}
            className="text-lg font-semibold focus:outline-none active:underline"
          >
            Shipping
          </button>
          <button
            onClick={toggleReturns}
            className="text-lg font-semibold focus:outline-none active:underline"
          >
            Returns
          </button>
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        {showShipping && (
          <div className="p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>
            <p className="">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              hendrerit justo ut sapien faucibus, et commodo tortor volutpat.
              Aenean faucibus, augue non ultricies feugiat, leo augue tempor
              lacus, eget dictum felis ex quis odio.
            </p>
          </div>
        )}
        {showReturns && (
          <div className="p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Returns Policy</h3>
            <p style={{color: `var(--gray-color)`}}>
              Nullam hendrerit justo ut sapien faucibus, et commodo tortor
              volutpat. Aenean faucibus, augue non ultricies feugiat, leo augue
              tempor lacus, eget dictum felis ex quis odio.
            </p>
            <ul className="list-disc list-inside mt-4" style={{color: `var(--gray-color)`}}>
              <li>Items must be returned within 30 days of purchase.</li>
              <li>Items must be unused and in original packaging.</li>
              <li>Customers are responsible for return shipping costs.</li>
            </ul>
          </div>
        )}
      </div>
      <BackButton />
    </div>
    </div>
  );
};

export default ShippingReturnsSection;
