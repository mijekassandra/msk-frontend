import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./../../../../store";

interface PublicationProps {
    id: number;
    title: string;
    type: string;
    content: string;
    attachment: File | null;
    created_at: string;
    barangay: string;
    status: string;
    totalRating: number;
}

interface FeedbackProps {
    id: number;
    feedback: string;
    created_at: string;
    updated_at: string;
    publication_id: number;
    account_id: number;
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
export const publicationApi = createApi({
    reducerPath: "publicationApi",
    baseQuery,
    tagTypes: ["Publication", "Feedback"],
    endpoints: (builder) => ({
        //TODO --------------------- PUBLICATION QUERY -------------------------

        getPublications: builder.query<PublicationProps[], void>({
            query: () => "/publications",
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(
                              ({ id }) => ({ type: "Publication", id } as const)
                          ),
                          { type: "Publication", id: "LIST" },
                      ]
                    : [{ type: "Publication", id: "LIST" }],
        }),
        getPublicationByID: builder.query<PublicationProps, number>({
            query: (id) => `/publication/${id}`,
            providesTags: (result, error, id) => [{ type: "Publication", id }],
        }),
        addPublication: builder.mutation<void, FormData>({
            query: (formData) => {
                console.log("Publication Details:", formData);

                return {
                    url: "/publication",
                    method: "POST",
                    body: formData,
                };
            },
            invalidatesTags: [{ type: "Publication", id: "LIST" }],
        }),

        editPublication: builder.mutation<
            void,
            { id: number; publication: object }
        >({
            query: ({ id, publication }) => ({
                url: `/publication/${id}`,
                method: "PUT",
                body: publication,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: "Publication", id: "LIST" },
                { type: "Publication", id },
            ],
        }),
        //TODO --------------------- FEEDBACKS QUERY -------------------------

        getAllFeedbacksByPublicationId: builder.query<FeedbackProps, number>({
            query: (id) => `/publication/${id}/feedbacks`,
            providesTags: (result, error, id) => [{ type: "Feedback", id }],
        }),
        getFeedbackById: builder.query<FeedbackProps, number>({
            query: (id) => `/feedback/${id}`,
            providesTags: (result, error, id) => [{ type: "Feedback", id }],
        }),
        createFeedback: builder.mutation({
            query: ({ id, feedback, rating }) => ({
                url: `publication/${id}/feedback`,
                method: "POST",
                body: { feedback, rating },
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: "Feedback", id: "LIST" },
                { type: "Feedback", id },
            ],
        }),
        editFeedback: builder.mutation<void, { id: number; feedback: string }>({
            query: ({ id, feedback }) => ({
                url: `/feedback/${id}`,
                method: "PUT",
                body: { feedback }, // Nested feedback structure
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: "Feedback", id: "LIST" },
                { type: "Feedback", id },
            ],
        }),
        deleteFeedbackById: builder.mutation({
            query: (id) => ({
                url: `/feedback/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: "Feedback", id },
            ],
        }),
    }),
});

export const {
    useGetPublicationsQuery,
    useGetPublicationByIDQuery,
    useAddPublicationMutation,
    useEditPublicationMutation,
    useGetAllFeedbacksByPublicationIdQuery,
    useGetFeedbackByIdQuery,
    useCreateFeedbackMutation,
    useEditFeedbackMutation,
    useDeleteFeedbackByIdMutation,
} = publicationApi;
