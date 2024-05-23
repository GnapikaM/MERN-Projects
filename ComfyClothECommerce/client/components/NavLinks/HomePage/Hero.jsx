import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="flex flex-col lg:flex-row pt-36 pb-10 max-lg:pt-28 max-sm:pt-36">
      <div className="flex-1 flex flex-col justify-center items-center p-8 lg:py-20 max-sm:px-2">
        <h1
          className="text-3xl md:text-6xl font-bold mb-4 text-center"
          style={{ color: `var(--header-color)` }}
        >
          Discover the Latest Trends
        </h1>
        <p
          className="text-md md:text-lg mb-6 text-center"
          style={{ color: `var(--gray-color)` }}
        >
          Shop our exclusive collection of trendy clothing and accessories.
        </p>
        <button
          className={`tracking-wider font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out hover:scale-105`}
          style={{
            backgroundColor: `var(--highlight-color)`,
            color: `var(--text-color)`,
          }}
        >
          <Link to="/products">SHOP MORE</Link>
        </button>
      </div>
      
      <div className="flex-1 grid grid-cols-4 max-[500px]:grid-cols-2 gap-4 md:pr-5">
        <div className="relative overflow-hidden rounded-lg shadow-md">
          <img
            src="https://img.freepik.com/free-photo/woman-green-dress-hat-yellow-background_1303-10383.jpg?t=st=1713581603~exp=1713585203~hmac=5ebc5b13f045ff2af0ec3c73176be9b67af8711ed9e4e3a07080c6a141e98a87&w=360"
            alt="Clothing"
            className="w-full h-full object-cover hover:opacity-90"
          />
        </div>
        <div className="relative overflow-hidden rounded-lg shadow-md">
          <img
            src="https://img.freepik.com/free-photo/full-size-portrait-charming-asian-female-pretty-maroon-dress-dancing-looking-camera-being-isolated-beige-background_171337-3564.jpg?t=st=1713581828~exp=1713585428~hmac=146ef8f0f7ed98578990b1442ecd60ac58d118cda494916683f5056aeda83690&w=360"
            alt="Clothing"
            className="w-full h-full object-cover hover:opacity-90"
          />
        </div>
        <div className="relative overflow-hidden rounded-lg shadow-md">
          <img
            src="https://img.freepik.com/free-photo/full-length-portrait-shocked-girl-dressed-dress_171337-3769.jpg?t=st=1713583633~exp=1713587233~hmac=0c10044c190fc5d88dd4bf9a086e6473d28e9a3a02bad3e2cbacc74e935ccc57&w=360"
            alt="Clothing"
            className="w-full h-full object-cover hover:opacity-90"
          />
        </div>
        <div className="relative overflow-hidden rounded-lg shadow-md">
          <img
            src="https://img.freepik.com/premium-photo/excited-young-woman-wearing-sunglasses_171337-23489.jpg?w=360"
            alt="Clothing"
            className="w-full h-full object-cover hover:opacity-90"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
