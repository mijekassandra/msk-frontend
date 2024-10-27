import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../../../store";

interface ActivityApiProps {
    id: number;
    title: string;
    type: string;
    content: string;
    attachment: File | null;
    created_at: string;
    barangay: string;
    status: string;
}

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

// Define your API service
export const activityApi = createApi({
    reducerPath: "activityApi",
    baseQuery,
    tagTypes: ["Activity"],
    endpoints: (builder) => ({
        getActivties: builder.query<ActivityApiProps[], void>({
            query: () => "/activities",
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(
                              ({ id }) => ({ type: "Activity", id } as const)
                          ),
                          { type: "Activity", id: "ActivityLIST" },
                      ]
                    : [{ type: "Activity", id: "ActivityLIST" }],
        }),
        getActivityByID: builder.query<ActivityApiProps, number>({
            query: (id) => `/activity/${id}`, // Use id in the URL
            providesTags: (result, error, id) => [{ type: "Activity", id }],
        }),
        addActivity: builder.mutation<void, Partial<ActivityApiProps>>({
            query: (formData) => {
                console.log("Activity Details:", formData);

                return {
                    url: "/activity",
                    method: "POST",
                    body: formData,
                };
            },
            invalidatesTags: [{ type: "Activity", id: "ActivityLIST" }],
        }),
        editActivity: builder.mutation<void, { id: number; activity: object }>({
            query: ({ id, activity }) => ({
                url: `/activity/${id}`,
                method: "PUT",
                body: activity,
            }),
            invalidatesTags: [{ type: "Activity", id: "ActivityLIST" }],
        }),
    }),
});

export const {
    useGetActivtiesQuery,
    useGetActivityByIDQuery,
    useAddActivityMutation,
    useEditActivityMutation,
} = activityApi;
