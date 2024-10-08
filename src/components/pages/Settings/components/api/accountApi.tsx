import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../../../../store";

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
export const accountApi = createApi({
  reducerPath: "accountApi",
  baseQuery,
  tagTypes: ["Account"],
  endpoints: (builder) => ({
    // Get profile endpoint
    getUserProfile: builder.query({
      query: () => "/profile",
      providesTags: ["Account"],
    }),

    // Update profile endpoint
    updateProfile: builder.mutation({
      query: (formData) => ({
        url: "/profile",
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Account"],
    }),

    // Change password endpoint
    changePassword: builder.mutation({
      query: ({ oldPassword, newPassword, confirmPassword }) => ({
        url: "/change-password",
        method: "PUT",
        body: { oldPassword, newPassword, confirmPassword },
      }),
      invalidatesTags: ["Account"],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetUserProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} = accountApi;
