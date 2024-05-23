import React, { useEffect, useState } from "react";
import { useTheme } from "../Theme/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist } from "../../../actions/WishlistActions";
import { removeFromCart } from "../../../actions/CartActions";

const PopUpBox = ({ product }) => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const [showPopUp, setShowPopUp] = useState(true);

  const authData = useSelector((state) => state.AuthReducer.authData);
  const userId = authData?.result?._id;

  const handleCloseClick = () => {
    setShowPopUp(false);
  };

  const handleRemoveFromBag = (productId) => {
    dispatch(removeFromCart(userId, productId));
    setShowPopUp(false);
  };

  const handleMoveToWishlist = (productId) => {
    dispatch(addToWishlist(userId, productId));
    dispatch(removeFromCart(userId, productId));
    setShowPopUp(false);
  };

  return (
    <div>
      {showPopUp && (
        <div
          className="fixed inset-0 flex items-center justify-center overflow-y-auto"
          style={{ backgroundColor: `rgba(0, 0, 0, 0.7)` }}
        >
          <div
            className="p-8 rounded-lg w-[250px] flex flex-col items-center relative"
            style={{ backgroundColor: `var(--body-bg-color)` }}
          >
            <div
              className="absolute right-3 top-3"
              onClick={handleCloseClick}
            >
              <ion-icon name="close"></ion-icon>
            </div>
            <div className="w-20">
              <img src={product.img1} alt="" />
            </div>
            <p
              className={`text-sm text-center my-1 ${
                theme === "dark" ? "text-gray-300" : "text-gray-500"
              }`}
            >
              Are you sure you want to move this item from bag?
            </p>
            <button
              className="my-1 border w-[200px] text-sm font-medium py-1"
              style={{
                borderColor: `var(--text-color)`,
                transition: `color 0.3s, borderColor 0.3s`,
              }}
              onClick={() => handleMoveToWishlist(product.product)}
              onMouseEnter={(e) => {
                e.target.style.borderColor = `var(--highlight-color)`;
                e.target.style.color = "var(--highlight-color)";
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = `var(--text-color)`;
                e.target.style.color = `var(--text-color)`;
              }}
            >
              MOVE TO WISHLIST
            </button>
            <button
              className="my-1 border border-red-500 w-[200px] text-sm font-medium py-1"
              style={{
                borderColor: `var(--text-color)`,
                transition: `color 0.3s, borderColor 0.3s`,
              }}
              onClick={() => handleRemoveFromBag(product.product)}
              onMouseEnter={(e) => {
                e.target.style.borderColor = "red";
                e.target.style.color = "red";
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = `var(--text-color)`;
                e.target.style.color = `var(--text-color)`;
              }}
            >
              REMOVE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopUpBox;
