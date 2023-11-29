import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getPosts } from "../../actions/posts";

import Hero from "../Single_components/Hero";
import Categories from "../Single_components/Categories";
import PopularContent from "../Single_components/PopularContent";
import RecentPosts from "../Single_components/RecentPosts";
import Reviews from "../Single_components/Reviews";
import AboutUs from "../Single_components/AboutUs";
import CTA from "../Single_components/CTA";
import Socialmedia from "../Single_components/Socialmedia";
import Footer from "../Single_components/Footer";

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
