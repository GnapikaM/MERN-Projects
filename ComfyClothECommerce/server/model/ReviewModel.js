import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  comment: String,
  reviewImages: [String],
  reviewedAt: {
    type: Date,
    default: Date.now,
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  dislikeCount: {
    type: Number,
    default: 0,
  },
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  dislikedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
});

export const ReviewModel = mongoose.model("Review", reviewSchema);