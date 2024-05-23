import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../Theme/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../../actions/OrderActions";
import { emptyBox } from "../../../assets/images";
import {
  fetchProducts,
} from "../../../actions/ProductActions";

const Orders = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [productRatings, setProductRatings] = useState({});

  const authData = useSelector((state) => state.AuthReducer.authData);

  const userId = authData?.result?._id;

  useEffect(() => {
    if (userId) {
      dispatch(fetchOrders(userId));
      dispatch(fetchProducts());

      const storedRatings = JSON.parse(localStorage.getItem("productRatings"));
      if (storedRatings) {
        setProductRatings(storedRatings);
      }
    }
  }, [dispatch, userId]);

  useEffect(() => {
    localStorage.setItem("productRatings", JSON.stringify(productRatings));
  }, [productRatings]);

  const ordersData = useSelector((state) => state.OrderReducer.orders);
  const products = useSelector((state) => state.ProductReducer.products);

  let customers = [];
  {
    ordersData.map((order) => customers.push(order?.user?.customerId));
  }
  const isCustomerOrdered = customers.includes(userId);

  const openOrder = (orderId, itemId) => {
    navigate(`/orders/${orderId}/${itemId}`);
  };

  const openReviewForm = (product, productId) => {
    navigate(`/reviewForm`, { state: { productId } });
  };

  return (
    <div
      className={`${theme === "dark" ? "dark-theme" : "light-theme"}`}
      style={{
        backgroundColor: `var(--body-bg-color)`,
        color: `var(--text-color)`,
        minHeight: "100vh",
      }}
    >
      <div className="relative pt-32 pl-10 font-bold text-2xl max-sm:text-xl tracking-[2px] max-lg:pb-8 max-[550px]:pt-36 max-[550px]:pl-4">
        <span style={{ color: `var(--highlight-color)` }}>Home</span> / My
        Orders
        <span className="font-medium tracking-normal text-xl pl-1 max-lg:text-lg max-[311px]:absolute max-[311px]:left-0 max-[311px]:bottom-1 max-[311px]:pl-4"></span>
      </div>
      <div className="pt-16">
        {!authData && (
          <div className="w-full m-auto text-center">
            <h2 className="font-bold text-xl tracking-wide max-[410px]:text-lg">
              PLEASE LOG IN TO SEE YOUR ORDERS
            </h2>
            <p
              className={`my-3 max-[410px]:text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              To view your order status, please log in or sign up now. Access to
              your Orders requires authentication.
            </p>
            <div className="w-full h-48 max-[410px]:h-32 flex justify-center rounded-lg my-5">
              <img
                className="h-full rounded-lg opacity-80"
                src="https://img.freepik.com/free-vector/login-concept-illustration_114360-757.jpg?t=st=1713855850~exp=1713859450~hmac=f51e9aa8deafccb27e377c12444c43bb017e809880d4851c0419faab71adb588&w=740"
                alt=""
              />
            </div>
            <div className="flex justify-center items-center space-x-4">
              <button
                className="border rounded-full px-4 py-2 transition-colors duration-300 hover:bg-gray-100"
                style={{
                  color: `var(--highlight-color)`,
                  borderColor: `var(--gray-color)`,
                }}
              >
                <Link to="/login">LOGIN</Link>
              </button>
              <p className="text-gray-500">or</p>
              <button
                className="border rounded-full px-4 py-2 transition-colors duration-300 hover:bg-gray-100"
                style={{
                  color: `var(--highlight-color)`,
                  borderColor: `var(--gray-color)`,
                }}
              >
                <Link to="/register">REGISTER</Link>
              </button>
            </div>
          </div>
        )}
        {authData && !isCustomerOrdered && (
          <div className="w-full m-auto text-center">
            <h2 className="font-bold text-xl tracking-wide max-[410px]:text-lg">
              YOUR ORDERS PAGE IS CURRENTLY EMPTY
            </h2>
            <p
              className={`my-3 max-[410px]:text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Looks like you haven't placed any orders yet.
            </p>
            <div className="flex justify-center">
              <img src={emptyBox} className="h-40" alt="" />
            </div>
            <p
              className={`my-3 max-[410px]:text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Start adding items to your cart and place an order to see your
              order history.
            </p>
            <button
              className="py-3 px-5 border max-[410px]:py-2 max-[410px]:px-3"
              style={{
                transition: "border-color 0.3s, color 0.3s",
                borderColor: `var(--text-color)`,
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = `var(--highlight-color)`;
                e.target.style.color = `var(--highlight-color)`;
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = `var(--text-color)`;
                e.target.style.color = "";
              }}
            >
              <Link to="/bag">ADD ITEMS FROM CART</Link>
            </button>
          </div>
        )}

        {authData && ordersData && ordersData.length > 0 && (
          <div className="max-sm:mx-2 mb-5">
            {ordersData.map((order) => (
              <div key={order._id} className="mx-auto">
                {userId === order.user.customerId && (
                  <div className="flex flex-col items-center justify-center mb-5 max-md:-mt-14">
                    <div className="flex justify-between items-center w-[625px] max-sm:w-full">
                      <p className="font-bold mb-2 mt-10">Order Id: {order._id}</p>
                    </div>
                    {order.cartItems.map((item) => (
                      <div
                        key={item.product}
                        className={`p-2 mb-3 border-4 w-[625px] max-sm:w-full ${
                          theme === "dark"
                            ? `border-gray-600`
                            : `border-gray-300`
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div
                              className="rounded-full mr-2 mb-2 w-8 h-8 flex items-center justify-center text-2xl"
                              style={{
                                backgroundColor: `var(--text-color)`,
                                color: `var(--body-bg-color)`,
                              }}
                            >
                              <ion-icon name="cube"></ion-icon>
                            </div>
                            <div className="h-[46px]">
                              <p
                                className="text-sm font-bold"
                                style={{ color: `var(--highlight-color)` }}
                              >
                                Order Delivered
                              </p>
                              <p className="text-xs">
                                On{" "}
                                <span>
                                  {new Date(order.createdAt)
                                    .toLocaleDateString("en-US", {
                                      weekday: "long",
                                    })
                                    .slice(0, 3)}
                                </span>
                                ,{" "}
                                <span>
                                  {new Date(order.createdAt).getDate()}
                                </span>{" "}
                                <span>
                                  {new Date(order.createdAt)
                                    .toLocaleString("en-US", { month: "long" })
                                    .slice(0, 3)}
                                </span>{" "}
                                <span>
                                  {new Date(order.createdAt).getFullYear()}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div
                          className={`flex items-center justify-between w-[600px] max-sm:w-full p-3 cursor-pointer`}
                          onClick={() => openOrder(order._id, item.product)}
                          style={{ backgroundColor: `var(--header-bg-color)` }}
                        >
                          <div className="flex items-center">
                            <img
                              src={item.productImage}
                              className="w-16"
                              alt=""
                            />
                            <div className="pl-3 text-sm">
                              <h2 className="font-bold mb-1">
                                {item.productCompany}
                              </h2>
                              <p className="mb-1">{item.productName}</p>
                              <p>Size: {item.size}</p>
                            </div>
                          </div>
                          <div className="text-2xl">
                            <ion-icon name="chevron-forward"></ion-icon>
                          </div>
                        </div>
                        <div className="text-sm flex max-sm:flex-col mt-2 max-sm:text-xs">
                          <p className="max-sm:mb-1 sm:mr-2">
                            Tell us what you feel about the product
                          </p>
                          <button
                            className="font-bold text-start"
                            style={{ color: `var(--highlight-color)` }}
                            onClick={() => openReviewForm(item, item.product)}
                          >
                            Add a review
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
