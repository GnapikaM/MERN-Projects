import mongoose from "mongoose";

const productSchema = new mongoose.Schema();

export const Product = mongoose.model("Product", productSchema);

// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema({
//   id: Number,
//   category: String,
//   company: String,
//   name: String,
//   color: [String],
//   price: Number,
//   origPrice: Number,
//   discount: Number,
//   reviews: {
//     averageRating: Number,
//     totalReviews: Number,
//     sampleReview: String,
//   },
//   quantity: Number,
//   productType: [String],
//   images: [String],
// });

// export const Product = mongoose.model("Product", productSchema);

// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema({
//   id: Number,
//   category: String,
//   company: String,
//   name: String,
//   price: Number,
//   origPrice: Number,
//   discount: Number,
//   reviews: {
//     averageRating: Number,
//     totalReviews: Number,
//     sampleReview: String,
//   },
//   productType: [String],
//   color: [String],
//   availableColors: [String],
//   quantity: Number,
//   description: String,
//   features: [String],
//   material: String,
//   careInstructions: String,
//   sizeGuide: {
//     Small: String,
//     Medium: String,
//     Large: String,
//     'X-Large': String,
//   },
//   fit: String,
//   shipping: {
//     estimatedDelivery: String,
//     options: {
//       standard: { cost: Number, threshold: Number },
//       express: { cost: Number },
//     },
//   },
//   relatedProducts: [String],
//   availability: {
//     inStock: Boolean,
//     outOfStock: Object,
//   },
//   specifications: {
//     weight: String,
//     additionalFeatures: [String],
//   },
//   returnPolicy: {
//     returns: String,
//     exchanges: String,
//     shippingCosts: String,
//   },
//   images: [String],
// });

// export const Product = mongoose.model("Product", productSchema);
