import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { useDispatch } from "react-redux";

import Navbar from "./components/Navbar/Navbar";
import PostRoutes from "./PostRoutes";
import { getPosts } from "./actions/posts";

const App = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Router>
      <Navbar />
      <PostRoutes currentId={currentId} setCurrentId={setCurrentId} />
    </Router>
  );
};

export default App;