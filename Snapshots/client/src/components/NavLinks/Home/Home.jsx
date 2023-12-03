import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getPosts } from "../../../actions/posts";

import Hero from "./sections/Hero";
import Categories from "./sections/Categories";
import PopularContent from "./sections/PopularContent";
import RecentPosts from "./sections/RecentPosts";
import Reviews from "./sections/Reviews";
import AboutUs from "./sections/AboutUs";
import CTA from "./sections/CTA";
import Socialmedia from "./sections/Socialmedia";
import Footer from "./sections/Footer";

const Home = ({ setCurrentId }) => {
  const dispatch = useDispatch();
  const creators = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const popularCreators =
    creators && creators.length > 0
      ? [...creators]
          .sort((a, b) => b.followerCount - a.followerCount)
          .slice(0, 5)
      : [];

  return (
    <div>
      <section className="hero w-full h-full">
        <Hero />
      </section>

      <section className="mb-20">
        <AboutUs />
      </section>

      <section className="text-center">
        <Categories />
      </section>

      <section className="text-center py-8">
        <PopularContent />
      </section>

      <section className="text-center py-8">
        <RecentPosts setCurrentId={setCurrentId} />
      </section>

      <section>
        <Reviews />
      </section>

      <section>
        <CTA />
      </section>

      <section>
        <Socialmedia />
      </section>

      <section>
        <Footer />
      </section>
    </div>
  );
};

export default Home;
