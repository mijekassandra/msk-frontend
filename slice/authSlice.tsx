import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.data;
    },
    logoutSuccess: (state) => {
      state.token = null;
      state.user = null;
    },
    updateProfileSuccess: (state, action) => {
      if (state.user) {
        state.user = {
          ...state.user, // Keep existing properties like "role"
          ...action.payload, // Override with updated profile properties
        };
      }
    },
  },
});

export const { loginSuccess, logoutSuccess, updateProfileSuccess } =
  authSlice.actions;
export default authSlice.reducer;
