import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../NavLinks/Theme/ThemeContext";
import { ScrollToTop } from "../NavLinks/HomePage/Components";

const CareersPage = () => {
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
      <ScrollToTop />
      <div className="py-10 pt-32 max-[550px]:pt-36">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <h1 className="text-4xl font-bold text-center mb-8">
              Current Job Openings
            </h1>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="shadow-md rounded-md p-6">
                <h2 className="text-lg font-semibold mb-2">
                  Senior Frontend Developer
                </h2>
                <p className="text-sm mb-4">Location: India</p>
                <p
                  className="text-sm mb-4"
                  style={{ color: `var(--gray-color)` }}
                >
                  We are looking for an experienced frontend developer to join
                  our team.
                </p>
                <Link
                  to="/apply/senior-frontend-developer"
                  className="block text-center font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
                  style={{ backgroundColor: `var(--highlight-color)` }}
                >
                  Apply Now
                </Link>
              </div>

              <div className="shadow-md rounded-md p-6">
                <h2 className="text-lg font-semibold mb-2">
                  Digital Marketing Manager
                </h2>
                <p className="text-sm mb-4">Location: India</p>
                <p
                  className="text-sm mb-4"
                  style={{ color: `var(--gray-color)` }}
                >
                  We are seeking a skilled digital marketing manager to lead our
                  online marketing efforts.
                </p>
                <Link
                  to="/apply/digital-marketing-manager"
                  className="block text-center font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
                  style={{ backgroundColor: `var(--highlight-color)` }}
                >
                  Apply Now
                </Link>
              </div>

              <div className="shadow-md rounded-md p-6">
                <h2 className="text-lg font-semibold mb-2">Fashion Designer</h2>
                <p className="text-sm mb-4">Location: India</p>
                <p
                  className="text-sm mb-4"
                  style={{ color: `var(--gray-color)` }}
                >
                  We are looking for a creative fashion designer to join our
                  design team.
                </p>
                <Link
                  to="/apply/fashion-designer"
                  className="block text-center font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
                  style={{ backgroundColor: `var(--highlight-color)` }}
                >
                  Apply Now
                </Link>
              </div>

              <div className="shadow-md rounded-md p-6">
                <h2 className="text-lg font-semibold mb-2">
                  Customer Support Representative
                </h2>
                <p className="text-sm mb-4">Location: India</p>
                <p
                  className="text-sm mb-4"
                  style={{ color: `var(--gray-color)` }}
                >
                  We are hiring a customer support representative to assist our
                  customers with their inquiries.
                </p>
                <Link
                  to="/apply/customer-support-representative"
                  className="block text-center font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
                  style={{ backgroundColor: `var(--highlight-color)` }}
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </div>

          <div className="md:col-span-1 shadow-md rounded-md p-6">
            <h2 className="text-2xl font-bold mb-4">Our Company Culture</h2>
            <p className="" style={{ color: `var(--gray-color)` }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum feugiat, nisi a placerat consectetur, ligula est
              commodo quam, non finibus lorem purus sed libero. Cras vel pretium
              nulla. Sed at purus sed lorem pharetra placerat.
            </p>
            <Link
              to="/about"
              className="block text-center font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out mt-6"
              style={{ backgroundColor: `var(--highlight-color)` }}
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareersPage;
