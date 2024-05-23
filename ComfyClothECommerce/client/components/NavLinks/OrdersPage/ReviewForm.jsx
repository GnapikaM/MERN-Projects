import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useTheme } from "../Theme/ThemeContext";
import { useLocation, useNavigate } from "react-router-dom";
import { addReview } from "../../../actions/ReviewActions";

const ReviewForm = () => {
  const {
    theme,
    notification,
    setNotification,
    notificationMessage,
    setNotificationMessage,
    notificationColor,
    setNotificationColor,
    handleNotificationColor,
    handleTimeout,
  } = useTheme();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    rating: "",
    comment: "",
    reviewImages: null,
  });

  const productId = location.state ? location.state.productId : null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReviewImageChange = (e) => {
    const files = Array.from(e.target.files);
    const promises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises)
      .then((images) => {
        setFormData({ ...formData, reviewImages: images });
      })
      .catch((error) => console.error("Error reading files: ", error));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotification(true);
    setNotificationColor(handleNotificationColor("success"));
    setNotificationMessage("Added a review.");
    handleTimeout();
    dispatch(addReview(productId, formData));
    setFormData({
      name: "",
      rating: "",
      comment: "",
      reviewImages: null,
    });
    navigate("/orders");
  };

  return (
    <div
      className={`${theme === "dark" ? "dark-theme" : "light-theme"}`}
      style={{
        backgroundColor: `var(--body-bg-color)`,
        color: `var(--text-color)`,
        minHeight: "100vh",
      }}
    >
      {notification && (
        <div className="notification-container max-sm:w-full max-sm:text-center">
          <div
            className={`notification ${
              notification ? "notification-visible" : ""
            }`}
            style={{ backgroundColor: notificationColor }}
          >
            {notificationMessage}
          </div>
        </div>
      )}
      <div className="flex justify-center items-center h-full pt-32 pb-16">
        <div className="max-w-lg w-full p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-6">Add a Review</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block font-bold mb-2">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`px-4 py-2 border rounded w-full outline-none ${
                  theme === "dark" ? "border-gray-500" : "border-gray-400"
                }`}
                style={{ backgroundColor: `var(--body-bg-color)` }}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-bold mb-2">Rating:</label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className={`px-4 py-2 border rounded w-full outline-none ${
                  theme === "dark" ? "border-gray-500" : "border-gray-400"
                }`}
                style={{ backgroundColor: `var(--body-bg-color)` }}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-bold mb-2">Comment:</label>
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                className={`px-4 py-2 border rounded w-full outline-none ${
                  theme === "dark" ? "border-gray-500" : "border-gray-400"
                }`}
                style={{
                  backgroundColor: `var(--body-bg-color)`,
                  height: "150px",
                  resize: "none",
                }}
                required
              ></textarea>
            </div>
            <div className="mb-4">
              {!formData.reviewImages ? (
                <>
                  <label className="block font-bold mb-2">Add Image(s):</label>
                  <input
                    type="file"
                    name="reviewImages"
                    onChange={handleReviewImageChange}
                    className="w-full"
                    multiple
                  />
                </>
              ) : (
                <>
                  <label className="block font-bold mb-2">Images:</label>
                  <div className="flex flex-wrap -mx-2">
                    {formData.reviewImages.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Preview ${index}`}
                        className="w-20 h-20 object-cover rounded-lg m-2"
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            <button
              type="submit"
              className="font-bold py-2 px-4 rounded"
              style={{ backgroundColor: `var(--highlight-color)` }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
