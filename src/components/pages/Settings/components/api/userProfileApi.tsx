import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../../../../store";
import { updateProfileSuccess } from "../../../../../../slice/authSlice";

const { VITE_APP_ENDPOINT } = import.meta.env;

const baseQuery = fetchBaseQuery({
    baseUrl: VITE_APP_ENDPOINT,
    prepareHeaders: (headers, { getState }) => {
        const state = getState() as RootState;
        const token = state.auth.token;

        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

// Define the API slice
export const userProfile = createApi({
    reducerPath: "userProfile",
    baseQuery,
    tagTypes: ["UserProfile"],
    endpoints: (builder) => ({
        // Get profile endpoint
        getUserProfile: builder.query({
            query: () => "/profile",
            providesTags: ["UserProfile"],
        }),

        // Update profile endpoint with dispatch to update the userDetails
        updateProfile: builder.mutation({
            query: (formData) => ({
                url: "/profile",
                method: "PUT",
                body: formData,
            }),
            invalidatesTags: ["UserProfile"],
            async onQueryStarted(formData, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(updateProfileSuccess(data));
                } catch (error) {
                    console.error("Update profile failed:", error);
                }
            },
        }),

        // Change password endpoint
        changePassword: builder.mutation({
            query: ({ oldPassword, newPassword, confirmPassword }) => ({
                url: "/change-password",
                method: "PUT",
                body: { oldPassword, newPassword, confirmPassword },
            }),
            invalidatesTags: ["UserProfile"],
        }),
    }),
});

export const {
    useGetUserProfileQuery,
    useUpdateProfileMutation,
    useChangePasswordMutation,
} = userProfile;
