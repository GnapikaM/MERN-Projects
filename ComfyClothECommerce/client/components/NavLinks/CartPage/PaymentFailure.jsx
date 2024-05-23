import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentFailure = () => {
  const navigate = useNavigate();

  const handleRetryPayment = () => {
    navigate("/addressPage");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <svg
          className="mx-auto h-24 w-24 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900 text-center">
          Payment Failed!
        </h2>
        <p className="mt-2 text-sm text-gray-600 text-center">
          There was an error processing your payment. Please try again.
        </p>
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleRetryPayment}
            className="py-2 px-6 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Retry Payment
          </button>
        </div>
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Need help? <a href="/contactUs" className="text-blue-600 hover:underline">Contact us</a></p>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailure;
