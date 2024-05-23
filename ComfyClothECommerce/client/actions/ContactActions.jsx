import {
  ADD_CONTACT_SUCCESS,
  ADD_CONTACT_FAIL,
} from "../constants/actionTypes";
import * as api from "../api/index.js";

export const addContact = (contactData) => async (dispatch) => {
  try {
    const response = await api.addContact(contactData);
    dispatch({ type: ADD_CONTACT_SUCCESS, payload: response.data.contact });
  } catch (error) {
    dispatch({
      type: ADD_CONTACT_FAIL,
      payload: error.response.data.message || "Failed to add contact",
    });
  }
};
