import {
  FETCH_ORDERS_FAILURE,
  FETCH_ORDERS_SUCCESS,
} from "../constants/actionTypes";

const initialState = {
  orders: [],
  error: null,
};

const OrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORDERS_SUCCESS:
      return { ...state, orders: action.payload, error: null };
    case FETCH_ORDERS_FAILURE:
      return { ...state, error: null };
    default:
      return state;
  }
};

export default OrderReducer;
