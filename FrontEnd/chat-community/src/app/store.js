import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import appReducer from "../features/appSlice";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";

const reducers = combineReducers({ userReducer, appReducer });

const store = createStore(reducers, compose(applyMiddleware(thunk)));

// export const store = configureStore({
//   reducer: {
//     user: userReducer,
//     app: appReducer,
//   },
// });

export default store;
