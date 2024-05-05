import { ReviewModel } from "../model/ReviewModel.js";
import mongoose from "mongoose";

export const getReviewsByProductId = async (req, res) => {
  try {
    const productId = req.params.productId;
    const reviews = await ReviewModel.find({ productId });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addReview = async (req, res) => {
  try {
    const { name, rating, comment, reviewImages } = req.body;
    const productId = req.params.productId;
    const review = new ReviewModel({
      name,
      rating,
      comment,
      reviewImages,
      productId,
    });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// export const likeReview = async (req, res) => {
//   const { reviewId } = req.params;
//   const userId = req.userId;
  
//   try {
//     const review = await ReviewModel.findById(reviewId);
//     if (!review) {
//       return res.status(404).json({ message: "Review not found" });
//     }

//     // Check if the user has already disliked this review
//     if (review.dislikedBy.includes(userId)) {
//       // Remove user from dislikedBy array and decrement dislikeCount
//       review.dislikedBy = review.dislikedBy.filter(id => id !== userId);
//       review.dislikeCount -= 1;
//     }

//     // Check if the user has already liked this review
//     if (review.likedBy.includes(userId)) {
//       return res.status(400).json({ message: "You have already liked this review" });
//     }

//     // Update the review document
//     review.likeCount += 1;
//     review.likedBy.push(userId);
//     await review.save();

//     res.status(200).json({ message: "Review liked successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// export const dislikeReview = async (req, res) => {
//   const userId = req.userId;
//   const { reviewId } = req.params;

//   try {
//     const review = await ReviewModel.findById(reviewId);
//     if (!review) {
//       return res.status(404).json({ message: "Review not found" });
//     }

//     // Check if the user has already liked this review
//     if (review.likedBy.includes(userId)) {
//       // Remove user from likedBy array and decrement likeCount
//       review.likedBy = review.likedBy.filter(id => id !== userId);
//       review.likeCount -= 1;
//     }

//     // Check if the user has already disliked this review
//     if (review.dislikedBy.includes(userId)) {
//       return res.status(400).json({ message: "You have already disliked this review" });
//     }

//     // Update the review document
//     review.dislikeCount += 1;
//     review.dislikedBy.push(userId);
//     await review.save();

//     res.status(200).json({ message: "Review disliked successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

export const likeReview = async (req, res) => {
  const { reviewId } = req.params;
  const userId = req.userId;

  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    return res.status(400).json({ message: "Invalid review ID" });
  }

  try {
    const review = await ReviewModel.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    if (review.likedBy.includes(userId)) {
      review.likeCount -= 1;
      const index = review.likedBy.indexOf(userId);
      review.likedBy.splice(index, 1);
    } else {
      const dislikedIndex = review.dislikedBy.indexOf(userId);
      if (dislikedIndex !== -1) {
        review.dislikeCount -= 1;
        review.dislikedBy.splice(dislikedIndex, 1);
      }
      review.likeCount += 1;
      review.likedBy.push(userId);
    }

    await review.save();

    res.status(200).json({ message: "Review liked successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const dislikeReview = async (req, res) => {
  const userId = req.userId;
  const { reviewId } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    return res.status(400).json({ message: "Invalid review ID" });
  }
  try {
    const review = await ReviewModel.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    if (review.dislikedBy.includes(userId)) {
      review.dislikeCount -= 1;
      const index = review.dislikedBy.indexOf(userId);
      review.dislikedBy.splice(index, 1);
    } else {
      const likedIndex = review.likedBy.indexOf(userId);
      if (likedIndex !== -1) {
        review.likeCount -= 1;
        review.likedBy.splice(likedIndex, 1);
      }
      review.dislikeCount += 1;
      review.dislikedBy.push(userId);
    }
    await review.save();
    res.status(200).json({ message: "Review disliked successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
