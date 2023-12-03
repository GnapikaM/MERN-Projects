import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../../../actions/posts";
import Post from "../../AllPosts/sections/Post";

const PopularPosts = ({ setCurrentId }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const popularPosts = posts.filter((post) => post.likes.length > 10);

  return ( 
    <div className="flex flex-col justify-center items-center my-10">
      <h2 className="text-[35px] font-semibold font-mono my-16">Popular Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {popularPosts.map((post) => (
          <Post key={post._id} post={post} setCurrentId={setCurrentId} />
        ))}
      </div>
    </div>
  );
};

export default PopularPosts;
