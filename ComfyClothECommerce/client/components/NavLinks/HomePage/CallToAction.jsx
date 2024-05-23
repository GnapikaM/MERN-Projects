import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CallToAction = () => {
  const [email, setEmail] = useState("");
  const user = useSelector((state) => state.AuthReducer.authData);

  useEffect(() => {
    if (user) {
      setEmail(user.result.email);
    }
  }, [user]);

  const handleEmailChange = (e) => {
    if (!user) {
      setEmail(e.target.value);
    }
  };

  const handleSignUpClick = () => {
    if (!user) {
      localStorage.setItem("signUpEmail", email);
    }
  };

  return (
    <section className="bg-gray-900 py-20">
      <div className="container mx-auto flex flex-col items-center justify-center text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          Discover Your Style
        </h2>
        <p className="text-lg text-gray-300 mb-8">
          Explore our latest collections and find the perfect pieces for your
          wardrobe.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out">
            <Link to="/bag">Shop Now</Link>
          </button>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out">
            <Link to="/products">Explore Collections</Link>
          </button>
        </div>
        <p className="text-sm text-gray-400 mt-4">
          Sign up for exclusive offers and updates
        </p>
        <form className="mt-2">
          <input
            className={`text-gray-800 border border-gray-300 rounded-full py-3 px-4 w-full sm:w-80 focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out ${
              user ? "bg-gray-400 text-gray-500 cursor-not-allowed" : "bg-white"
            }`}
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={handleEmailChange}
          />
          <button
            type="button"
            className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full mt-4 sm:mt-0 ml-0 sm:ml-4 transition duration-300 ease-in-out ${
              user ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleSignUpClick}
            disabled={!!user}
          >
            {user ? (
              <span>Already Signed Up</span>
            ) : (
              <Link to="/login">Sign Up</Link>
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default CallToAction;
