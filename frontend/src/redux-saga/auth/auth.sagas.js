import { call, put, takeLatest, delay, all } from "redux-saga/effects";
import axios from "axios";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
} from "./auth.slice";

function* loginSaga(action) {
  try {
    const { email, password } = action.payload;
    yield delay(3000); // simulate latency
    const response = yield call(axios.post, `${API_URL}/login`, { email, password });
    const { token } = response.data;

    localStorage.setItem("token", token);

    yield put(loginSuccess(token));
  } catch (error) {
    yield put(
      loginFailure(error.response?.data?.message || "Login failed")
    );
  }
}

function* registerSaga(action) {
  try {
    const { username, email, password } = action.payload;
    yield delay(3000); // simulate latency
    const response = yield call(
      axios.post,
      `${API_URL}/register`,
      { username, email, password }
    );
    yield put(registerSuccess(response.data.message));
  } catch (error) {
    yield put(
      registerFailure(error.response?.data?.message || "Registration failed")
    );
  }
}

export default function* authSagas() {
  yield all([
    takeLatest(loginRequest.type, loginSaga),      
    takeLatest(registerRequest.type, registerSaga) 
  ]);
}
