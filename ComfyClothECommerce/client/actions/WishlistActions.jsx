import {
  FETCH_WISHLIST_SUCCESS,
  FETCH_WISHLIST_FAIL,
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
} from "../constants/actionTypes.js";
import * as api from "../api/index.js";

export const fetchWishlist = (userId) => async (dispatch) => {
  try {
    const { data } = await api.fetchWishlistItems(userId);
    dispatch({ type: FETCH_WISHLIST_SUCCESS, payload: data });

    const profileData = JSON.parse(localStorage.getItem("Profile")) || {};
    localStorage.setItem(
      "Profile",
      JSON.stringify({ ...profileData, wishlist: data })
    );
  } catch (error) {
    console.error("Fetch wishlist error: ", error);
    dispatch({ type: FETCH_WISHLIST_FAIL, payload: error.message });
  }
};

export const addToWishlist = (userId, productId) => async (dispatch) => {
  try {
    await api.addToWishlist(userId, productId);
    dispatch({ type: ADD_TO_WISHLIST, payload: productId });
    dispatch(fetchWishlist(userId));
  } catch (error) {
    console.error("Error adding product to wishlist:", error);
  }
};

export const removeFromWishlist = (userId, productId) => async (dispatch) => {
  try {
    await api.removeFromWishlist(userId, productId);
    
    dispatch({
      type: REMOVE_FROM_WISHLIST,
      payload: productId,
    });

    dispatch(fetchWishlist(userId));
  } catch (error) {
    console.error("Error removing product from wishlist:", error);
  }
};
