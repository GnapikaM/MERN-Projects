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

export const removeFromCart = async (req, res) => {
  const { userId, productId } = req.params;
  try {
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: userId },
      { $pull: { cart: { product: productId } } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Product removed from cart successfully" });
  } catch (error) {
    console.error("Error removing product from cart: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const addToCart = async (req, res) => {
  const { userId } = req.params;
  const { product, quantity, size } = req.body;

  try {
    const productId = product?._id;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const existingProductIndex = user.cart.findIndex(
      (item) => String(item.product) === productId
    );
    if (existingProductIndex !== -1) {
      user.cart[existingProductIndex].quantity += quantity;
      user.cart[existingProductIndex].size = size;
    } else {
      user.cart.push({
        product: productId,
        image: product?.images[0],
        name: product?.name,
        company: product?.company,
        price: product?.price,
        origPrice: product?.origPrice,
        discount: product?.discount,
        quantity,
        size,
      });
    }
    await user.save();
    res.status(200).json({ message: "Product added to cart successfully" });
  } catch (error) {
    console.error("Error adding product to cart: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateCartItem = async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity, size } = req.body;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const index = user.cart.findIndex((item) => String(item._id) === productId);
    if (index !== -1) {
      user.cart[index].quantity = quantity;

      user.cart[index].size = size;
      await user.save();
      res.status(200).json({ message: "Cart item updated successfully" });
    } else {
      res.status(404).json({ message: "Cart item not found" });
    }
  } catch (error) {
    console.error("Error updating cart item: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const removeAllFromCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await UserModel.findById(userId);
    console.log("User: ", user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.cart = [];
    console.log("User cart: ", user.cart);
    await user.save();
    res
      .status(200)
      .json({ message: "All products removed from cart successfully." });
  } catch (error) {
    console.error("Error removing all products from cart: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
