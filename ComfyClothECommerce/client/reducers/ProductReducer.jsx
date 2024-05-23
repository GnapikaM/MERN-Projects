import {
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAIL,
  UPDATE_PRODUCT_RATING,
} from "../constants/actionTypes.js";

const initialState = {
  products: [],
  loading: true,
  error: null,
};

const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_PRODUCTS_FAIL:
      return {
        ...state,
        products: [],
        loading: false,
        error: action.payload,
      };
    case UPDATE_PRODUCT_RATING:
      return {
        ...state,
        products: state.products.map((product) =>
          product._id === action.payload._id ? action.payload : product
        ),
      };

    default:
      return state;
  }
};

export default ProductReducer;
