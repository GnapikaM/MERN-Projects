import { CONTACT } from "../constants/actionTypes";
import * as api from "../api/index.js";

export const contact = (contactData) => async (dispatch) => {
  try {
    const { data } = await api.contact(contactData);
    dispatch({ type: CONTACT, data });
  } catch (error) {
    console.error(error.response);
  }
};  
