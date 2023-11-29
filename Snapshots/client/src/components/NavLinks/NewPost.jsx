import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createPost, updatePost } from "../../actions/posts";
import { padlock } from "../../assets/images";

const NewPost = ({ currentId, setCurrentId }) => {
  const [notification, setNotification] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [postData, setPostData] = useState({
    category: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: null,
    creator: "",
  });
  const post = useSelector((state) =>
    currentId ? state.posts.find((message) => message._id === currentId) : null
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (e.target.name === "selectedFile") {
          setPostData({ ...postData, selectedFile: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitButton = async (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
      setNotification(!notification);
      setNotificationMessage("You edited a Post");
      navigate("/all-posts");
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
      setNotification(!notification);
      setNotificationMessage("You added a new Post");
    }
    handleButtonClear();

    setTimeout(() => {
      setNotification(false);
    }, 3000);
  };

  if (!user?.result?.name) {
    return (
      <div className="h-[86vh] text-xl bg-hero-before flex flex-col items-center justify-center text-gray-300">
        <img src={padlock} alt="padlock-image" width={70} />
        <h4 className="mt-5 w-full text-center leading-8">
          You must be logged in to view this page.
        </h4>
      </div>
    );
  }

  const handleInputChange = (e, field) => {
    setPostData({ ...postData, [field]: e.target.value });
  };

  const handleTagInputChange = (e, field) => {
    setPostData({ ...postData, [field]: e.target.value.split(",") });
  };

  const handleButtonClear = () => {
    setCurrentId(0);
    setPostData({
      category: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: null,
      creator: "",
    });
  };

  const handleClearSelection = (field) => {
    setPostData({ ...postData, [field]: null });
  };

  return (
    <div className="relative flex flex-col items-center justify-center my-10">
      {notification && (
        <div className="bg-green-500 text-white py-2 px-4 text-xl font-semibold font-mono rounded shadow-md absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {notificationMessage}
        </div>
      )}

      <form
        className="flex flex-col justify-center bg-[#393E46] text-white rounded-xl p-5"
        onSubmit={handleSubmitButton}
      >
        <div>
          <h1 className="text-center font-bold text-3xl mb-6 font-palanquin">
            {currentId ? "Editing a " : "Add new "} Post
          </h1>
        </div>
        <label htmlFor="category" className="relative flex items-center">
          <p className="w-24 px-2 py-3 font-semibold absolute left-[1px] text-white rounded bg-[#393E46] text-lg text-right">
            Category:
          </p>
          <input
            type="text"
            name="category"
            placeholder="E.g., Recipe"
            value={postData.category}
            onChange={(e) => handleInputChange(e, "category")}
            className="w-full outline-none my-1 p-3 text-black rounded pl-[105px]"
          />
        </label>
        <label htmlFor="title" className="relative flex items-center">
          <p className="w-24 px-2 py-3 font-semibold absolute left-[1px] text-white rounded bg-[#393E46] text-lg text-right">
            Title:
          </p>
          <input
            type="text"
            name="title"
            placeholder="E.g., Pasta"
            value={postData.title}
            onChange={(e) => handleInputChange(e, "title")}
            className="w-full outline-none my-1 p-3 text-black rounded pl-[105px]"
          />
        </label>
        <label htmlFor="message" className="relative flex items-center">
          <p className="w-24 px-2 py-6 font-semibold absolute left-[1px] text-white rounded bg-[#393E46] text-lg text-right">
            Message:
          </p>
          <textarea
            name="message"
            id="message"
            type="text"
            placeholder="Type Someting..."
            rows="2"
            value={postData.message}
            onChange={(e) => handleInputChange(e, "message")}
            className="w-full outline-none my-1 p-3 text-black rounded pl-[105px]"
          />
        </label>
        <label htmlFor="tags" className="relative flex items-center">
          <p className="w-24 px-2 py-3 font-semibold absolute left-[1px] text-white rounded bg-[#393E46] text-lg text-right">
            Tags:
          </p>
          <input
            type="text"
            name="tags"
            placeholder="E.g., Food"
            value={postData.tags}
            onChange={(e) => handleTagInputChange(e, "tags")}
            className="w-full outline-none my-1 p-3 text-black rounded pl-[105px]"
          />
        </label>
        <div>
          {!postData.selectedFile ? (
            <label htmlFor="selectedFile" className="flex items-center">
              <p className="w-24 font-semibold text-right">Post Image:</p>
              <input
                type="file"
                name="selectedFile"
                className="outline-none border-none my-2 ml-2 w-24"
                onChange={handleFileChange}
              />
            </label>
          ) : (
            <div className="flex items-center space-x-2 mt-4">
              <div className="flex items-center">
                <p className="w-24 font-semibold">Post Image:</p>
                <div className="flex flex-col">
                  <img
                    src={postData.selectedFile}
                    alt="Preview"
                    className="h-16 w-16 object-cover rounded-md my-2"
                  />
                  <button
                    className="bg-white text-[#393E46] p-1 rounded hover:scale-105 hover:transition-all font-medium"
                    onClick={() => handleClearSelection("selectedFile")}
                  >
                    Clear Selection
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="bg-white text-[#393E46] p-1 mt-4 mb-2 font-semibold uppercase rounded"
        >
          Submit
        </button>
        <button
          type="button"
          className="bg-white text-[#393E46] p-1 font-semibold uppercase rounded"
          onClick={handleButtonClear}
        >
          Clear
        </button>
      </form>
    </div>
  );
};

export default NewPost;
