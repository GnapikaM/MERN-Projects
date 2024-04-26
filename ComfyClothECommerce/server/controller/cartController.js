import { UserModel } from "../model/UserModel.js";

export const fetchCartItems = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await UserModel.findById(userId).populate("cart");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.cart);
  } catch (error) {
    console.error("Error fetching Cart Items: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addToCart = async (req, res) => {
  const { userId } = req.params;
  const { productId } = req.body;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.cart.includes(productId)) {
      return res.status(400).json({ message: "Product already in cart" });
    }
    user.cart.push(productId);
    await user.save();
    res.status(200).json({ message: "Product added to cart successfully" });
  } catch (error) {
    console.error("Error adding product to cart: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// export const removeFromCart = async (req, res) => {
//   const { userId, productId } = req.params;
//   try {
//     const user = await UserModel.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     const index = user.cart.indexOf(productId);
//     console.log("Index of cart product: ", index);
//     if (index === -1) {
//       return res.status(404).json({ message: "Product not found in cart" });
//     }
//     user.cart.splice(index, 1);
//     await user.save();

//     res.status(200).json({ message: "Product remove from cart successfully" });
//   } catch (error) {
//     console.error("Error removing product from cart: ", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

export const removeFromCart = async (req, res) => {
  const { userId, productId } = req.params;
  try {
    const user = await UserModel.findOneAndUpdate(
      { _id: userId },
      { $pull: { cart: productId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Product removed from cart successfully" });
  } catch (error) {
    console.error("Error removing product from cart: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const removeAllFromCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.cart = [];
    await user.save();
    res
      .status(200)
      .json({ message: "All products removed from cart successfully." });
  } catch (error) {
    console.error("Error removing all products from cart: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
