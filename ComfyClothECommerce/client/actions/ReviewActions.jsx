import {
  ADD_REVIEW_FAILURE,
  ADD_REVIEW_SUCCESS,
  FETCH_REVIEWS_FAILURE,
  FETCH_REVIEWS_SUCCESS,
  LIKE_REVIEW_SUCCESS,
  LIKE_REVIEW_FAILURE,
  DISLIKE_REVIEW_SUCCESS,
  DISLIKE_REVIEW_FAILURE,
} from "../constants/actionTypes";
import * as api from "../api/index.js";

export const fetchReviewsByProductID = (productId) => async (dispatch) => {
  try {
    const response = await api.fetchReviewsByProductID(productId);
    dispatch({ type: FETCH_REVIEWS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_REVIEWS_FAILURE, payload: error.message });
    console.error("Error fetching reviews: ", error);
  }
};

export const addReview = (productId, formData) => async (dispatch) => {
  try {
    const response = await api.addReview(productId, formData);
    dispatch({ type: ADD_REVIEW_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: ADD_REVIEW_FAILURE, payload: error.message });
    console.error("Error adding review: ", error);
  }
};

export const likeReview = (userId, reviewId, productId) => async (dispatch) => {
  try {
    const response = await api.likeReview(userId, reviewId);
    dispatch({ type: LIKE_REVIEW_SUCCESS, payload: response.data });
    dispatch(fetchReviewsByProductID(productId));
  } catch (error) {
    console.error("Error liking review: ", error);
    dispatch({ type: LIKE_REVIEW_FAILURE, payload: error.message });
  }
};

export const dislikeReview = (userId, reviewId, productId) => async (dispatch) => {
  try {
    const response = await api.dislikeReview(userId, reviewId);
    dispatch({ type: DISLIKE_REVIEW_SUCCESS, payload: response.data });
    dispatch(fetchReviewsByProductID(productId))
  } catch (error) {
    console.error("Error disliking review: ", error);
    dispatch({ type: DISLIKE_REVIEW_FAILURE, payload: error.message });
  }
};
