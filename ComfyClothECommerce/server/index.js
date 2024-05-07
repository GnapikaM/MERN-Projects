import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  dislikeReview,
  fetchReviewsByProductID,
  likeReview,
} from "../../../actions/ReviewActions";
import io from "socket.io-client";

const Reviews = ({ productId }) => {
  const socket = io("http://localhost:3000");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchReviewsByProductID(productId));
    socket.on("reviewCountUpdated", (data) => {
      console.log("Review count updated:", data);
      // Perform any necessary actions based on the updated review counts
    });

    return () => {
      // Clean up WebSocket connection when component unmounts
      socket.disconnect();
    };
  }, [dispatch, productId, socket]);

  const reviews = useSelector((state) => state.ReviewReducer.reviews);
  const authData = useSelector((state) => state.AuthReducer.authData);
  const userId = authData?.result?._id;

  const handleLikeButton = (reviewId) => {
    dispatch(likeReview(userId, reviewId, productId));
    // if (userId) {
    //   dispatch(likeReview(userId, reviewId));
    // }
  };

  const handleDislikeButton = (reviewId) => {
    dispatch(dislikeReview(userId, reviewId, productId));
    // if (userId) {
    //   dispatch(dislikeReview(userId, reviewId));
    // }
  };
  return (
    <div className="mt-4">
      {reviews &&
        Array.isArray(reviews) &&
        reviews.map((review) => (
          <div key={review._id} className="flex mb-4">
            <div className="w-30">
              <p
                className="px-1 rounded font-bold mr-3"
                style={{
                  backgroundColor: `var(--highlight-color)`,
                  color: `var(--text-color)`,
                }}
              >
                {review.rating}
                <span>&#9733;</span>
              </p>
            </div>
            <div className="w-full">
              <p className="leading-5 mb-2">{review.comment}</p>
              {review.reviewImages && (
                <div className="flex gap-4 flex-wrap mb-2">
                  {review.reviewImages?.map((image, index) => (
                    <div className="w-24 h-24" key={index}>
                      <img
                        src={image}
                        className="h-full w-full object-cover rounded"
                        alt=""
                      />
                    </div>
                  ))}
                </div>
              )}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs">
                    {review.name} | {new Date(review.reviewedAt).getDate()}{" "}
                    {new Date(review.reviewedAt)
                      .toLocaleString("en-US", { month: "long" })
                      .slice(0, 3)}{" "}
                    {new Date(review.reviewedAt).getFullYear()}
                  </p>
                </div>
                {authData && (
                  <div
                    className="flex"
                    style={{ color: `var(--highlight-color)` }}
                  >
                    <div
                      className="mr-5 flex items-center cursor-pointer"
                      onClick={() => handleLikeButton(review._id)}
                    >
                      <div className="text-xl mr-1">
                        {review.likedBy.includes(userId) ? (
                          <ion-icon name="thumbs-up"></ion-icon>
                        ) : (
                          <ion-icon name="thumbs-up-outline"></ion-icon>
                        )}
                      </div>
                      <span className="text-sm">{review.likeCount}</span>
                    </div>
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={() => handleDislikeButton(review._id)}
                    >
                      <div className="text-xl mr-1">
                        {review.dislikedBy.includes(userId) ? (
                          <ion-icon name="thumbs-down"></ion-icon>
                        ) : (
                          <ion-icon name="thumbs-down-outline"></ion-icon>
                        )}
                      </div>
                      <span className="text-sm">{review.dislikeCount}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Reviews;
