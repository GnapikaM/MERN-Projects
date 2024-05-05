// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     // required: true,
//   },
//   cartItems: [
//     {
//       product: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Product",
//         // required: true,
//       },
//       quantity: {
//         type: Number,
//         // required: true,
//       },
//       size: {
//         type: String,
//         // required: true,
//       },
//       price: {
//         type: Number,
//         // required: true,
//       },
//     },
//   ],
//   totalAmount: {
//     type: Number,
//     // required: true,
//   },
//   selectedAddress: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Address",
//     // required: true,
//   },
//   paymentMethod: {
//     type: String,
//     enum: ["creditCard", "paypal", "bankTransfer"],
//     // required: true,
//   },
//   paymentDetails: {
//     type: {
//       cardNumber: String,
//       CVV: Number,
//       expiryDate: String,
//       cardHolder: String,
//     },
//     // required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// export const OrderModel = mongoose.model("Order", orderSchema);

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    customerNumber: {
      type: Number,
      required: true,
    },
    customerEmail: {
      type: String,
      required: true,
    }
  },
  cartItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      productImage: {
        type: String,
        required: true,
      },
      productName: {
        type: String,
        required: true,
      },
      productCompany: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      size: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  amount: {
    type: Number,
    required: true,
  },
  shipping: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  selectedAddress: {
    type: {
        name: String,
        phone: Number,
        street: String,
        city: String,
        state: String,
        zip: Number,
    },
    ref: "Address",
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["creditCard", "paypal", "bankTransfer"],
    required: true,
  },
  paymentDetails: {
    type: {
      cardNumber: String,
      expiryDate: String,
      cardHolder: String,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const OrderModel = mongoose.model("Order", orderSchema);
