import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const response = await axiosInstance.post('/login', { email, password });
      const { token, user } = response.data;

      // Save token to localStorage here if you want (optional, or do it in extraReducers)
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      // localStorage.setItem("token", "");

      return {token, user}; // goes to action.payload in fulfilled
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ username, email, password, phoneNo }, thunkAPI) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const response = await axiosInstance.post("/register", {
        username,
        email,
        phoneNo,
        password,
      });
      return response.data.message; // success message to use in UI
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Registration failed");
    }
  }
);
