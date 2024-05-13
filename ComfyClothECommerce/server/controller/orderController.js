import { AddressModel } from "../model/AddressModel.js";
import { OrderModel } from "../model/OrderModel.js";
import { UserModel } from "../model/UserModel.js";

export const getAllOrders = async (req, res) => {
  try {
    const { customerId } = req.params;
    const orders = await OrderModel.find();
    // const orders = await OrderModel.find({ "user.customerId": customerId});
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// export const createOrder = async (req, res) => {
//   try {
//     const {
//       userId,
//       userName,
//       userPhone,
//       userEmail,
//       selectedAddress,
//       paymentMethod,
//       paymentDetails,
//       productsInfo,
//     } = req.body;

//     console.log("Product Info: ", productsInfo);

//     const user = await UserModel.findById(userId);
//     const address = await AddressModel.findById(selectedAddress);

//     const cartItems = user.cart;

//     console.log("Cart Items: ", cartItems);

//     const amount = productsInfo.reduce((total, item) => {
//       return total + (item.productPrice * item.productQuantity || 0);
//     }, 0);

//     let shipping = 0;
//     if (amount < 3000) {
//       shipping = 70;
//     }

//     const totalAmount = amount + shipping;

//     const newOrder = new OrderModel({
//       user: {
//         customerId: userId,
//         customerName: userName,
//         customerNumber: userPhone,
//         customerEmail: userEmail,
//       },
//       cartItems: cartItems
//         .map((item) => {
//           const productInfo = productsInfo.find((info) => {
//             return info.productId === item._id.toString();
//           });
//           if (productInfo) {
//             return {
//               product: item._id,
//               productImage: productInfo.productImage,
//               productCompany: productInfo.productCompany,
//               productName: productInfo.productName,
//               quantity: productInfo.productQuantity,
//               size: productInfo.productSize,
//               price: productInfo.productPrice,
//             };
//           } else {
//             return null;
//           }
//         })
//         .filter((item) => item !== null),
//       amount,
//       shipping,
//       totalAmount,
//       selectedAddress: {
//         name: address.name,
//         phone: address.phone,
//         street: address.street,
//         city: address.city,
//         state: address.state,
//         zip: address.zip,
//       },
//       paymentMethod,
//       paymentDetails,
//     });

//     console.log("New Order: ", newOrder);

//     await newOrder.save();
//     await UserModel.findByIdAndUpdate(userId, { $set: { cart: [] } });

//     res
//       .status(201)
//       .json({ message: "Order created successfully", order: newOrder });
//   } catch (error) {
//     console.error("Error creating order:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };


export const createOrder = async (req, res) => {
  try {
    const {
      userId,
      userName,
      userPhone,
      userEmail,
      selectedAddress,
      paymentMethod,
      paymentDetails,
      productsInfo,
    } = req.body;

    console.log("Product Info: ", productsInfo);

    const user = await UserModel.findById(userId);
    const address = await AddressModel.findById(selectedAddress);

    const cartItems = user.cart;

    console.log("Cart Items: ", cartItems);

    const amount = productsInfo.reduce((total, item) => {
      return total + (item.productPrice * item.productQuantity || 0);
    }, 0);

    let shipping = 0;
    if (amount < 3000) {
      shipping = 70;
    }

    const totalAmount = amount + shipping;

    const newCartItems = cartItems.map((item) => {
      const productInfo = productsInfo.find((info) => {
        return info.productId === item.product.toString();
      });
      if (productInfo) {
        return {
          product: item.product,
          productImage: productInfo.productImage,
          productCompany: productInfo.productCompany,
          productName: productInfo.productName,
          quantity: item.quantity,
          size: item.size,
          price: item.price,
        };
      } else {
        return null;
      }
    }).filter((item) => item !== null);

    const newOrder = new OrderModel({
      user: {
        customerId: userId,
        customerName: userName,
        customerNumber: userPhone,
        customerEmail: userEmail,
      },
      cartItems: newCartItems,
      amount,
      shipping,
      totalAmount,
      selectedAddress: {
        name: address.name,
        phone: address.phone,
        street: address.street,
        city: address.city,
        state: address.state,
        zip: address.zip,
      },
      paymentMethod,
      paymentDetails,
    });

    console.log("New Order: ", newOrder);

    await newOrder.save();
    await UserModel.findByIdAndUpdate(userId, { $set: { cart: [] } });

    res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
