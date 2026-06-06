import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchUsers = createAsyncThunk(
    "users/fetchUsers",
    async (_, thunkAPI) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            const response = await axios.get(`${API_URL}/users`);
            return response.data; // list of users
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch users");
        }
    }
);

export const fetchCurrentUser = createAsyncThunk(
    "user/fetchCurrentUser",
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${API_URL}/user/me`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log(response.data);
            return response.data; // returns current user data
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to fetch profile"
            );
        }
    }
);

export const updateUser = createAsyncThunk(
    "users/updateUser",
    async ({ email, username, phoneNo }, thunkAPI) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const response = await axios.patch(`${API_URL}/users/${email}`, { username, phoneNo });
            return response.data; // success message or updated user data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to update user");
        }
    }
);

export const deleteUser = createAsyncThunk(
    "users/deleteUser",
    async (userEmail, thunkAPI) => {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const response = await axios.delete(`${API_URL}/users/${userEmail}`);
            return { email: userEmail, message: response.data.message || "User deleted" };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to delete user");
        }
    }
);

export const uploadProfilePic = createAsyncThunk(
    "user/uploadProfilePic",
    async ({ userId, file }, thunkAPI) => {
        try {
            const formData = new FormData();
            formData.append("profilePic", file);

            const token = localStorage.getItem("token");

            const response = await axios.put(
                `${API_URL}/users/${userId}/profile-pic`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response.data; // { message, profilePic }
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Failed to upload profile picture"
            );
        }
    }
);
