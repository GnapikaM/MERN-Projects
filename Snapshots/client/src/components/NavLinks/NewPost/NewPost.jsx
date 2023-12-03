import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createPost, updatePost } from "../../../actions/posts";
import { padlock } from "../../../assets/images";
import { categoryOptions } from "../../../constants";

const NewPost = ({ currentId, setCurrentId }) => {
  const [notification, setNotification] = useState(false);
  const [category, setCategory] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [postData, setPostData] = useState({
    category: "",
    title: "",
    place: "",
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
      <div className="h-[100vh] text-xl bg-hero-before flex flex-col items-center justify-center text-gray-300">
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
      place: "",
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
    <div className="bg-bg2 px-4 pt-20 bg-no-repeat bg-cover flex flex-col items-center justify-center h-[120vh]">
      {notification && (
        <div className="bg-[#00ADB5] text-white py-2 px-4 text-xl font-semibold rounded shadow-md absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {notificationMessage}
        </div>
      )}

      <form onSubmit={handleSubmitButton}>
        <div className="grid">
          <h1 className="text-center font-bold text-3xl mb-6 font-palanquin">
            {currentId ? "Editing a " : "Add new "} Post
          </h1>
        </div>
        <div className="flex mb-2 items-center max-sm:flex-col max-sm:items-start">
          <div className="w-1/4 mr-2 font-semibold text-base max-sm:w-full text-white">
            <label htmlFor="">Category: </label>
          </div>
          <input
            type="text"
            name="firstName"
            placeholder="Select"
            value={(postData.category = category)}
            onChange={(e) => handleInputChange(e, "category")}
            className="outline-none p-2 w-3/4 max-sm:w-full my-1"
            required
            autoFocus
          />
        </div>
        <div className="flex justify-around my-2 text-white">
          {categoryOptions.map((category) => (
            <p
              key={category.option}
              className="border-[1px] rounded-full px-2 py-1 cursor-pointer"
              onClick={() => setCategory(category.option)}
            >
              {category.option}
            </p>
          ))}
        </div>
        <div className="flex mb-2 items-center max-sm:flex-col max-sm:items-start text-white">
          <div className="w-1/4 mr-2 font-semibold text-base max-sm:w-full">
            <label htmlFor="">Place: </label>
          </div>
          <input
            type="text"
            name="place"
            placeholder="E.g., India"
            value={postData.place}
            onChange={(e) => handleInputChange(e, "place")}
            className="outline-none p-2 w-3/4 max-sm:w-full my-1"
            required
          />
        </div>
        <div className="flex mb-2 items-center max-sm:flex-col max-sm:items-start">
          <div className="w-1/4 mr-2 font-semibold text-base max-sm:w-full text-white">
            <label htmlFor="">Title: </label>
          </div>
          <input
            type="text"
            name="title"
            placeholder="E.g., Sri Venkateshware Temple"
            value={postData.title}
            onChange={(e) => handleInputChange(e, "title")}
            className="outline-none p-2 w-3/4 max-sm:w-full my-1"
            required
          />
        </div>
        <div className="flex mb-2 items-center max-sm:flex-col max-sm:items-start">
          <div className="w-1/4 mr-2 font-semibold text-base max-sm:w-full text-white">
            <label htmlFor="">Message: </label>
          </div>
          <textarea
            type="text"
            name="message"
            id="message"
            placeholder="Type Someting..."
            rows="2"
            value={postData.message}
            onChange={(e) => handleInputChange(e, "message")}
            className="outline-none p-2 w-3/4 max-sm:w-full my-1"
            required
          />
        </div>
        <div className="flex mb-2 items-center max-sm:flex-col max-sm:items-start">
          <div className="w-1/4 mr-2 font-semibold text-base max-sm:w-full text-white">
            <label htmlFor="">Tags: </label>
          </div>
          <input
            type="text"
            name="tags"
            placeholder="E.g., Travel,Tourism"
            value={postData.tags}
            onChange={(e) => handleTagInputChange(e, "tags")}
            className="outline-none p-2 w-3/4 max-sm:w-full my-1"
            required
          />
        </div>
        <div>
          {!postData.selectedFile ? (
            <div className="flex mb-2 items-center max-sm:flex-col max-sm:items-start">
              <div className="w-1/4 mr-2 font-semibold text-base max-sm:w-full text-white">
                <label htmlFor="">Post Image: </label>
              </div>
              <input
                type="file"
                name="selectedFile"
                onChange={handleFileChange}
                className="outline-none p-2 w-3/4 max-sm:w-full my-1"
                required
              />
            </div>
          ) : (
            <div className="flex items-center space-x-2 mt-4">
              <div className="flex items-center mr-2 font-semibold text-base max-sm:w-full">
                <label htmlFor="">Post Image: </label>
                <img
                  src={postData.selectedFile}
                  alt="preview"
                  className="h-16 w-16 object-cover rounded-md m-2"
                />
                <button
                  className="ml-2 bg-white text-[#393E46] p-1 rounded hover:scale-105 hover:transition-all font-medium"
                  onClick={() => handleClearSelection("selectedFile")}
                >
                  Clear Selection
                </button>
              </div>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-white text-[#393E46] w-full p-1 mt-4 mb-2 font-semibold uppercase rounded"
        >
          Submit
        </button>
        <button
          type="button"
          className="bg-white text-[#393E46] w-full p-1 font-semibold uppercase rounded"
          onClick={handleButtonClear}
        >
          Clear
        </button>
      </form>
    </div>
  );
};

export default NewPost;
