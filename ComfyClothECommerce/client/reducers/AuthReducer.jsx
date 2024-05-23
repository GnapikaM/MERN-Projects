import * as actionType from "../constants/actionTypes.js";

const initialState = {
  users: [],
  authData: null,
  isAuthenticated: false,
  loading: true,
  errors: null,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.REGISTER_SUCCESS:
    case actionType.LOGIN_SUCCESS:
      localStorage.setItem("Profile", JSON.stringify({ ...action?.data }));
      return {
        ...state,
        authData: action.data,
        isAuthenticated: true,
        loading: false,
        errors: null,
      };
    case actionType.REGISTER_FAIL:
    case actionType.LOGIN_FAIL:
      localStorage.clear();
      return {
        ...state,
        authData: null,
        isAuthenticated: false,
        loading: false,
        errors: null,
      };
    case actionType.FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        loading: false,
        errors: null,
      };
    case actionType.FETCH_USERS_FAIL:
      return {
        ...state,
        users: [],
        loading: false,
        errors: action.payload,
      };
    case actionType.DELETE_ACCOUNT_REQUEST:
      return {
        ...state,
        loading: true,
        errors: null,
      };
    case actionType.DELETE_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case actionType.DELETE_ACCOUNT_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    default:
      return state;
  }
};

export default AuthReducer;
