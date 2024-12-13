import { createSlice } from "@reduxjs/toolkit";

const persistedToken = localStorage.getItem("token");
const persistedUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") || "")
    : null;

const initialState = {
    token: persistedToken || null,
    user: persistedUser || null,
    successMessage: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.data;
            state.successMessage = action.payload.message;

            // Persist token and user in localStorage
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("user", JSON.stringify(action.payload.data));
        },
        logoutSuccess: (state) => {
            state.token = null;
            state.user = null;

            // Clear token and user from localStorage
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },
        updateProfileSuccess: (state, action) => {
            // Check if action.payload contains a `data` field, then flatten it
            const updatedUser = action.payload.data
                ? { ...action.payload.data }
                : { ...action.payload };

            state.user = {
                ...state.user,
                ...updatedUser,
                profile_img:
                    action.payload.data?.profileImgPath ||
                    state.user.profile_img,
            };
        },
        clearSuccessMessage: (state) => {
            state.successMessage = null;
        },
    },
});

export const {
    loginSuccess,
    logoutSuccess,
    updateProfileSuccess,
    clearSuccessMessage,
} = authSlice.actions;
export default authSlice.reducer;
