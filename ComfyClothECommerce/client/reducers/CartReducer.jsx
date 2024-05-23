import {
  FETCH_CART_SUCCESS,
  FETCH_CART_FAIL,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  REMOVE_ALL_FROM_CART,
  UPDATE_CART
} from "../constants/actionTypes";

const initialState = {
  cart: [],
  loading: true,
  error: null,
};

const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CART_SUCCESS:
      return {
        ...state,
        cart: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_CART_FAIL:
      return {
        ...state,
        cart: [],
        loading: false,
        error: action.payload,
      };
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case UPDATE_CART:
      return {
        ...state,
        cart: action.payload.cart,
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item !== action.payload),
      };
    case REMOVE_ALL_FROM_CART:
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};

export default CartReducer;
