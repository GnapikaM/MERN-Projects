import React, { createContext, useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToWishlist, removeFromWishlist, fetchWishlist } from "../../../actions/WishlistActions";

const WishlistContext = createContext();

export const useWishlistContext = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.AuthReducer.authData);
  const userId = "";

  useEffect(() => {
    if (userId) {
      dispatch(fetchWishlist(userId));
    }
  }, [dispatch, userId]);

  const wishlistItems = useSelector(state => state.WishlistReducer.wishlistItems);

  const addProductToWishlist = (productId) => {
    dispatch(addToWishlist(userId, productId));
  };

  const removeProductFromWishlist = (itemId) => {
    dispatch(removeFromWishlist(itemId));
  };

  return (
    <WishlistContext.Provider
      value={{ addProductToWishlist, removeProductFromWishlist, wishlistItems }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
