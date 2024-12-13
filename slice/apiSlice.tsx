import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./../src/store";

const { VITE_APP_ENDPOINT } = import.meta.env;

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: VITE_APP_ENDPOINT,
        prepareHeaders: (headers, { getState }) => {
            const state = getState() as RootState;
            const token = state.auth.token; // Access the token

            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["User"],
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: "/login",
                method: "POST",
                body: credentials,
                invalidatesTags: ["User"],
            }),
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: "/logout",
                method: "POST",
                invalidatesTags: ["User"],
            }),
        }),
    }),
});

export const { useLoginMutation, useLogoutMutation } = apiSlice;
