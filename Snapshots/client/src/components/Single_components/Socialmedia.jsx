import React from "react";
import { Link } from "react-router-dom";

const SocialMedia = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center max-lg:flex-col max-sm:-mt-16">
      <div className="bg-white p-8 rounded-md shadow-md h-[400px] max-sm:h-full m-4 w-full md:w-2/3 lg:w-1/2 max-sm:p-2">
        <h1 className="text-3xl font-bold mb-4 text-gray-800 text-center max-sm:mb-0">
          Connect with Us on Social Media!
        </h1>
        <p className="text-gray-600 text-center">
          Follow our social media profiles to stay in the loop and engage with
          our community.
        </p>

        <div className="flex justify-center mt-4 max-sm:mt-2">
          <a
            href="[Facebook Link]"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2 text-blue-500 hover:text-blue-700"
          >
            <i className="fab fa-facebook fa-2x"></i>
          </a>
          <a
            href="[Twitter Link]"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2 text-blue-400 hover:text-blue-600"
          >
            <i className="fab fa-twitter fa-2x"></i>
          </a>
          <a
            href="[Instagram Link]"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2 text-pink-500 hover:text-pink-700"
          >
            <i className="fab fa-instagram fa-2x"></i>
          </a>
        </div>

        <p className="mt-4 text-gray-600 text-center max-sm:mt-2">Join the conversation:</p>

        <div className="flex mt-2 justify-center max-sm:flex-col">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue mb-2">
            Share on Facebook
          </button>
          <button className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue">
            Share on Twitter
          </button>
        </div>

        <p className="mt-4 text-gray-600 text-center">
          Don't forget to use our official hashtag: Snapshots
        </p>
      </div>

      <div className="bg-white p-8 rounded-md shadow-md h-[400px] max-sm:h-full m-4 w-full md:w-2/3 lg:w-1/2 flex flex-col justify-center max-sm:m-0">
        <h1 className="text-3xl font-bold mb-4 text-gray-800 text-center">
          Contact Information
        </h1>

        <div className="flex flex-col items-center justify-center">
          <p>
            Email: <a href="mailto:info@example.com">info@example.com</a>
          </p>
          <p>Phone: +1 (555) 123-4567</p>
          <p>Address: 123 Main Street, Cityville, Country</p>
          <Link to="/contact">
            <button className="bg-pink-500 text-white p-2 mt-4 rounded-md cursor-pointer max-md:mb-5 hover:bg-pink-600">
              Send us message
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SocialMedia;
