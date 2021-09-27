import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";
import test from "./modules/test";
import user from "./modules/user";
import img from "./modules/img";
import post from "./modules/post";
import { persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import { combineReducers } from "redux";

// 루트리듀서
const rootReducer = combineReducers({
  test,
  user,
  img,
  post,
});

// redux-persist
const persistConfig = {
  key: "root",
  storage: storageSession,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// 스토어 생성
const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk, logger],
});

export default store;
