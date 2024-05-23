import * as api from "../api";
import {
  ADD_ADDRESS_FAILURE,
  FETCH_ADDRESSES_FAILURE,
  FETCH_ADDRESSES_SUCCESS,
  DELETE_ADDRESS_FAILURE,
  EDIT_ADDRESS_FAILURE,
} from "../constants/actionTypes";

export const fetchAddresses = (usedId) => async (dispatch) => {
  try {
    const res = await api.fetchAddresses(usedId);
    dispatch({ type: FETCH_ADDRESSES_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: FETCH_ADDRESSES_FAILURE, payload: error.message });
  }
};

export const addAddress = (userId, addressData) => async (dispatch) => {
  try {
    const res = await api.addAddress(userId, addressData);
    dispatch(fetchAddresses(userId));
  } catch (error) {
    dispatch({ type: ADD_ADDRESS_FAILURE, payload: error.message });
    console.error("Error adding address: ", error);
  }
};

export const deleteAddress = (id, userId) => async (dispatch) => {
  try {
    await api.deleteAddress(id);
    dispatch(fetchAddresses(userId));
  } catch (error) {
    dispatch({ type: DELETE_ADDRESS_FAILURE, payload: error.message });
  }
};

export const editAddress = (id, updatedAddress, userId) => async (dispatch) => {
  try {
    await api.editAddress(id, updatedAddress);
    dispatch(fetchAddresses(userId));
  } catch (error) {
    dispatch({ type: EDIT_ADDRESS_FAILURE, payload: error.message });
  }
};
