import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface ActivityApiProps {
    id: number;
    publication_title: string;
    publicaton_type: string;
    publication_content: string;
    date: string;
    // user_id: number;
}

const { VITE_APP_ENDPOINT } = import.meta.env;

export const activityApi = createApi({
    reducerPath: "activityApi",
    baseQuery: fetchBaseQuery({ baseUrl: VITE_APP_ENDPOINT }),
    tagTypes: ["Activity"],
    endpoints: (builder) => ({
        getActivties: builder.query<ActivityApiProps[], void>({
            query: () => "activities/",
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({ type: "Activity", id } as const)),
                          { type: "Activity", id: "ActivityLIST" },
                      ]
                    : [{ type: "Activity", id: "ActivityLIST" }],
        }),
        getActivityByID: builder.query<ActivityApiProps, number>({
            query: (id) => `activities/${id}`, // Use id in the URL
            providesTags: (result, error, id) => [{ type: "Activity", id }],
        }),
        addActivity: builder.mutation<void, Partial<ActivityApiProps>>({
            query: (activityDetails) => ({
                url: "activities/",
                method: "POST",
                body: activityDetails,
            }),
            invalidatesTags: [{ type: "Activity", id: "ActivityLIST" }],
        }),
        editActivity: builder.mutation<void, { id: number; activity: object }>({
            query: ({ id, activity }) => ({
                url: `activities/${id}`,
                method: "PATCH",
                body: activity,
            }),
            invalidatesTags: [{ type: "Activity", id: "ActivityLIST" }],
        }),
        deleteActivity: builder.mutation<ActivityApiProps, number>({
            query: (id) => ({
                url: `activities/${id}`, // Use id in the URL
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => [{ type: "Activity", id }],
        }),
    }),
});

export const {
    useGetActivtiesQuery,
    useGetActivityByIDQuery,
    useAddActivityMutation,
    useEditActivityMutation,
    useDeleteActivityMutation,
} = activityApi;
