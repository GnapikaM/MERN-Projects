import * as actionType from "../constants/actionTypes";

const contacts = (state = { contactData: null, errors: null }, action) => {
  switch (action.type) {
    case actionType.CONTACT:
      localStorage.setItem("contact", JSON.stringify({ ...action?.data }));
      return {
        ...state,
        contactData: action.data,
        loading: false,
        errors: null,
      };

    default:
      return state;
  }
};

export default contacts;
