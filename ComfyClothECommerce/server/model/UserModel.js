// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   phone: {type: Number, required: true},
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
//   wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
// });

// export const UserModel = mongoose.model("User", userSchema);

import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  image: { type: String },
  name: { type: String },
  company: { type: String },
  price: { type: Number },
  origPrice: { type: Number },
  discount: { type: Number },
  quantity: { type: Number, default: 1 },
  size: { type: String, default: "XS" },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cart: [cartItemSchema], // Updated to store cart items with quantity and size
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

export const UserModel = mongoose.model("User", userSchema);
