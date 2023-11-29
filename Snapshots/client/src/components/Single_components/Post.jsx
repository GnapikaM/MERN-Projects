import React, { useState, useEffect } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaFire, FaClock } from "react-icons/fa";

import { deletePost, likePost } from "../../actions/posts.jsx";
import { userImage } from "../../assets/images/index.js";

const post = ({ post, setCurrentId }) => {
  const [showFullMessage, setShowFullMessage] = useState(false);
  const [buttonsUDVisible, setButtonsUDVisible] = useState(false);
  const [notification, setNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("profile"));

  const IsLiked = () => {
    const isLikedByUser = post.likes.find((like) => like === user?.result?._id);
    return (
      <div
        className={`text-3xl ${isLikedByUser ? "text-red-500" : "text-white"}`}
      >
        <ion-icon name="heart" />
      </div>
    );
  };

  const LikeCount = () => {
    const likeCount = post.likes.length;
    const isLikedByUser = post.likes.find((like) => like === user?.result?._id);
    if (likeCount > 0) {
      return isLikedByUser ? (
        <span className="flex items-center">
          <ion-icon name="heart" />
          <span className="text-sm font-medium ml-1">
            {likeCount > 2
              ? `You and ${likeCount - 1} others`
              : `${likeCount} Like${likeCount > 1 ? "s" : ""}`}
          </span>
        </span>
      ) : (
        <span className="text-sm font-medium">
          {likeCount} {likeCount === 1 ? "Like" : "Likes"}
        </span>
      );
    }
    return <span className="text-sm font-medium">0 Likes</span>;
  };

  const messageToShow = showFullMessage
    ? post.message
    : post.message.length > 20
    ? post.message.split(" ").slice(0, 20).join(" ") + "....."
    : post.message;

  const toggleMessageVisibility = () => {
    setShowFullMessage(!showFullMessage);
  };

  const handleUpdateDeleteBtnVisibility = () => {
    setButtonsUDVisible(!buttonsUDVisible);
  };

  const handleUpdateClick = () => {
    setCurrentId(post._id);
    navigate("/new-post");
  };

  const handleDeleteClick = () => {
    dispatch(deletePost(post._id));
  };

  const handleShareClick = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: post.title,
          text: post.message,
          url: window.location.href,
        });
      } else {
        setNotification(!notification);
        setNotificationMessage("Web Share API not supported.")
        // throw new Error("Web Share API not supported.");
      }
    } catch (error) {
      setNotification(!notification);
      setNotificationMessage("Error Sharing.")
      console.error("Error sharing:", error.message);
      alert(`Share post: ${post.title}\n${post.message}`);
    }
  };

  const isPopular = post.likeCount > 10;
  const isRecent = moment().diff(moment(post.createdAt), "hours") < 5;

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-md bg-white">
      {notification && (
        <div className="bg-green-500 text-white py-2 px-4 text-xl font-semibold font-mono rounded shadow-md absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {notificationMessage}
        </div>
      )}

      <div className="mb-5">
        <div className="px-2">
          <p className="font-bold">Posted By:</p>
        </div>
        <div className="flex items-center py-1 px-2 relative mt-3">
          <div className="w-[40px] h-[40px] rounded-full">
            <img
              src={post.profileImage || userImage}
              alt="creator image"
              className="h-full w-full rounded-full object-cover"
            />
          </div>
          <div className="px-2">
            <p className="font-semibold text-base">{post.name}</p>
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="h-[200px]">
          <img
            src={post.selectedFile}
            alt={post.title}
            className="w-full h-full relative object-cover"
          />
        </div>
        <div className="flex items-center absolute top-0 left-0 p-2 bg-purple-900 text-white font-bold rounded-br">
          {post.category}
          <div className="pl-2 text-[#ff4500]">
            {isPopular && <FaFire className="popular-icon" />}
          </div>
          <div className="pl-2 text-[#4169e1]">
            {isRecent && <FaClock className="recent-icon" />}
          </div>
        </div>
        <p className="absolute bottom-0 left-0 p-2 bg-purple-900 text-white font-bold rounded-tr">
          Posted {moment(post.createdAt).fromNow()}
        </p>
        <div>
          <button
            className="absolute top-2 right-2 rounded-full h-10 w-10 bg-purple-900"
            disabled={!user?.result}
            onClick={() => {
              dispatch(likePost(post._id));
            }}
          >
            <IsLiked />
          </button>
          <div
            className="absolute top-14 right-2 rounded-full h-10 w-10 bg-purple-900 hover:bg-white text-white hover:text-blue-500 cursor-pointer text-3xl flex items-center justify-center"
            onClick={handleShareClick}
          >
            <ion-icon name="arrow-redo"></ion-icon>
          </div>
          <div className="absolute bottom-2 right-2 rounded-full h-10 w-10 bg-purple-900 text-white cursor-pointer text-3xl flex items-center justify-center">
            <div onClick={handleUpdateDeleteBtnVisibility}>
              <p className="absolute -top-[14px] right-2 font-bold">...</p>
            </div>
            {buttonsUDVisible && (
              <div>
                {user?.result?._id === post?.creator && (
                  <button
                    className="absolute right-11 top-0 bg-purple-900 h-10 w-10 flex items-center justify-center rounded-full hover:text-blue-500"
                    onClick={handleUpdateClick}
                  >
                    <ion-icon name="create"></ion-icon>
                  </button>
                )}
                {user?.result?._id === post?.creator && (
                  <button
                    className="absolute right-[5.5rem] top-0 bg-purple-900 h-10 w-10 flex items-center justify-center rounded-full hover:text-red-500"
                    onClick={handleDeleteClick}
                  >
                    <ion-icon name="trash"></ion-icon>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <p className="font-bold text-2xl m-2">{post.title}</p>
        <div className="px-2">
          <p className="text-sm text-justify text-gray-500">
            {messageToShow}
            {post.message.length > 20 && (
              <span
                className="cursor-pointer text-[#222831] font-medium pl-2 hover:underline"
                onClick={toggleMessageVisibility}
              >
                {showFullMessage ? "See Less" : "See More"}
              </span>
            )}
          </p>
        </div>
        <div className="py-3 px-2">
          <p className="text-sm text-justify text-gray-500">
            {post.tags.map((tag) => `#${tag} `)}
          </p>
        </div>
        <p className="ml-2">
          <LikeCount />
        </p>
      </div>
    </div>
  );
};

export default post;
