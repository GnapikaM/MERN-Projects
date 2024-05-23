import React from "react";
import { useTheme } from "../NavLinks/Theme/ThemeContext";
import { BackButton } from "../NavLinks/HomePage/Components";

const SustainableFashionPage = () => {
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
              Trend Alert: <span style={{color: `var(--highlight-color)`}}>Sustainable Fashion Tips</span> for Eco-Conscious Shoppers
            </h1>
            <img
              src="https://img.freepik.com/free-photo/full-shot-people-garage-sale_23-2150661451.jpg?t=st=1716482707~exp=1716486307~hmac=be34b28c700ddce1fa1b64025a1dc0616280bcedf51342ec3d21e5af28cbebb4&w=900"
              alt="Sustainable Fashion"
              className="mb-6 rounded-lg"
            />
            <p className="mb-4" style={{color: `var(--gray-color)`}}>
              Sustainable fashion is becoming increasingly popular as more
              people become aware of the environmental impact of fast fashion.
              If you're looking to make more eco-friendly fashion choices, here
              are some tips to get you started:
            </p>
            <ul className="list-disc ml-6 mb-4" style={{color: `var(--gray-color)`}}>
              <li>
                Choose quality over quantity. Invest in timeless pieces that
                will last for years rather than trendy items that will quickly
                go out of style.
              </li>
              <li>
                Look for clothing made from sustainable materials such as
                organic cotton, hemp, bamboo, or recycled fabrics.
              </li>
              <li>
                Support brands that prioritize ethical and fair labor practices,
                including paying fair wages and providing safe working
                conditions for garment workers.
              </li>
              <li>
                Opt for second-hand or vintage clothing to reduce waste and
                extend the lifespan of garments.
              </li>
              <li>
                Reduce your carbon footprint by shopping locally or buying from
                brands with transparent supply chains and
                environmentally-friendly production processes.
              </li>
              <li>
                Take good care of your clothes by washing them in cold water,
                air drying whenever possible, and repairing any damages instead
                of throwing them away.
              </li>
              <li>
                Consider renting clothing for special occasions or using
                clothing rental services to minimize your wardrobe's
                environmental impact.
              </li>
            </ul>
            <p className="mb-4" style={{color: `var(--gray-color)`}}>
              By making more sustainable fashion choices, you can reduce your
              environmental footprint and support a more ethical and
              eco-friendly fashion industry.
            </p>
          </div>
        </div>
        <BackButton />
      </div>
    </div>
  );
};

export default SustainableFashionPage;
