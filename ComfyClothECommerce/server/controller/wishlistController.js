import { UserModel } from "../model/UserModel.js";

export const fetchWishlistItems = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await UserModel.findById(userId).populate("wishlist");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.wishlist);
  } catch (error) {
    console.error("Error fetching wishlist items:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addToWishlist = async (req, res) => {
  const { userId } = req.params;
  const { productId } = req.body;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.wishlist.includes(productId)) {
      return res.status(400).json({ message: "Product already in wishlist" });
    }

    user.wishlist.push(productId);
    await user.save();

    res.status(200).json({ message: "Product added to wishlist successfully" });
  } catch (error) {
    console.error("Error adding product to wishlist:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const removeFromWishlist = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const index = user.wishlist.indexOf(productId);
    if (index === -1) {
      return res.status(404).json({ message: "Product not found in wishlist" });
    }

    user.wishlist.splice(index, 1);
    await user.save();

    res
      .status(200)
      .json({ message: "Product removed from wishlist successfully" });
  } catch (error) {
    console.error("Error removing product from wishlist:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
