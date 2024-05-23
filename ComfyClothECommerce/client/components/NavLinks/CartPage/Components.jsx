import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  removeAllFromCart,
} from "../../../actions/CartActions";
import { addToWishlist } from "../../../actions/WishlistActions";

export const PopUpConfirmRemove = ({ show, setShow }) => {
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.AuthReducer.authData);
  const userId = authData?.result?._id;
  const bagItems = useSelector((state) => state.CartReducer.cart);

  const productIds = [];
  bagItems.forEach((product) => {
    productIds.push(product.product);
  });

  const handleRemoveAll = () => {
    dispatch(removeAllFromCart(userId, productIds));
    setShow(false);
  };

  const handleCancel = () => {
    setShow(false);
  };
  return (
    <div>
      {show && (
        <div
          className="fixed inset-0 flex items-center justify-center overflow-y-auto"
          style={{ backgroundColor: `rgba(0, 0, 0, 0.7)` }}
        >
          <div
            className="p-8 rounded-lg w-[250px] flex flex-col items-center relative"
            style={{ backgroundColor: `var(--body-bg-color)` }}
          >
            <p>Are you sure you want to remove all items?</p>
            <div className="flex mt-4">
              <button
                onClick={handleRemoveAll}
                className="text-red-500 px-2 rounded mr-6"
                style={{
                  borderColor: `var(--text-color)`,
                  transition: `0.3s`,
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "red";
                  e.target.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "";
                  e.target.style.color = "";
                }}
              >
                Confirm
              </button>
              <button
                onClick={handleCancel}
                className="px-2 rounded"
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
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const PopUpConfirmMove = ({ show, setShow, bagItems }) => {
  const userId = useSelector(
    (state) => state.AuthReducer.authData?.result?._id
  );
  const dispatch = useDispatch();
  const handleMoveToWishlist = () => {
    bagItems.forEach((product) => {
      dispatch(addToWishlist(userId, product.product));
      dispatch(removeFromCart(userId, product.product));
    });
    setShow(false);
  };

  const handleCancel = () => {
    setShow(false);
  };
  return (
    <div>
      {show && (
        <div
          className="fixed inset-0 flex items-center justify-center overflow-y-auto"
          style={{ backgroundColor: `rgba(0, 0, 0, 0.7)` }}
        >
          <div
            className="p-8 rounded-lg w-[250px] flex flex-col items-center relative"
            style={{ backgroundColor: `var(--body-bg-color)` }}
          >
            <p className="text-center">
              Are you sure you want to Move all items to Wishlist?
            </p>
            <div className="flex mt-4">
              <button
                onClick={handleMoveToWishlist}
                className="text-red-500 px-2 rounded mr-6"
                style={{
                  borderColor: `var(--text-color)`,
                  transition: `0.3s`,
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "red";
                  e.target.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "";
                  e.target.style.color = "";
                }}
              >
                Move
              </button>
              <button
                onClick={handleCancel}
                className="px-2 rounded"
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
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
