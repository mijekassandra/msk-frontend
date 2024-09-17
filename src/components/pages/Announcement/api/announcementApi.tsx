import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface AnnouncementProps {
    id: number;
    announcement_title: string;
    announcement_type: string;
    announcement_content: string;
    date: string;
    announcement_status: string;
    // user_id: number;
}

const { VITE_APP_ENDPOINT } = import.meta.env;

// Define your API service
export const announcementApi = createApi({
    reducerPath: "announcementApi",
    baseQuery: fetchBaseQuery({ baseUrl: VITE_APP_ENDPOINT }),
    tagTypes: ["Announcement"],
    endpoints: (builder) => ({
        getAnnouncements: builder.query<AnnouncementProps[], void>({
            query: () => "announcements/",
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({ type: "Announcement", id } as const)),
                          { type: "Announcement", id: "AnnouncementLIST" },
                      ]
                    : [{ type: "Announcement", id: "AnnouncementLIST" }],
        }),
        getAnnouncementByID: builder.query<AnnouncementProps, number>({
            query: (id) => `announcements/${id}`, // Use id in the URL
            providesTags: (result, error, id) => [{ type: "Announcement", id }],
        }),
        addAnnouncement: builder.mutation<void, Partial<AnnouncementProps>>({
            query: (announcementDetails) => ({
                url: "announcements/",
                method: "POST",
                body: announcementDetails,
            }),
            invalidatesTags: [{ type: "Announcement", id: "AnnouncementLIST" }], // Invalidate the list to refetch
        }),
        editAnnouncement: builder.mutation<void, { id: number; announcement: object }>({
            query: ({ id, announcement }) => ({
                url: `announcements/${id}`,
                method: "PATCH",
                body: announcement,
            }),
            invalidatesTags: [{ type: "Announcement", id: "AnnouncementLIST" }], // Invalidate the list to refetch
        }),
        deleteAnnouncement: builder.mutation<void, number>({
            query: (id) => ({
                url: `announcements/${id}`, // Use id in the URL
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => [
                { type: "Announcement", id },
                { type: "Announcement", id: "AnnouncementLIST" },
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
