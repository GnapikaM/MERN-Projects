import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./components/NavLinks/Home";
import About from "./components/NavLinks/About";
import AllPosts from "./components/NavLinks/AllPosts";
import NewPost from "./components/NavLinks/NewPost";
import PopularPosts from "./components/Single_components/PopularPosts";
import Auth from "./components/Auth/Auth";
import ContactUs from "./components/NavLinks/ContactUs";

const PostRoutes = ({ currentId, setCurrentId, user }) => {
  return (
    <Routes>
      <Route path="/" element={<Home setCurrentId={setCurrentId} />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route
        path="/all-posts"
        element={<AllPosts setCurrentId={setCurrentId} />}
      />
      <Route
        path="/new-post"
        element={<NewPost currentId={currentId} setCurrentId={setCurrentId} user={user} />}
      />
      <Route
        path="/popular-posts"
        element={<PopularPosts setCurrentId={setCurrentId} />}
      />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
};

export default PostRoutes;
