import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { joinTeam, mainImage, team1, team2, team3 } from "../../assets/images";

const About = () => {
  const user = useState(JSON.parse(localStorage.getItem("profile")));

  return (
    <div className="container mx-auto p-8 bg-gray-100">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">About Us</h1>
        <p className="text-gray-600">
          Connecting Creators, Enthusiasts, and Minds Worldwide
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <p className="mb-4">
            Welcome to <span className="font-bold">Snapshots</span>, a dynamic
            platform that connects creators, enthusiasts, and curious minds from
            around the world. Our mission is to provide a space where
            individuals can share their passion, explore diverse content, and
            engage in meaningful interactions.
          </p>
          <Link to="/all-posts">
            <button className="w-[200px] mb-4 bg-gray-400 text-white rounded-lg py-1 px-2 font-medium cursor-pointer transition-all hover:bg-[#00ADB5]">
              Explore Our Content
            </button>
          </Link>

          <h3 className="text-2xl font-bold mb-2">Our Story</h3>
          <p className="mb-4">
            <span className="font-bold">Snapshots</span> was born from the collective dream of 
            <span className="font-bold"> Gnapika Mallavaram</span> and a group of forward-thinking individuals who saw
            the potential for something extraordinary. Our journey began with a
            simple idea: to create a space that transcends the ordinary, where
            creativity flourishes, and connections are forged.
          </p>

          <h3 className="text-2xl font-bold mb-2">Our Vision</h3>
          <p className="mb-4">
            At <span className="font-bold">Snapshots</span>, we believe in the power of community and
            the impact of shared experiences. We envision a platform where
            creativity knows no bounds, and every voice has the potential to
            inspire, educate, and entertain. Whether you're a seasoned creator
            or a passionate explorer, we invite you to join us on this journey
            of discovery.
          </p>

          <h3 className="text-2xl font-bold mb-2">Mission Statement</h3>
          <p className="mb-4">
            At <span className="font-bold">Snapshots</span>, our mission is clear: to empower
            individuals to express themselves, connect with like-minded souls,
            and push the boundaries of what's possible. We believe that everyone
            has a unique story to tell, and we're here to provide the canvas for
            those stories to unfold.
          </p>
        </div>

        <div>
          <img
            src={mainImage}
            alt="main Image"
            className="rounded-lg shadow-md object-cover h-64 w-full mb-4"
          />

          <h3 className="text-2xl font-bold mb-2">What Sets Us Apart</h3>
          <ul className="list-disc pl-6 mb-4">
            <li>
              Innovation: Our cutting-edge technology ensures a seamless and
              immersive experience for users. We're not just keeping up with
              trends; we're setting them.
            </li>
            <li>
              Community-First Approach: We prioritize community building. Every
              feature, update, and improvement is made with the goal of
              enhancing the user experience and fostering a sense of belonging.
            </li>
            <li>
              Endless Possibilities: <span className="font-bold">Snapshots</span> is more than a
              platform; it's a playground for creativity. From specific
              features to unique offerings, we provide the tools for you to
              shape your digital world.
            </li>
          </ul>

          <h3 className="text-2xl font-bold mb-2">Meet the Team</h3>
          <p className="mb-4">
          <span className="font-bold">Snapshots</span> is brought to you by a dedicated team of
            professionals who share a common goal — to create a platform that
            fosters creativity, collaboration, and connection. Get to know the
            faces behind the scenes:
          </p>
          <div className="grid grid-cols-3 gap-4">
            <img
              src={team1}
              alt="Team Member 1"
              className="rounded-full h-32 w-32 object-cover"
            />
            <img
              src={team3}
              alt="Team Member 2"
              className="rounded-full h-32 w-32 object-cover"
            />
            <img
              src={team2}
              alt="Team Member 3"
              className="rounded-full h-32 w-32 object-cover"
            />
          </div>
        </div>
      </div>

      <div className="text-center mt-8">
        <h3 className="text-2xl font-bold mb-4">Join Us on the Journey</h3>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div>
            <p className="mb-4 text-justify m-10 ml-0">
              Whether you're here to share your creations, discover new
              perspectives, or simply connect with others who share your
              interests, <span className="font-bold">Snapshots</span> is a space where you can be
              yourself. Join us on this exciting journey, and let's build a
              community that celebrates diversity, creativity, and the joy of
              shared experiences.
            </p>
            {user ? (
              <button className="w-[200px] bg-[#00ADB5] text-white rounded-lg py-1 px-2 font-medium">
                Thanks For Joining !!!
              </button>
            ) : (
              <Link to="/auth">
                <button className="w-[200px] bg-gray-400 text-white rounded-lg py-1 px-2 font-medium cursor-pointer transition-all hover:bg-[#00ADB5]">
                  Join Now
                </button>
              </Link>
            )}
          </div>
          <img
            src={joinTeam}
            alt="join team"
            className="rounded-lg object-cover h-64 w-full mb-8"
          />
        </div>

        <h3 className="text-2xl font-bold mb-2">
          Thank You for Being a Part of Snapshots!
        </h3>
        <p>
          Feel free to personalize the content based on the unique aspects of
          your application and the individuals involved in its development.
        </p>
        <Link to="/contact">
          <button className="mt-5 bg-gray-400 text-white rounded-lg py-1 px-2 font-medium cursor-pointer transition-all hover:bg-[#00ADB5]">
            Send Us a Message
          </button>
        </Link>
      </div>
    </div>
  );
};

export default About;
