import { createSlice } from "@reduxjs/toolkit";

const savedUser = localStorage.getItem("loggedInUser");

const initialState = {
  isAuthenticated: Boolean(savedUser),
  user: savedUser || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem("loggedInUser", action.payload);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("loggedInUser");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;