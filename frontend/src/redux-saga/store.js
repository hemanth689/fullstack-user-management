import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../redux-saga/auth/auth.slice.js";
import authSagas from "../redux-saga/auth/auth.sagas.js";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: { auth: authSlice },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(authSagas);

export default store;
