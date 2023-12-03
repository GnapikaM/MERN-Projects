import React from "react";
import { Link } from "react-router-dom";

import { joinTeam } from "../../../../assets/images/index";

const CTA = () => {

  return (
    <div className="container mx-auto flex items-center justify-center my-16 max-lg:flex-col">
      <div className="w-full md:w-1/2 md:pr-8">
        <img
          src={joinTeam}
          alt="CTA Background"
          className="object-cover w-full h-full rounded-lg shadow-lg max-lg:hidden"
        />
      </div>

      <div className="bg-white w-full lg:w-1/2 p-8 rounded-lg shadow-lg bg-gradient-to-b from-teal-500 to-indigo-600 text-white max-lg:w-full max-sm:p-4">
        <h1 className="text-3xl font-bold mb-4 text-gray-800 max-sm:mb-0">
          Join Us Today!
        </h1>
        <p className="mb-4 max-sm:mb-2">
          Welcome to Snapshots! We're thrilled to have you here.
        </p>
        <p className="mb-4 max-sm:mb-3">
          Unlock exclusive benefits and stay updated on our latest offerings.
          Join our community today!
        </p>
        <Link to="/auth">
          <button
            className="bg-yellow-400 text-gray-800 px-8 py-3 rounded-full font-semibold hover:bg-yellow-500 transition duration-300 max-sm:px-3 max-sm:py-2"
          >
            Sign Up Now
          </button>
        </Link>

        <div className="mt-6 max-sm:mt-3">
          <p className="mb-2 max-sm:mb-0">Why join us?</p>
          <ul className="list-disc list-inside">
            <li>Access to premium content</li>
            <li>Exclusive deals and discounts</li>
            <li>Be the first to know about new products</li>
          </ul>
        </div>

        <p className="my-6 max-sm:my-2">
          Don't miss out on the opportunity to be part of something great.
          Subscribe now and elevate your experience with Snapshots.
        </p>
        <p>
          Have questions?
          <span> </span>
          <Link to="/contact" className="text-yellow-400 hover:underline">
            Contact us
          </Link>
          <span> </span>
          for assistance.
        </p>
      </div>
    </div>
  );
};

export default CTA;
