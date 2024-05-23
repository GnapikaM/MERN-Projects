import {
  ADD_CONTACT_FAIL,
  ADD_CONTACT_SUCCESS,
} from "../constants/actionTypes";

const initialState = {
  contacts: [],
  error: null,
};

export const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CONTACT_SUCCESS:
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
        error: null,
      };
    case ADD_CONTACT_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return null;
  }
};
