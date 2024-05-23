import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Theme/ThemeContext";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleContinueShopping = () => {
    navigate("/wishlist");
  };

  return (
    <div
      className={`${theme === "dark" ? "dark-theme" : "light-theme"}`}
      style={{
        backgroundColor: `var(--body-bg-color)`,
        color: `var(--text-color)`,
        minHeight: "100vh",
      }}
    >
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full p-8 max-sm:px-2 max-sm:py-4 rounded-lg shadow-md">
          <svg
            className="mx-auto h-24 w-24 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <h2 className="mt-6 text-3xl font-extrabold text-center">
            Payment Successful!
          </h2>
          <p className="mt-2 text-sm text-center">
            Thank you for your purchase. Your transaction has been completed
            successfully.
          </p>
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleContinueShopping}
              className="py-2 px-6 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Continue Shopping
            </button>
          </div>
          <div className="mt-6 text-center text-sm">
            <p>
              Need help?{" "}
              <a href="/contactUs" className="text-blue-600 hover:underline">
                Contact us
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
