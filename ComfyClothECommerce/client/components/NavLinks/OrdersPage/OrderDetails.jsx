import React, { useState, useEffect } from "react";
import { useTheme } from "../Theme/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchOrders } from "../../../actions/OrderActions";
import { fetchProducts } from "../../../actions/ProductActions";

const OrderDetails = () => {
  const { theme } = useTheme();
  const { orderId, itemId } = useParams();
  const dispatch = useDispatch();

  const authData = useSelector((state) => state.AuthReducer.authData);
  const userId = authData?.result?._id;

  useEffect(() => {
    dispatch(fetchOrders(userId));
    dispatch(fetchProducts());
  }, [dispatch, userId]);

  const orders = useSelector((state) => state.OrderReducer.orders);
  const products = useSelector((state) => state.ProductReducer.products);

  const product = products.find((product) => product._id === itemId);

  const customerOrders = orders.filter(
    (order) => order?.user?.customerId === userId
  );

  const selectedOrderDetails = customerOrders.find(
    (order) => order._id === orderId
  );

  const orderedItem = selectedOrderDetails?.cartItems.find(
    (item) => item.product === itemId
  );

  const otherItems = selectedOrderDetails?.cartItems.filter(
    (item) => item.product !== itemId
  );

  const timeStamp = selectedOrderDetails?.createdAt;
  const address = selectedOrderDetails?.selectedAddress;
  const paymentMethod = selectedOrderDetails?.paymentMethod;
  const cardNumber = selectedOrderDetails?.paymentDetails?.cardNumber;
  const totalOrderPrice = selectedOrderDetails?.totalAmount;

  const maskedNumber =
    "X".repeat(Math.max(0, String(cardNumber).length - 4)) +
    String(cardNumber).slice(-4);

  return (
    <div
      className={`${theme === "dark" ? "dark-theme" : "light-theme"}`}
      style={{
        backgroundColor: `var(--body-bg-color)`,
        color: `var(--text-color)`,
        minHeight: "100vh",
      }}
    >
      <div className="pt-32 pb-16 max-[550px]:pt-36 max-[550px]:mx-3 flex flex-col items-center justify-center">
        <div
          className={`w-[600px] mb-5 max-sm:w-full flex flex-col items-center pt-16 ${
            theme === "dark" ? "bg-gray-600" : "bg-gray-100"
          }`}
        >
          <img src={orderedItem?.productImage} alt="" className="w-28 mb-3" />
          <h2 className="font-bold mb-1">{orderedItem?.productCompany}</h2>
          <p className="text-sm mb-1">{orderedItem?.productName}</p>
          <p className="text-sm mb-3">Size: {orderedItem?.size}</p>
          <div className="w-full bg-emerald-600 px-4 py-2 text-white flex">
            <div className="text-2xl">
              <ion-icon name="cube"></ion-icon>
            </div>
            <div className="flex flex-col ml-3">
              <p className="font-bold">Delivered</p>
              <p className="text-xs">
                On{" "}
                <span>
                  {new Date(timeStamp)
                    .toLocaleDateString("en-US", {
                      weekday: "long",
                    })
                    .slice(0, 3)}
                </span>
                , <span>{new Date(timeStamp).getDate()}</span>{" "}
                <span>
                  {new Date(timeStamp)
                    .toLocaleString("en-US", { month: "long" })
                    .slice(0, 3)}
                </span>{" "}
                <span>{new Date(timeStamp).getFullYear()}</span>
              </p>
            </div>
          </div>
          <div className="mt-5 flex items-center mb-5">
            <div
              className="border mr-10 max-sm:mr-3 p-1 px-4 rounded-full flex items-center font-bold hover:opacity-50"
              style={{ borderColor: `var(--gray-color)` }}
            >
              <div className="text-xl pt-2">
                <ion-icon name="swap-horizontal"></ion-icon>
              </div>
              <button>Return</button>
            </div>
            <div
              className="border p-1 px-4 rounded-full flex items-center font-bold hover:opacity-50"
              style={{ borderColor: `var(--gray-color)` }}
            >
              <div className="text-xl pt-2">
                <ion-icon name="close"></ion-icon>
              </div>
              <button>Cancel</button>
            </div>
          </div>
        </div>
        <div
          className={`w-[600px] mb-5 max-sm:w-full flex flex-col p-3 ${
            theme === "dark" ? "bg-gray-600" : "bg-gray-100"
          }`}
        >
          <h2 className="text-lg font-bold px-2 pb-1">Delivery Address</h2>
          <div
            className="px-2 pb-2"
            style={{ backgroundColor: `var(--body-bg-color)` }}
          >
            <p className="font-bold pb-1 mt-2">{address?.name}</p>
            <p>
              {address?.street}, {address?.city}, {address?.state} -{" "}
              {address?.zip}
            </p>
            <p className="pt-1">
              Mobile:{" "}
              <span className="font-bold">{String(address?.phone)}</span>
            </p>
          </div>
        </div>
        <div
          className={`w-[600px] max-sm:w-full flex flex-col p-3 mb-5 ${
            theme === "dark" ? "bg-gray-600" : "bg-gray-100"
          }`}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold px-2 pb-1">Total Item Price</h2>
            <h2 className="text-lg font-bold px-2 pb-1">
              ₹ {orderedItem?.price}
            </h2>
          </div>
          <p className="px-2">
            Paid by {paymentMethod}{" "}
            {paymentMethod === "creditCard"
              ? `ending with ${maskedNumber}`
              : ""}
          </p>
        </div>
        <div
          className={`w-[600px] max-sm:w-full flex flex-col p-3 mb-5 ${
            theme === "dark" ? "bg-gray-600" : "bg-gray-100"
          }`}
        >
          <h2 className="text-lg font-bold px-2 pb-1">
            Other items in this order
          </h2>
          <p className="px-2 mb-2">Order ID # {orderId}</p>

          {otherItems?.map((item) => (
            <div
              key={item._id}
              className={`flex items-center justify-between mb-2 p-3`}
              style={{ backgroundColor: `var(--body-bg-color)` }}
            >
              <div className="flex items-center">
                <img src={item.productImage} className="w-16" alt="" />
                <div className="pl-3 text-sm">
                  <h2 className="font-bold mb-1">{item.productCompany}</h2>
                  <p className="mb-1">{item.productName}</p>
                  <p>Size: {item?.size}</p>
                </div>
              </div>
              <div className="text-2xl">
                <ion-icon name="chevron-forward"></ion-icon>
              </div>
            </div>
          ))}
        </div>
        <div
          className={`w-[600px] max-sm:w-full flex flex-col p-3 mb-5 ${
            theme === "dark" ? "bg-gray-600" : "bg-gray-100"
          }`}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold px-2 pb-1">Total Order Price</h2>
            <h2 className="text-lg font-bold px-2 pb-1">
              {totalOrderPrice < 3000 ? (
                <>
                  <p>₹ {totalOrderPrice - 70}</p>
                  <p className="text-sm">Shipping: ₹ 70</p>
                </>
              ) : (
                <>
                  <p>₹ {totalOrderPrice}</p>
                  <p className="text-sm">(Free Shipping)</p>
                </>
              )}
            </h2>
          </div>
        </div>
        <div
          className={`w-[600px] max-sm:w-full flex flex-col p-3 mb-5 ${
            theme === "dark" ? "bg-gray-600" : "bg-gray-100"
          }`}
        >
          <h2 className="text-lg font-bold px-2 pb-2">Updates sent to</h2>
          <div className="flex items-center px-2 pb-1">
            <ion-icon name="call-outline"></ion-icon>
            <p className="ml-2">{authData?.result?.phone}</p>
          </div>
          <div className="flex items-center px-2">
            <ion-icon name="mail-outline"></ion-icon>
            <p className="ml-2">{authData?.result?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
