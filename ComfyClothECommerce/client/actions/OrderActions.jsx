import {
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILURE,
} from "../constants/actionTypes";
import * as api from "../api/index.js";

export const fetchOrders = (userId) => async (dispatch) => {
  try {
    const res = await api.fetchOrders(userId);
    dispatch({ type: FETCH_ORDERS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: FETCH_ORDERS_FAILURE, payload: error.message });
  }
};

export const createOrder =
  (
    userId,
    userName,
    userPhone,
    userEmail,
    selectedAddress,
    paymentMethod,
    paymentDetails,
    productsInfo
  ) =>
  async (dispatch) => {
    try {
      const res = await api.createOrder(
        userId,
        userName,
        userPhone,
        userEmail,
        selectedAddress,
        paymentMethod,
        paymentDetails,
        productsInfo
      );
      dispatch({
        type: CREATE_ORDER_SUCCESS,
        payload: res.data.order,
      });
    } catch (error) {
      dispatch({
        type: CREATE_ORDER_FAIL,
        payload: error.response.data.message,
      });
    }
  };
