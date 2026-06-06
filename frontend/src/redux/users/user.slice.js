import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers, fetchCurrentUser, updateUser, deleteUser, uploadProfilePic } from "./user.thunk";

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    user:null,
    loading: false,
    error: null,
    successMessage: null, 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //fetch single user
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update user
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "User updated successfully";

        //Update the user directly in users array
        const updatedUser = action.meta.arg; // { email, username }
        const index = state.users.findIndex((u) => u.email === updatedUser.email);
        if (index !== -1) {
          state.users[index].username = updatedUser.username;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete user
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "User deleted successfully";

        //Remove the deleted user directly from users array
        const deletedEmail = action.payload.email;
        state.users = state.users.filter((u) => u.email !== deletedEmail);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //upload profile pic
      .addCase(uploadProfilePic.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(uploadProfilePic.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      
        // update profilePic in user object
        if (state.user) {
          state.user.profilePic = action.payload.profilePic;
        }
      
        // also update user in users array if needed
        const index = state.users.findIndex(u => u.id === action.meta.arg.userId);
        if (index !== -1) {
          state.users[index].profilePic = action.payload.profilePic;
        }
      })
      .addCase(uploadProfilePic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
