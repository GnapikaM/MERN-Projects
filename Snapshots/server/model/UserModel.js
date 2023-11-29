import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  profileImage: String,
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
});

export const UserModel = mongoose.model("User", userSchema);