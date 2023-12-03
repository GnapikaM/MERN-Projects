import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  category: { type: String, required: true },
  place: { type: String, required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  creator: String,
  name: String,
  profileImage: String,
  userId: String,
  tags: { type: [String], required: true },
  selectedFile: { type: String, required: true },
  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export const PostModel = mongoose.model("Post", postSchema);
