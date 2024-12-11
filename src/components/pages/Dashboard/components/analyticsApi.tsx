import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../../../store";

const { VITE_APP_ENDPOINT } = import.meta.env;

interface AnalyticsResponse {
    Population: number;
    "Active Voters": number;
    "Inactive Voters": number;
    "Out of School Youth": number;
    "In School Youth": number;
    "Non-working Individuals": number;
    "Working Individuals": number;
    "Not Part of Youth Organization": number;
    "Part of Youth Organization": number;
    "Has Medical Condition": number;
    "No Medical Condition": number;
    "With Disability": number;
    "No Disability": number;
}

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

export const analyticsApi = createApi({
    reducerPath: "analyticsApi",
    baseQuery,
    tagTypes: ["Analytics"],
    endpoints: (builder) => ({
        getAnalytics: builder.query<AnalyticsResponse, void>({
            query: () => ({
                url: "/analytics",
                method: "GET",
            }),
            providesTags: ["Analytics"],
        }),
    }),
});

export const { useGetAnalyticsQuery } = analyticsApi;
