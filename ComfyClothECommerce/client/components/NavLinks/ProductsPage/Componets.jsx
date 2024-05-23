import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProductsContext } from "./ProductsContext";
import { useTheme } from "../Theme/ThemeContext";
import { useSelector, useDispatch } from "react-redux";
import {
  addToWishlist,
  fetchWishlist,
  removeFromWishlist,
} from "../../../actions/WishlistActions";
import { fetchReviewsByProductID } from "../../../actions/ReviewActions";

export const PriceRange = () => {
  const { minPrice, setMinPrice, maxPrice, setMaxPrice } = useProductsContext();

  return (
    <div className="flex lg:flex-col max-lg:w-[250px]">
      <input
        type="number"
        placeholder="Min"
        className="rounded py-2 px-4 max-lg:w-[120px] max-lg:mr-[10px] lg:mr-10 lg:mb-2"
        style={{ backgroundColor: `var(--header-bg-color)` }}
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />
      <input
        type="number"
        placeholder="Max"
        className="rounded py-2 px-4 max-lg:w-[120px] max-lg:mr-[10px] lg:mr-10 lg:mb-10"
        style={{ backgroundColor: `var(--header-bg-color)` }}
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />
    </div>
  );
};

export const ViewStyle = ({ products }) => {
  const { theme } = useTheme();
  const { isGridClicked, isMenuClicked, handleGridClick, handleMenuClick } =
    useProductsContext();
  return (
    <div className="flex justify-between items-center relative">
      <div
        className="flex items-center pr-10 z-10 max-lg:pl-5 max-[332px]:pr-0 max-[296px]:pl-2"
        style={{ backgroundColor: `var(--body-bg-color)` }}
      >
        <p>
          {products.length} {products.length === 1 ? "Product" : "Products"}
          <span> found</span>
        </p>
      </div>
      <div
        className="flex items-center pl-10 z-10"
        style={{ backgroundColor: `var(--body-bg-color)` }}
      >
        <div
          className={`px-1 rounded text-xl border-[1px] cursor-pointer mr-3 ${
            isGridClicked
              ? theme === "dark"
                ? "bg-[#f472b6]"
                : "bg-[#3b82f6]"
              : ""
          }
                  `}
          style={{ borderColor: `var(--text-color)` }}
          onClick={handleGridClick}
        >
          <ion-icon name="grid"></ion-icon>
        </div>
        <div
          className={`px-1 rounded text-xl border-[1px] cursor-pointer mr-7 max-[296px]:mr-2 ${
            isMenuClicked
              ? theme === "dark"
                ? "bg-[#f472b6]"
                : "bg-[#3b82f6]"
              : ""
          }`}
          style={{ borderColor: `var(--text-color)` }}
          onClick={handleMenuClick}
        >
          <ion-icon name="menu"></ion-icon>
        </div>
      </div>
      <div className="absolute top-4 left-0 right-0 h-[1px] bg-gray-400 max-sm:h-0"></div>
    </div>
  );
};

export const SearchButton = ({ setDisplayFilters, setDisplaySortFilters }) => {
  const handleApply = () => {
    setDisplayFilters(false);
    setDisplaySortFilters(false);
  };
  return (
    <div
      className="max-lg:w-[250px] max-lg:h-full flex justify-center text-lg font-medium py-2 rounded-md lg:mr-10 lg:mb-2"
      style={{
        backgroundColor: `var(--highlight-color)`,
        color: `var(--text-color)`,
      }}
      onClick={handleApply}
    >
      <button>Apply</button>
    </div>
  );
};

export const ResetButton = () => {
  const { handleReset } = useProductsContext();
  return (
    <div
      className="max-lg:w-[250px] max-lg:h-full flex justify-center text-lg font-medium py-2 rounded-md lg:mr-10 lg:mb-2 bg-orange-500"
      style={{ color: `var(--text-color)` }}
      onClick={handleReset}
    >
      <button>Reset</button>
    </div>
  );
};

const ItemsPerPage = 16;

export const DisplayGridProducts = ({ products }) => {
  const { isGridClicked } = useProductsContext();
  const { theme } = useTheme();
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authData = useSelector((state) => state.AuthReducer.authData);
  const userId = authData?.result?._id;

  const {
    notification,
    notificationMessage,
    setNotificationMessage,
    notificationColor,
    setNotificationColor,
    setNotification,
    handleNotificationColor,
    handleTimeout,
  } = useTheme();

  const reviews = useSelector((state) => state.ReviewReducer.reviews);

  useEffect(() => {
    dispatch(fetchWishlist(userId))
      .then(() => setLoading(false))
      .then(() => setLoading(false));
    products.forEach((product) => {
      dispatch(fetchReviewsByProductID(product._id));
    });
  }, [dispatch, userId, products]);

  const WishlistItems = JSON.parse(localStorage.getItem("Profile"))?.wishlist;

  const openPost = (productId) => {
    navigate(`/products/${productId}`);
  };

  const isProductInWishlist = (productId) => {
    return (
      WishlistItems &&
      WishlistItems.some((product) => product._id === productId)
    );
  };

  const handleToggleWishlist = (productId) => {
    if (isProductInWishlist(productId)) {
      dispatch(removeFromWishlist(userId, productId));
      setNotification(true);
      setNotificationColor(handleNotificationColor("error"));
      setNotificationMessage("Removed from Wishlist");
      handleTimeout();
    } else {
      if (authData) {
        dispatch(addToWishlist(userId, productId));
        setNotification(true);
        setNotificationColor(handleNotificationColor("success"));
        setNotificationMessage("Added to Wishlist");
        handleTimeout();
      } else {
        setNotification(true);
        setNotificationColor(handleNotificationColor("failure"));
        setNotificationMessage("Log in to wishlist products");
        handleTimeout();
      }
    }
  };

  const totalPages = Math.ceil(products.length / ItemsPerPage);

  const renderGridProducts = () => {
    const startIndex = (currentPage - 1) * ItemsPerPage;
    const endIndex = startIndex + ItemsPerPage;
    return products.slice(startIndex, endIndex).map((product) => (
      <div
        key={product.id}
        onMouseEnter={() => setHoveredProductId(product.id)}
        onMouseLeave={() => setHoveredProductId(null)}
      >
        <div className="relative">
          <div>
            <img src={product.images[0]} alt="" />
            {hoveredProductId === product.id && (
              <div
                className="absolute top-2 right-2 cursor-pointer w-8 h-8 rounded-full text-xl flex items-center justify-center"
                style={{
                  backgroundColor: `var(--body-bg-color)`,
                }}
                onClick={() => openPost(product._id)}
              >
                <ion-icon name="search"></ion-icon>
              </div>
            )}
          </div>

          {hoveredProductId === product.id && (
            <button
              className="font-bold absolute bottom-0 w-full p-2 flex justify-center max-lg:hidden"
              style={{
                backgroundColor: isProductInWishlist(product._id)
                  ? "transparent"
                  : "var(--body-bg-color)",
                color: isProductInWishlist(product._id)
                  ? "var(--body-bg-color)"
                  : "var(--text-color)",
              }}
              onClick={() => handleToggleWishlist(product._id)}
            >
              {!isProductInWishlist(product._id) && (
                <ion-icon name="heart-outline"></ion-icon>
              )}
              <span className="text-xs pl-[2px]">
                {!isProductInWishlist(product._id) && "WISHLIST"}
              </span>
            </button>
          )}
          <button
            className="font-bold absolute bottom-0 w-full p-2 flex justify-center max-lg:hidden"
            style={{
              backgroundColor: isProductInWishlist(product._id)
                ? "var(--text-color)"
                : "transparent",
              color: isProductInWishlist(product._id)
                ? "var(--body-bg-color)"
                : "var(--text-color)",
            }}
            onClick={() => handleToggleWishlist(product._id)}
          >
            {isProductInWishlist(product._id) && (
              <ion-icon name="heart" style={{ color: "red" }}></ion-icon>
            )}
            <span className="text-xs pl-[2px]">
              {isProductInWishlist(product._id) && "WISHLISTED"}
            </span>
          </button>
        </div>
        <div className="flex items-center justify-between">
          <h2 className="font-semibold max-[355px]:text-sm">
            {product.company}
          </h2>
          <p
            className="lg:hidden text-2xl"
            onClick={() => handleToggleWishlist(product._id)}
          >
            {isProductInWishlist(product._id) ? (
              <ion-icon name="heart" style={{ color: "red" }}></ion-icon>
            ) : (
              <ion-icon name="heart-outline"></ion-icon>
            )}
          </p>
        </div>
        <p
          className={`text-sm my-[2px] max-[355px]:my-[1px] max-[355px]:text-xs ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {product.name}
        </p>
        <div className="flex">
          <p className="text-sm font-bold max-lg:hidden">Rs. {product.price}</p>
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
                <span className="max-lg:hidden">Rs. {product.origPrice}</span>
                <span className="lg:hidden max-[355px]:text-[10px]">
                  &#8377;{product.origPrice}
                </span>
              </>
            )}
          </p>
          <p className="text-sm text-orange-500 max-[355px]:text-xs">
            {product.discount > 0 && <span>({product.discount}% OFF)</span>}
          </p>
        </div>
        {product.quantity <= 2 && (
          <p className="mb-4 text-xs mt-2 font-bold text-orange-500 max-[355px]:text-xs max-[355px]:mb-0">
            Only Few Left!
          </p>
        )}
      </div>
    ));
  };

  const renderProducts = () => {
    const startIndex = (currentPage - 1) * ItemsPerPage;
    const endIndex = startIndex + ItemsPerPage;
    return products.slice(startIndex, endIndex).map((product) => (
      <div
        key={product.id}
        onMouseEnter={() => setHoveredProductId(product.id)}
        onMouseLeave={() => setHoveredProductId(null)}
        className="mb-4 mr-4"
      >
        <div className="relative flex border border-gray-400">
          <div className="flex">
            <div className="h-40 max-sm:h-36 max-sm:w-24 p-1">
              <img src={product.images[0]} className="h-full w-24" alt="" />
            </div>
            <div className="my-1 ml-2">
              <h1 className="text-lg text-wrap max-sm:text-base font-semibold tracking-wide">
                {product.name}
              </h1>
              <h2
                className={`font-semibold my-1 text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {product.company}
              </h2>
              <div className="flex my-1">
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
                  {product.discount > 0 && (
                    <span>({product.discount}% OFF)</span>
                  )}
                </p>
              </div>
              {product.quantity <= 2 && (
                <p className="mb-4 text-xs mt-2 font-bold text-orange-500 max-[355px]:text-xs max-[355px]:mb-0">
                  Only Few Left!
                </p>
              )}
            </div>
          </div>
          <div
            className="absolute top-2 right-2 cursor-pointer w-8 h-8 max-sm:w-6 max-sm:h-6 rounded-full text-xl max-sm:text-base flex items-center justify-center"
            style={{
              backgroundColor: `var(--header-color)`,
              color: `var(--body-bg-color)`,
            }}
            onClick={() => openPost(product._id)}
          >
            <ion-icon name="search"></ion-icon>
          </div>

          <div
            className="absolute top-12 right-2 max-sm:top-9 cursor-pointer w-8 h-8 max-sm:w-6 max-sm:h-6 rounded-full text-xl max-sm:text-base flex items-center justify-center"
            style={{
              backgroundColor: `var(--header-color)`,
              color: `var(--body-bg-color)`,
            }}
            onClick={() => handleToggleWishlist(product._id)}
          >
            {isProductInWishlist(product._id) ? (
              <ion-icon name="heart" style={{ color: "red" }}></ion-icon>
            ) : (
              <ion-icon name="heart-outline"></ion-icon>
            )}
          </div>
        </div>
      </div>
    ));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`mx-1 px-3 py-1 rounded font-semibold max-lg:mb-16 max-lg:-mt-10 ${
            currentPage === i
              ? theme === "dark"
                ? "bg-pink-500 text-white"
                : "bg-blue-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
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
      <div className="flex flex-col justify-center">
        {notification && (
          <div className="notification-container max-sm:w-full max-sm:text-center">
            <div
              className={`notification ${
                notification ? "notification-visible" : ""
              }`}
              style={{ backgroundColor: notificationColor }}
            >
              {notificationMessage}
            </div>
          </div>
        )}
        {isGridClicked ? (
          <div className="my-10 grid gap-5 mx-5 grid-cols-4 max-[355px]:gap-2 max-[355px]:my-5 max-[355px]:mb-16 max-[460px]:mx-1 max-[862px]:grid-cols-3 max-[655px]:grid-cols-2 max-lg:mb-20">
            {notification && (
              <div className="fixed top-6 text-center left-1/2 right-0 z-40 notification-container max-sm:w-full max-sm:text-center">
                <div
                  className={`notification ${
                    notification ? "notification-visible" : ""
                  }`}
                  style={{ backgroundColor: notificationColor }}
                >
                  {notificationMessage}
                </div>
              </div>
            )}
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
              <>{renderGridProducts()}</>
            )}
          </div>
        ) : (
          <div className="my-10">
            {notification && (
              <div className="fixed top-6 text-center left-1/2 right-0 z-40 notification-container max-sm:w-full max-sm:text-center">
                <div
                  className={`notification ${
                    notification ? "notification-visible" : ""
                  }`}
                  style={{ backgroundColor: notificationColor }}
                >
                  {notificationMessage}
                </div>
              </div>
            )}
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
              <>{renderProducts()}</>
            )}
          </div>
        )}
        <div className="flex justify-center my-4">{renderPagination()}</div>
      </div>
    </div>
  );
};

export default DisplayGridProducts;
