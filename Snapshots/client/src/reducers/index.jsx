import { combineReducers } from "redux";

import posts from "./posts";
import AuthReducer from "./Auth";
import contacts from "./contacts";

export const reducers = combineReducers({ posts, AuthReducer, contacts });
