import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Home from "./components/NavLinks/Home/Home";
import About from "./components/NavLinks/About/About";
import AllPosts from "./components/NavLinks/AllPosts/AllPosts";
import NewPost from "./components/NavLinks/NewPost/NewPost";
import ContactUs from "./components/NavLinks/ContactUs/ContactUs";
import PopularPosts from "./components/NavLinks/Home/sections/PopularPosts";
import Auth from "./components/Auth/Auth";

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
