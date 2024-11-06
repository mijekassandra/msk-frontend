import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../../../store";

interface AnnouncementProps {
    id: number;
    title: string;
    type: string;
    content: string;
    status: string;
    created_at: string;
    attachment: File | null;
    barangay: string;
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
export const announcementApi = createApi({
    reducerPath: "announcementApi",
    baseQuery,
    tagTypes: ["Announcement"],
    endpoints: (builder) => ({
        getAnnouncements: builder.query<AnnouncementProps[], void>({
            query: () => "/announcements",
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(
                              ({ id }) =>
                                  ({ type: "Announcement", id } as const)
                          ),
                          { type: "Announcement", id: "LIST" },
                      ]
                    : [{ type: "Announcement", id: "LIST" }],
        }),
        getAnnouncementByID: builder.query<AnnouncementProps, number>({
            query: (id) => `/announcement/${id}`,
            providesTags: (result, error, id) => [{ type: "Announcement", id }],
        }),
        addAnnouncement: builder.mutation<void, FormData>({
            query: (formData) => {
                console.log("Publication Details:", formData);

                return {
                    url: "/announcement",
                    method: "POST",
                    body: formData,
                };
            },
            invalidatesTags: [{ type: "Announcement", id: "LIST" }],
        }),
        editAnnouncement: builder.mutation<
            void,
            { id: number; announcement: object }
        >({
            query: ({ id, announcement }) => ({
                url: `/announcement/${id}`,
                method: "PUT",
                body: announcement,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: "Announcement", id: "LIST" },
                { type: "Announcement", id },
            ],
        }),
        deleteAnnouncement: builder.mutation<void, number>({
            query: (id) => ({
                url: `/announcement/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => [
                { type: "Announcement", id },
                { type: "Announcement", id: "LIST" },
            ],
        }),
    }),
});

export const {
    useGetAnnouncementsQuery,
    useGetAnnouncementByIDQuery,
    useAddAnnouncementMutation,
    useEditAnnouncementMutation,
    useDeleteAnnouncementMutation,
} = announcementApi;
