import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../Theme/ThemeContext";
import { productQuantityOptions, productSizeOptions } from "../../../constants";
import PopUpBox from "./PopUpBox";
import "../../css/theme.css";
import { bag1 } from "../../../assets/images";
import { PopUpConfirmMove, PopUpConfirmRemove } from "./Components";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, updateCartItem } from "../../../actions/CartActions";

const Bag = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productSizes, setProductSizes] = useState({});
  const [productQuantities, setProductQuantities] = useState({});
  const [showPopUp, setShowPopUp] = useState(false);
  const [showPopUpRemove, setShowPopUpRemove] = useState(false);
  const [showPopUpMove, setShowPopUpMove] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const authData = useSelector((state) => state.AuthReducer.authData);
  const userId = authData?.result?._id;
  const bagItems = useSelector((state) => state.CartReducer.cart);

  useEffect(() => {
    if (userId) {
      dispatch(fetchCart(userId)).then(() => setLoading(false));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (Array.isArray(bagItems) && bagItems.length > 0) {
      if (Object.keys(productSizes).length === 0) {
        setProductSizes(
          bagItems.reduce((acc, product) => {
            acc[product._id] = "XS";
            return acc;
          }, {})
        );
      }
      if (Object.keys(productQuantities).length === 0) {
        setProductQuantities(
          bagItems.reduce((acc, product) => {
            acc[product._id] = 1;
            return acc;
          }, {})
        );
      }
    }
  }, [bagItems, productSizes, productQuantities]);
  

  const togglePopUp = (product) => {
    setSelectedProduct(product);
    setShowPopUp(!showPopUp);
  };

  const handleRemoveAll = () => {
    setShowPopUpRemove(!showPopUpRemove);
  };

  const handleMoveToWishlist = () => {
    setShowPopUpMove(!showPopUpMove);
  };

  const totalMRP = () => {
    return (
      Array.isArray(bagItems) &&
      bagItems.reduce(
        (total, product) =>
          total + product.price * productQuantities[product._id],
        0
      )
    );
  };

  const discountOnMRP = () => {
    if (!Array.isArray(bagItems)) return 0;
    const totalOrigPrice = bagItems.reduce(
      (total, product) => total + product.origPrice,
      0
    );
    const totalDiscountedPrice = bagItems.reduce(
      (total, product) => total + product.price,
      0
    );
    const discount = totalOrigPrice - totalDiscountedPrice;
    return discount;
  };

  const shippingFee = () => {
    return totalMRP() > 3000 ? 0 : 70;
  };

  const openPost = (productId) => {
    navigate(`/products/${productId}`);
  };

  const productsInfo = Array.isArray(bagItems)
    ? bagItems.map((product) => ({
        productId: product.product,
        productImage: product.image,
        productName: product.name,
        productCompany: product.company,
        productPrice: product.price,
        productQuantity: productQuantities[product._id],
        productSize: productSizes[product._id],
      }))
    : [];

  const totalAmount = totalMRP() + shippingFee();

  const goToAddressPage = () => {
    navigate(`/addressPage`, {
      state: {
        productsInfo,
        totalAmount
      },
    });
  };

  const handleSizeChange = (productId, size) => {
    setProductSizes({ ...productSizes, [productId]: size });
    dispatch(updateCartItem(userId, productId, productQuantities[productId], size));
  };
  
  const handleQuantityChange = (productId, quantity) => {
    setProductQuantities({ ...productQuantities, [productId]: quantity });
    dispatch(updateCartItem(userId, productId, quantity, productSizes[productId]));
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
      <div className="pt-32 pb-16 pl-10 font-bold text-2xl tracking-[2px] max-lg:pb-8 max-sm:text-xl max-[550px]:pt-36 max-[550px]:pl-4">
        <span style={{ color: `var(--highlight-color)` }}>Home</span> / Cart
      </div>

      <div>
        {!authData && (
          <div className="w-full m-auto text-center pb-3">
            <h2 className="font-bold text-xl tracking-wide max-[410px]:text-lg">
              PLEASE LOG IN TO ACCESS YOUR CART
            </h2>
            <p
              className={`my-3 max-[410px]:text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              You need to be logged in to access your cart. Log in or sign up
              now to order your favorite items.
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
        {authData && bagItems && bagItems.length === 0 && (
          <div className="w-full m-auto text-center py-8 px-4">
            <div className="w-full h-28 max-[410px]:h-32 flex justify-center rounded-lg my-5">
              <img className="h-full rounded-lg opacity-80" src={bag1} alt="" />
            </div>
            <h2 className="font-bold text-lg tracking-wide max-[410px]:text-lg">
              Looks like your bag is empty!
            </h2>
            <p
              className={`my-3 max-[410px]:text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Let's fill it up with some amazing items.
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
              <Link to="/wishlist">ADD ITEMS FROM WISHLIST</Link>
            </button>
          </div>
        )}

        {authData && bagItems && bagItems.length > 0 && (
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
              <div className="flex mx-16 max-lg:flex-col max-[472px]:mx-1">
                <div className="flex-grow w-2/3 max-lg:w-full">
                  <div className="flex justify-between m-4 font-semibold text-sm">
                    <button
                      className="text-red-500 py-1 px-2 rounded"
                      onClick={handleRemoveAll}
                      style={{ transition: "0.3s" }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "red";
                        e.target.style.color = "white";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "";
                        e.target.style.color = "";
                      }}
                    >
                      REMOVE ALL
                    </button>
                    <button
                      className="py-1 px-2 rounded"
                      onClick={handleMoveToWishlist}
                      style={{
                        color: `var(--highlight-color)`,
                        transition: "0.3s",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = `var(--highlight-color)`;
                        e.target.style.color = `var(--text-color)`;
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "";
                        e.target.style.color = `var(--highlight-color)`;
                      }}
                    >
                      MOVE TO WISHLIST
                    </button>
                  </div>
                  {Array.isArray(bagItems) &&
                    bagItems.map((product) => (
                      <div
                        key={product._id}
                        className="border flex justify-between p-2 mb-5 max-[337px]:w-full"
                        style={{ borderColor: `var(--text-color)` }}
                      >
                        <div className="flex justify-between items-center">
                          <div
                            className="w-24 cursor-pointer max-[337px]:w-20"
                            onClick={() => openPost(product._id)}
                          >
                            <img src={product.image} alt="" />
                          </div>
                          <div className="ml-3">
                            <p className="font-semibold">{product.company}</p>
                            <p
                              className={`text-sm mt-1 mb-3 ${
                                theme === "dark"
                                  ? "text-gray-300"
                                  : "text-gray-500"
                              }`}
                            >
                              {product.name}
                            </p>
                            <div className="flex">
                              <label
                                className="flex items-center mr-4 px-1 rounded relative"
                                style={{
                                  backgroundColor: `var(--header-bg-color)`,
                                }}
                              >
                                <p className="font-medium">Size: </p>
                                <select
                                  id="option"
                                  value={product.size}
                                  onChange={(e) =>
                                    handleSizeChange(
                                      product._id,
                                      e.target.value
                                    )
                                  }
                                >
                                  {productSizeOptions.map((option) => (
                                    <option key={option} value={option}>
                                      {option}
                                    </option>
                                  ))}
                                </select>
                                <div className="absolute right-0 top-[2px]">
                                  <ion-icon name="caret-down-outline"></ion-icon>
                                </div>
                              </label>
                              <label
                                className="flex items-center px-1 rounded relative"
                                style={{
                                  backgroundColor: `var(--header-bg-color)`,
                                }}
                              >
                                <p className="font-medium">Qty: </p>
                                <select
                                  id="option"
                                  value={product.quantity}
                                  onChange={(e) =>
                                    handleQuantityChange(
                                      product._id,
                                      e.target.value
                                    )
                                  }
                                >
                                  {productQuantityOptions.map((option) => (
                                    <option key={option} value={option}>
                                      {option}
                                    </option>
                                  ))}
                                </select>
                                <div className="absolute right-0 top-[2px]">
                                  <ion-icon name="caret-down-outline"></ion-icon>
                                </div>
                              </label>
                            </div>
                            <div className="flex mt-2">
                              <p className="text-sm font-bold">
                                Rs. {product.price}
                              </p>
                              <p
                                className={`text-xs mx-2 mt-[3px] line-through max-[355px]:mt-1 max-[355px]:mx-1 ${
                                  theme === "dark"
                                    ? "text-gray-300"
                                    : "text-gray-600"
                                }`}
                              >
                                {product.origPrice > 0 && (
                                  <span>Rs. {product.origPrice}</span>
                                )}
                              </p>
                              <p className="text-sm text-orange-500 max-[355px]:text-xs max-[355px]:mt-1">
                                {product.discount > 0 && (
                                  <span>({product.discount}% OFF)</span>
                                )}
                              </p>
                            </div>
                            {product.quantity <= 2 && (
                              <p className="text-xs mt-2 font-bold text-orange-500 max-[355px]:text-xs max-[355px]:mb-0">
                                Only Few Left!
                              </p>
                            )}
                          </div>
                        </div>

                        <div
                          className="text-2xl cursor-pointer"
                          onClick={() => togglePopUp(product)}
                        >
                          <ion-icon name="close"></ion-icon>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="ml-5 flex-shrink-0 w-1/3 max-lg:w-full max-lg:ml-0">
                  <div
                    className="border p-2 max-lg:border-none"
                    style={{ borderColor: `var(--text-color)` }}
                  >
                    <div
                      className="max-lg:border max-lg:p-2 max-lg:mb-10"
                      style={{ borderColor: `var(--text-color)` }}
                    >
                      <h1 className="font-bold">
                        PRICE DETAILS{" "}
                        <span className="font-semibold">
                          ({bagItems.length}{" "}
                          {bagItems.length === 1 ? "Item" : "Items"})
                        </span>
                      </h1>
                      <div className="flex justify-between my-2">
                        <p>Total MRP</p>
                        <p>&#8377; {totalMRP()}</p>
                      </div>
                      <div className="flex justify-between">
                        <p>Discount on MRP</p>
                        <p>- &#8377; {discountOnMRP()}</p>
                      </div>
                      <div className="flex justify-between my-2 mb-4">
                        <p>Shipping Fee</p>
                        <p>&#8377; {shippingFee()}</p>
                      </div>
                      <div
                        className="flex justify-between border-t"
                        style={{ borderColor: `var(--text-color)` }}
                      >
                        <p className="my-4">Total Amount</p>
                        <p className="font-bold my-4">
                          &#8377; {totalMRP() + shippingFee()}
                        </p>
                      </div>
                    </div>
                    <button
                      className="max-lg:fixed max-lg:bottom-0 max-lg:left-0 max-lg:right-0 mt-2 w-full py-2 font-bold"
                      style={{
                        backgroundColor: `var(--highlight-color)`,
                        transition: `0.3s`,
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = `${
                          theme === "dark" ? "#ec4899" : "#2563eb"
                        }`;
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = `var(--highlight-color)`;
                      }}
                      onClick={goToAddressPage}
                    >
                      PLACE ORDER
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        {showPopUp && <PopUpBox product={selectedProduct} />}
        {showPopUpRemove && (
          <PopUpConfirmRemove
            show={showPopUpRemove}
            setShow={setShowPopUpRemove}
          />
        )}
        {showPopUpMove && (
          <PopUpConfirmMove
            show={showPopUpMove}
            setShow={setShowPopUpMove}
            bagItems={bagItems}
          />
        )}
      </div>
    </div>
  );
};

export default Bag;
