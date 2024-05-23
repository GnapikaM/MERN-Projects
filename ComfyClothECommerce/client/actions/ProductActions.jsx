import {
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAIL,
  UPDATE_PRODUCT_RATING,
} from "../constants/actionTypes.js";
import * as api from "../api/index.js";

export const fetchProducts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchProducts();
    dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    console.error("Fetch products error: ", error);
    dispatch({ type: FETCH_PRODUCTS_FAIL, payload: error.message });
  }
};

export const updateProductRating = (productId, rating) => async (dispatch) => {
  try {
    const res = await api.updateProductRating(productId, rating);
    dispatch({
      type: UPDATE_PRODUCT_RATING,
      payload: res.data
    });
  } catch (error) {
    console.error(error);
  }
};
