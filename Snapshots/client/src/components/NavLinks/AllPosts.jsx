import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useLocation } from "react-router-dom";
import qs from "qs";

import { getPosts } from "../../actions/posts.jsx";
import Post from "../Single_components/Post.jsx";
import { categoryOptions } from "../../constants/index.js";

const AllPosts = ({ setCurrentId }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [filterOption, setFilterOption] = useState("all");

  const location = useLocation();
  const query = qs.parse(location.search, {ignoreQueryPrefix: true});
  const selectedCategory = query.category;

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    if (filterOption === "popular") {
      setFilteredPosts(posts.filter((post) => post.likeCount > 10));
    } else if (filterOption === "recent") {
      setFilteredPosts(
        posts.filter(
          (post) => moment().diff(moment(post.createdAt), "hours") < 5
        )
      );
    } else {
      setFilteredPosts(posts);
    }
  }, [posts, filterOption]);

  useEffect(() => {
    if(selectedCategory) {
      setFilterOption(selectedCategory);
    }
  }, [selectedCategory])

  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
  };

  return (
    <div className="flex flex-col justify-center items-center mb-10">
      <div className="p-4 my-6">
        <label className="mr-2">See posts:</label>
        <select
          value={filterOption}
          onChange={handleFilterChange}
          className="p-2 border border-coral-red rounded-md mr-[10px] border-none outline-none"
        >
          {categoryOptions.map((option) => (
            <option
              value={option.value}
              key={option.label}
              className="bg-white text-[#333] checked:bg-[#ddd] checked:text-[#333]"
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts
          .filter((post) => filterOption === "all" || post.category === filterOption)
          .map((post) => (
            <Post key={post._id} post={post} setCurrentId={setCurrentId} />
        ))}
      </div>
    </div>
  );
};

export default AllPosts;
