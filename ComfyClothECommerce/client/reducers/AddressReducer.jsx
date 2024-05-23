import {
  FETCH_ADDRESSES_FAILURE,
  FETCH_ADDRESSES_SUCCESS,
  ADD_ADDRESS_FAILURE,
  ADD_ADDRESS_SUCCESS,
  DELETE_ADDRESS_FAILURE,
  EDIT_ADDRESS_SUCCESS,
  EDIT_ADDRESS_FAILURE,
} from "../constants/actionTypes";

const initialState = {
  addresses: [],
  error: null,
};

const AddressReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ADDRESSES_SUCCESS:
      return { ...state, addresses: action.payload, error: null };
    case FETCH_ADDRESSES_FAILURE:
    case ADD_ADDRESS_FAILURE:
    case DELETE_ADDRESS_FAILURE:
      return { ...state, error: action.payload };
    case ADD_ADDRESS_SUCCESS:
      return {
        ...state,
        addresses: [...state.addresses, action.payload],
        error: null,
      };
    case EDIT_ADDRESS_SUCCESS:
      return {
        ...state,
        addresses: state.addresses.map((address) =>
          address._id === action.payload._id ? action.payload : address
        ),
        error: null,
      };
    case EDIT_ADDRESS_FAILURE:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export default AddressReducer;
