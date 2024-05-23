import {
  FETCH_WISHLIST_SUCCESS,
  FETCH_WISHLIST_FAIL,
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
} from "../constants/actionTypes.js";

const initialState = {
  wishlist: [],
  loading: true,
  error: null,
};

const WishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WISHLIST_SUCCESS:
      return {
        ...state,
        wishlist: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_WISHLIST_FAIL:
      return {
        ...state,
        wishlist: [],
        loading: false,
        error: action.payload,
      };
    case ADD_TO_WISHLIST:
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
      };
    case REMOVE_FROM_WISHLIST:
      return {
        ...state,
        wishlist: state.wishlist.filter((item) => item !== action.payload),
      };
    default:
      return state;
  }
};

export default WishlistReducer;
