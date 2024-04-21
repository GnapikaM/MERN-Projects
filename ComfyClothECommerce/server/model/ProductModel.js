import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: Number,
  category: String,
  company: String,
  name: String,
  color: [String],
  price: Number,
  origPrice: Number,
  discount: Number,
  rating: Number,
  reviews: String,
  quantity: Number,
  productType: [String],
  img1: String,
  img2: String,
  img3: String,
});

export const Product = mongoose.model("Product", productSchema);