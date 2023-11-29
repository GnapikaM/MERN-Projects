import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getPosts } from "../../actions/posts";
import Post from "./Post";
import moment from "moment";

const RecentPosts = ({ setCurrentId }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const recentThresholdHours = 5;

  const recentPosts = posts.filter(
    (post) =>
      moment().diff(moment(post.createdAt), "hours") < 5
  );

  return (
    <div className="flex flex-col justify-center items-center my-10 max-sm:my-0 max-sm:-mt-9">
      <h2 className="text-[35px] max-sm:text-[30px] font-bold mb-4 text-gray-800">
        Recent Posts
      </h2>
      {recentPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recentPosts.map((post) => (
          <Post key={post._id} post={post} setCurrentId={setCurrentId} />
        ))}
      </div>
      ): (
        <div>
          <p className="text-xl font-mono font-medium flex items-center">No Recent Posts</p>
        </div>
      )}
    </div>
  );
};

export default RecentPosts;
