import { combineReducers } from "@reduxjs/toolkit";

import AuthReducer from "./AuthReducer";
import ProductReducer from "./ProductReducer";
import WishlistReducer from "./WishlistReducer";
import CartReducer from "./CartReducer";
import AddressReducer from "./AddressReducer";
import OrderReducer from "./OrderReducer";
import ReviewReducer from "./ReviewReducer";

export const reducers = combineReducers({
  AuthReducer,
  ProductReducer,
  WishlistReducer,
  CartReducer,
  AddressReducer,
  OrderReducer,
  ReviewReducer
});
