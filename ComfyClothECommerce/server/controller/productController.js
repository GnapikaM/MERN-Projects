import { Product } from "../model/ProductModel.js";

export const fetchAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
