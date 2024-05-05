import { Product } from "../model/ProductModel.js";

export const fetchAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (error) {
    console.error("Error fetching products: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateRating = async (req, res) => {
  const { productId } = req.params;
  const { rating } = req.body;
  try {
    const product = await Product.findByIdAndUpdate(productId);
    const roundedRating = parseFloat(rating.toFixed(1));
    product.reviews.averageRating = roundedRating;
    await product.save();
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update rating' });
  }
};