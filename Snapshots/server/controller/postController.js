import mongoose from "mongoose";
import { PostModel } from "../model/PostModel.js";
import { UserModel } from "../model/UserModel.js";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.find();
    const postMessages = posts.map((post) => ({
      ...post._doc,
      postCount: posts.filter((p) => p.creator === post.creator).length,
    }));
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags, searchBy } = req.query;

  try {
    let query;
    if (searchBy === "title") {
      const title = new RegExp(searchQuery, "i");
      query = { title };
    } else if (searchBy === "tags") {
      query = { tags: { $in: tags.split(",") } };
    } else {
      query = {};
    }

     console.log('Query:', query);

    const posts = await PostModel.find(query);
    res.json({ data: posts });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  try {
    const user = await UserModel.findById(req.userId);
    const newPost = new PostModel({
      ...post,
      creator: req.userId,
      name: user.name,
      profileImage: user.profileImage,
      userId: user._id,
      createdAt: new Date().toISOString(),
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.log("Error Saving Post:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(`No post with Id: ${id}`);

  const updatedPost = await PostModel.findByIdAndUpdate(
    _id,
    { ...post, _id },
    {
      new: true,
    }
  );
  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with Id: ${id}`);

  await PostModel.findByIdAndDelete(id);
  res.json({ message: "Post deleted Successfully." });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) return res.json({ message: "Unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with Id: ${id}`);

  const post = await PostModel.findById(id);

  const index = post.likes.findIndex((id) => id === String(req.userId));
  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const updatedPost = await PostModel.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatedPost);
};
