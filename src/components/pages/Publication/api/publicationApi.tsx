import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface PublicationProps {
    id: number;
    publication_title: string;
    publicaton_type: string;
    publication_content: string;
    date: string;
    // user_id: number;
}

const { VITE_APP_ENDPOINT } = import.meta.env;

export const publicationApi = createApi({
    reducerPath: "publicationApi",
    baseQuery: fetchBaseQuery({ baseUrl: VITE_APP_ENDPOINT }),
    tagTypes: ["Publication"],
    endpoints: (builder) => ({
        getPublications: builder.query<PublicationProps[], void>({
            query: () => "publications/",
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({ type: "Publication", id } as const)),
                          { type: "Publication", id: "PublicationLIST" },
                      ]
                    : [{ type: "Publication", id: "PublicationLIST" }],
        }),
        getPublicationByID: builder.query<PublicationProps, number>({
            query: (id) => `publications/${id}`, // Use id in the URL
            providesTags: (result, error, id) => [{ type: "Publication", id }],
        }),
        addPublication: builder.mutation<void, Partial<PublicationProps>>({
            query: (publicationDetails) => ({
                url: "publications/",
                method: "POST",
                body: publicationDetails,
            }),
            invalidatesTags: [{ type: "Publication", id: "PublicationLIST" }],
        }),
        editPublication: builder.mutation<void, { id: number; publication: object }>({
            query: ({ id, publication }) => ({
                url: `publications/${id}`,
                method: "PATCH",
                body: publication,
            }),
            invalidatesTags: [{ type: "Publication", id: "PublicationLIST" }],
        }),
        deletePublication: builder.mutation<PublicationProps, number>({
            query: (id) => ({
                url: `publication/${id}`, // Use id in the URL
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => [{ type: "Publication", id }],
        }),
    }),
});

export const {
    useGetPublicationsQuery,
    useGetPublicationByIDQuery,
    useAddPublicationMutation,
    useEditPublicationMutation,
    useDeletePublicationMutation,
} = publicationApi;
