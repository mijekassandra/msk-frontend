import { createSlice } from "@reduxjs/toolkit";

const persistedToken = localStorage.getItem("token");
const persistedUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
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
            if (state.user) {
                state.user = {
                    ...state.user, // Keep existing properties like "role"
                    ...action.payload, // Override with updated profile properties
                    profile_img:
                        action.payload.profileImgPath || state.user.profile_img,
                };
                localStorage.setItem("user", JSON.stringify(state.user));
            }
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
