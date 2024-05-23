import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { fetchProducts } from "../../../actions/ProductActions";
import { useTheme } from "../Theme/ThemeContext";
import Reviews from "./Reviews";
import { fetchReviewsByProductID } from "../../../actions/ReviewActions";

const PostDetails = () => {
  const { theme } = useTheme();
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const reviews = useSelector((state) => state.ReviewReducer.reviews);

  const products = useSelector((state) => state.ProductReducer.products);
  const product = products.find((item) => item._id === productId);

  useEffect(() => {
    dispatch(fetchProducts()).then(() => setLoading(false));
    dispatch(fetchReviewsByProductID(productId)).then(() => setLoading(false));
  }, [dispatch, productId]);

  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (product && product.images.length > 0) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleColorChange = (color) => {
    const productInColor = products.find(
      (item) =>
        item.name === product.name &&
        item.availableColors.includes(color) &&
        item.color.includes(color)
    );
    if (productInColor) {
      navigate(`/products/${productInColor._id}`);
    }
  };

  const calculateAverageRating = (productId) => {
    const productReviews = reviews.filter(
      (review) => review.productId === productId
    );
    const totalSumOfRatings = productReviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    const totalNumberOfRatings = productReviews.length;
    const averageRating = (totalSumOfRatings / totalNumberOfRatings).toFixed(1);
    return averageRating;
  };

  const averageRating = calculateAverageRating(productId);

  if (!product) {
    return <div>Product not found</div>;
  }

  const openPost = (productId) => {
    navigate(`/products/${productId}`);
    window.scrollTo(0, 0);
  };

  const recommendedProducts = [];

  const filteredProducts = products.filter(
    (prod) =>
      prod.category === product.category &&
      prod.relatedProducts.some((type) =>
        product.relatedProducts.includes(type)
      )
  );

  filteredProducts.forEach((prod) => {
    if (prod._id !== product._id) {
      recommendedProducts.push(prod);
    }
  });

  return (
    <div
      className={`${theme === "dark" ? "dark-theme" : "light-theme"}`}
      style={{
        backgroundColor: `var(--body-bg-color)`,
        color: `var(--text-color)`,
        minHeight: "100vh",
      }}
    >
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
        <div className="container mx-auto pt-32 pb-16">
          <div className="mx-5 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="w-full">
              <img src={selectedImage} alt="Product" className="w-full" />
              <div className="mt-4 grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Product ${index}`}
                    className={`w-full h-full object-cover cursor-pointer border-2 p-1`}
                    style={{
                      borderColor:
                        selectedImage === image
                          ? `var(--highlight-color)`
                          : `var(--gray-color)`,
                    }}
                    onClick={() => handleImageClick(image)}
                  />
                ))}
              </div>
            </div>
            <div className="flex md:hidden">
              {product.availableColors.map((color, index) => (
                <div
                  key={index}
                  className="h-8 w-8 rounded-full mr-2 cursor-pointer border"
                  style={{
                    backgroundColor: color,
                    borderColor: `var(--gray-color)`,
                  }}
                  onClick={() => handleColorChange(color)}
                ></div>
              ))}
            </div>
            <div className="md:col-span-1">
              <h1 className="text-3xl font-semibold mb-4">{product.name}</h1>
              <h2
                className={`text-xl font-semibold mb-4 tracking-wider ${
                  theme === "dark" ? "text-gray-200" : "text-gray-600"
                }`}
              >
                {product.company}
              </h2>
              <p
                className={`mb-6 ${
                  theme === "dark" ? "text-slate-400" : "text-slate-600"
                }`}
              >
                {product.description}
              </p>
              <div className="flex items-center mb-6">
                <span className="text-xl text-purple-600 font-semibold mr-2">
                  Rs. {product.price}
                </span>
                <span
                  className={`line-through ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Rs. {product.origPrice}
                </span>
                <span
                  className="text-green-500 ml-2"
                  style={{ backgroundColor: "" }}
                >
                  {product.discount}% off
                </span>
              </div>
              <div
                className={`flex items-center mb-6 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                <span>
                  Average Rating:{" "}
                  {isNaN(averageRating) ||
                  averageRating === null ||
                  averageRating === undefined
                    ? "0"
                    : averageRating}
                </span>
                <span className="ml-4">
                  Total Reviews: {reviews && reviews.length}
                </span>
              </div>
              <div className="mb-6 max-md:hidden">
                <h2
                  className={`text-xl font-semibold mb-2 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Available Colors:
                </h2>
                <div className="flex">
                  {product.availableColors.map((color, index) => (
                    <div
                      key={index}
                      className="h-8 w-8 rounded-full mr-2 cursor-pointer border"
                      style={{
                        backgroundColor: color,
                        borderColor: `var(--gray-color)`,
                      }}
                      onClick={() => handleColorChange(color)}
                    ></div>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <h2
                  className={`text-xl font-semibold mb-2 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Features:
                </h2>
                <ul
                  className={`list-disc list-inside ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-6">
                <h2
                  className={`text-xl font-semibold mb-2 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Material:
                </h2>
                <p
                  className={`${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {product.material}
                </p>
              </div>
              <div className="mb-6">
                <h2
                  className={`text-xl font-semibold mb-2 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Care Instructions:
                </h2>
                <p
                  className={`${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {product.careInstructions}
                </p>
              </div>
              <div className="mb-6">
                {product.sizeGuide && (
                  <>
                    <h2
                      className={`text-xl font-semibold mb-2 ${
                        theme === "dark" ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Size Guide:
                    </h2>

                    <ul
                      className={`${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {Object.entries(product.sizeGuide).map(
                        ([size, measurements]) => (
                          <li key={size}>
                            {size}: {measurements}
                          </li>
                        )
                      )}
                    </ul>
                  </>
                )}
              </div>
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Fit:</h2>
                <p
                  className={`${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {product.fit}
                </p>
              </div>
              <div
                className={`mb-6 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                <h2
                  className={`text-xl font-semibold mb-2 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Shipping Details:
                </h2>
                <p>Estimated Delivery: {product.shipping.estimatedDelivery}</p>
                <div className="flex">
                  <p className="mr-4">
                    Standard Shipping: Rs.{" "}
                    {product.shipping.options.standard.cost}
                  </p>
                  <p>
                    Express Shipping: Rs.{" "}
                    {product.shipping.options.express.cost}
                  </p>
                </div>
              </div>
              <div
                className={`mb-6 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                <h2
                  className={`text-xl font-semibold mb-2 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Return Policy:
                </h2>
                <p>Returns: {product.returnPolicy.returns}</p>
                <p>Exchanges: {product.returnPolicy.exchanges}</p>
                <p>Shipping Costs: {product.returnPolicy.shippingCosts}</p>
              </div>
              <div
                className={`mb-6 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                <div className="flex justify-between items-center">
                  <h2
                    className={`text-xl font-semibold mb-2 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Customer Reviews ({reviews && reviews.length})
                  </h2>
                </div>
                <Reviews productId={productId} />
              </div>
            </div>
          </div>
          {recommendedProducts.length > 0 && (
            <div className="mt-8 mx-5 max-[405px]:mx-1">
              <h2 className="text-2xl max-[405px]:text-xl tracking-wide font-bold text-center mb-8">
                RECOMMENDED PRODUCTS
              </h2>
              <div className="grid grid-cols-6 max-xl:grid-cols-5 max-lg:grid-cols-4 max-md:grid-cols-3 gap-5 max-[405px]:gap-[2px] max-sm:flex max-sm:flex-wrap max-sm:justify-center">
                {recommendedProducts.map((product) => (
                  <div
                    key={product.id}
                    className={`border cursor-pointer hover:shadow-lg ${
                      theme === "dark" && "hover:shadow-gray-600"
                    }`}
                    onClick={() => openPost(product._id)}
                    style={{ borderColor: `var(--gray-color)` }}
                  >
                    <div className="h-64 max-[405px]:h-52 relative">
                      <img
                        src={product.images[0]}
                        className="h-full w-full"
                        alt=""
                      />
                      <p
                        className="text-sm absolute bottom-2 left-2 font-semibold px-1 rounded text-white"
                        style={{ backgroundColor: `var(--highlight-color)` }}
                      >
                        {product.reviews.averageRating} <span>&#9733;</span>
                      </p>
                    </div>
                    <div className="p-1">
                      <h2 className="font-semibold my-1">{product.company}</h2>
                      <h3
                        className={`text-sm my-1 ${
                          theme === "dark" ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {product.name}
                      </h3>
                      <div className="flex flex-wrap mt-2 mb-1">
                        <p className="text-xs font-bold max-lg:hidden">
                          Rs. {product.price}
                        </p>
                        <p className="text-xs font-bold lg:hidden max-[355px]:text-xs">
                          &#8377;{product.price}
                        </p>
                        <p
                          className={`text-xs mx-2 line-through max-[355px]:mt-0 max-[355px]:mx-1 ${
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
                        <p className="text-xs text-orange-500 max-[355px]:text-xs">
                          {product.discount > 0 && (
                            <span>({product.discount}% OFF)</span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostDetails;
