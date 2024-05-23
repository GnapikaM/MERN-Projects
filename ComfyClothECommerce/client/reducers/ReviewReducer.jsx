import {
  ADD_REVIEW_SUCCESS,
  ADD_REVIEW_FAILURE,
  FETCH_REVIEWS_SUCCESS,
  FETCH_REVIEWS_FAILURE,
  LIKE_REVIEW_SUCCESS,
  LIKE_REVIEW_FAILURE,
  DISLIKE_REVIEW_SUCCESS,
  DISLIKE_REVIEW_FAILURE,
} from "../constants/actionTypes";

const initialState = {
  reviews: [],
  error: null,
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REVIEWS_SUCCESS:
      return {
        ...state,
        reviews: action.payload,
        error: null,
      };
    case FETCH_REVIEWS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case ADD_REVIEW_SUCCESS:
      return {
        ...state,
        reviews: [...state.reviews, action.payload],
        error: null,
      };
    case ADD_REVIEW_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case LIKE_REVIEW_SUCCESS:
      return {
        ...state,
        reviews: state.reviews.map((review) =>
          review._id === action.payload._id ? action.payload : review
        ),
        error: null,
      };
    case LIKE_REVIEW_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case DISLIKE_REVIEW_SUCCESS:
      return {
        ...state,
        reviews: state.reviews.map((review) =>
          review._id === action.payload._id ? action.payload : review
        ),
        error: null,
      };  
    case DISLIKE_REVIEW_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reviewReducer;
