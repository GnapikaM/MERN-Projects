// configureStore(): This function is provided by Redux Toolkit and is used to create a Redux store.
// compose(): This function is used to combine multiple store enhancers (such as middleware) into a single enhancer. It's typically used when you have multiple enhancers to apply to the store.

import React from "react";
import { applyMiddleware, compose, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";

import { reducers } from "../reducers";

const store = configureStore(
  { reducer: reducers },
  compose(applyMiddleware(thunk))
);

export default store;
