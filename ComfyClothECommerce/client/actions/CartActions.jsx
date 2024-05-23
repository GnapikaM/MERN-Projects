import {
  FETCH_CART_SUCCESS,
  FETCH_CART_FAIL,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART,
} from "../constants/actionTypes.js";
import * as api from "../api/index.js";

export const fetchCart = (userId) => async (dispatch) => {
  try {
    const { data } = await api.fetchCartItems(userId);
    dispatch({ type: FETCH_CART_SUCCESS, payload: data });

    const profileData = JSON.parse(localStorage.getItem("Profile")) || {};
    localStorage.setItem(
      "Profile",
      JSON.stringify({ ...profileData, cart: data })
    );
  } catch (error) {
    console.error("Fetch cart error: ", error);
    dispatch({ type: FETCH_CART_FAIL, payload: error.message });
  }
};

export const addToCart = (userId, product, quantity, size) => async (dispatch) => {
  try {
    await api.addToCart(userId, product, quantity, size);
    dispatch({ type: ADD_TO_CART, payload: product });
    dispatch(fetchCart(userId));
  } catch (error) {
    console.error("Error adding product to cart: ", error);
  }
};

export const updateCartItem = (userId, productId, quantity, size) => async (dispatch) => {
  try {
    await api.updateCart(userId, productId, quantity, size);
    dispatch({ type: UPDATE_CART, payload: productId });
    dispatch(fetchCart(userId));
  } catch (error) {
    console.error("Error updating cart item: ", error);
  }
};

export const removeFromCart = (userId, productId) => async (dispatch) => {
  try {
    await api.removeFromCart(userId, productId);
    dispatch({ type: REMOVE_FROM_CART, payload: productId });
    dispatch(fetchCart(userId));
  } catch (error) {
    console.error("Error removing product from cart: ", error);
  }
};

export const removeAllFromCart = (userId, productIds) => async (dispatch) => {
  try {
    await Promise.all(productIds.map((productId) => api.removeFromCart(userId, productId)));
    dispatch(fetchCart(userId));
  } catch (error) {
    console.error("Error removing products from cart: ", error);
  }
};

