import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "../Theme/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import { fetchProducts } from "../../../actions/ProductActions";
import {
  fetchWishlist,
  removeFromWishlist,
} from "../../../actions/WishlistActions";
import "../../css/theme.css";
import { addToCart, fetchCart } from "../../../actions/CartActions";

const Wishlist = () => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [addToCartLoading, setAddToCartLoading] = useState({});
  const [removeFromWishlistLoading, setRemoveFromWishlistLoading] = useState(
    {}
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authData = useSelector((state) => state.AuthReducer.authData);
  const userId = authData?.result?._id;

  const wishlistedItems = useSelector(
    (state) => state.WishlistReducer.wishlist
  );
  const cartItems = useSelector((state) => state.CartReducer.cart);

  useEffect(() => {
    dispatch(fetchWishlist(userId))
      .then(() => setLoading(false))
      .then(() => setLoading(false));
    dispatch(fetchProducts());
    dispatch(fetchCart(userId));
  }, [dispatch, userId]);

  const handleRemoveFromWishlist = async (productId) => {
    setRemoveFromWishlistLoading((prevLoading) => ({
      ...prevLoading,
      [productId]: true,
    }));
    try {
      await dispatch(removeFromWishlist(userId, productId));
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
    }
    setRemoveFromWishlistLoading((prevLoading) => ({
      ...prevLoading,
      [productId]: false,
    }));
  };

  const handleAddToCart = async (product, productId) => {
    setAddToCartLoading((prevLoading) => ({
      ...prevLoading,
      [productId]: true,
    }));
    try {
      await dispatch(addToCart(userId, product));
      await dispatch(removeFromWishlist(userId, productId));
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
    setAddToCartLoading((prevLoading) => ({
      ...prevLoading,
      [productId]: false,
    }));
  };

  const openPost = (productId) => {
    navigate(`/products/${productId}`);
  }

  return (
    <div>
      <div
        className={`${
          theme === "dark" ? "dark-theme" : "light-theme"
        } relative`}
        style={{
          backgroundColor: `var(--body-bg-color)`,
          color: `var(--text-color)`,
          minHeight: "100vh",
        }}
      >
        <div className="relative pt-32 pl-10 font-bold text-2xl max-sm:text-xl tracking-[2px] max-lg:pb-8 max-[550px]:pt-36 max-[550px]:pl-4">
          <span style={{ color: `var(--highlight-color)` }}>Home</span> / My
          Wishlist
          <span className="font-medium tracking-normal text-xl pl-1 max-lg:text-lg max-[311px]:absolute max-[311px]:left-0 max-[311px]:bottom-1 max-[311px]:pl-4">
            ({wishlistedItems.length}{" "}
            {wishlistedItems.length === 1 ? "Item" : "Items"})
          </span>
        </div>

        <div>
          {!authData && (
            <div className="w-full m-auto text-center pt-16">
              <h2 className="font-bold text-xl tracking-wide max-[410px]:text-lg">
                PLEASE LOG IN TO ACCESS YOUR WISHLIST
              </h2>
              <p
                className={`my-3 max-[410px]:text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                You need to be logged in to access your wishlist. Log in or sign
                up now to save your favorite items.
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
          {authData && wishlistedItems.length === 0 && (
            <div className="w-full m-auto text-center pt-16">
              <h2 className="font-bold text-xl tracking-wide max-[410px]:text-lg">
                YOUR WISHLIST IS EMPTY
              </h2>
              <p
                className={`my-3 max-[410px]:text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Add what you love to your wishlist, check them out anytime, and
                move them to your bag hassle-free.
              </p>
              <div className="w-full h-40 max-[410px]:h-32 flex justify-center rounded-lg my-5">
                <img
                  className="h-full rounded-lg opacity-80"
                  src="https://img.freepik.com/free-vector/online-wishes-list-concept-illustration_114360-3900.jpg?w=740"
                  alt=""
                />
              </div>
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
                <Link to="/products">CONTINUE SHOPPING</Link>
              </button>
            </div>
          )}
          {authData && wishlistedItems.length > 0 && (
            <>
              {loading ? (
                <div className="loader-container">
                  <div
                    className="loader-pulse"
                    style={{ backgroundColor: `var(--highlight-color)` }}
                  >
                    <div
                      className="outer-ring border-2"
                      style={{ borderColor: `var(--text-color)` }}
                    ></div>
                  </div>
                </div>
              ) : (
                <div className="py-10 max-lg:py-3 mx-5 grid gap-5 grid-cols-6 max-xl:grid-cols-5 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 max-sm:mx-1 max-sm:gap-1">
                  {wishlistedItems.map((product) => (
                    <div key={product._id} className={`relative p-1 ${removeFromWishlistLoading[product._id] ? "opacity-50" : ""}`}>
                      <div className="relative">
                        <button
                          className="absolute right-2 top-2 px-1 rounded-full hover:opacity-85"
                          style={{ backgroundColor: `var(--body-bg-color)` }}
                          onClick={() => handleRemoveFromWishlist(product._id)}
                        >
                          <ion-icon name="close"></ion-icon>
                        </button>
                        <img className="cursor-pointer" onClick={() => openPost(product._id)} src={product.images[0]} alt="image" />
                      </div>
                      <div className="flex items-center justify-between">
                        <h2 className="font-semibold max-[355px]:text-sm">
                          {product.company}
                        </h2>
                      </div>
                      <p
                        className={`text-sm my-[2px] max-[355px]:my-[1px] max-[355px]:text-xs ${
                          theme === "dark" ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {product.name}
                      </p>
                      <div className="flex">
                        <p className="text-sm font-bold max-lg:hidden">
                          Rs. {product.price}
                        </p>
                        <p className="text-sm font-bold lg:hidden max-[355px]:text-xs">
                          &#8377;{product.price}
                        </p>
                        <p
                          className={`text-xs mx-2 mt-[3px] line-through max-[355px]:mt-0 max-[355px]:mx-1 ${
                            theme === "dark" ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          {product.origPrice > 0 && (
                            <>
                              <span className="max-lg:hidden">
                                Rs. {product.origPrice}
                              </span>
                              <span className="lg:hidden max-[355px]:text-[10px]">
                                &#8377;{product.origPrice}
                              </span>
                            </>
                          )}
                        </p>
                        <p className="text-sm text-orange-500 max-[355px]:text-xs">
                          {product.discount > 1 && (
                            <span>({product.discount}% OFF)</span>
                          )}
                        </p>
                      </div>
                      {loading ? (
                        <p className="text-xs text-gray-500 mt-1">Loading...</p>
                      ) : (
                        <button
                          className="w-full text-center mt-2 border py-1 font-medium"
                          onMouseEnter={(e) => {
                            e.target.style.borderColor = "orange";
                            e.target.style.color = "orange";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.borderColor = `var(--text-color)`;
                            e.target.style.color = "";
                          }}
                          style={{
                            borderColor: `var(--text-color)`,
                            transition: "border-color 0.3s, color 0.3s",
                          }}
                          onClick={() => handleAddToCart(product, product._id)}
                        >
                          {addToCartLoading[product._id] ? <p className="loading-dots">MOVING TO BAG...</p> : <p>MOVE TO BAG</p>}
                        </button>
                      )}
                      {product.quantity <= 2 && (
                        <p className="mb-4 text-xs font-bold text-orange-500 max-[355px]:text-xs max-[355px]:mb-0">
                          Only Few Left!
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
