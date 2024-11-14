import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../../store";

interface ReactionProps {
    id: number;
    publication_id: number;
    reaction: string;
    account_id: number;
    created_at: string;
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

export const reactionsApi = createApi({
    reducerPath: "reactionsApi",
    baseQuery,
    tagTypes: ["Reaction"],
    endpoints: (builder) => ({
        getAllReactionsByPublicationId: builder.query<ReactionProps[], number>({
            query: (publicationId) => `/publication/${publicationId}/reactions`,
            providesTags: (result, error, publicationId) =>
                result
                    ? [
                          ...result.map(
                              ({ id }) => ({ type: "Reaction", id } as const)
                          ),
                          { type: "Reaction", id: "LIST", publicationId },
                      ]
                    : [{ type: "Reaction", id: "LIST", publicationId }],
        }),
        addOrUpdateReaction: builder.mutation<
            void,
            { publicationId: number; reaction: string }
        >({
            query: ({ publicationId, reaction }) => ({
                url: `/publication/${publicationId}/react`,
                method: "POST",
                body: { reaction },
            }),
            invalidatesTags: (result, error, { publicationId }) => [
                { type: "Reaction", id: "LIST", publicationId },
            ],
        }),
        removeReaction: builder.mutation<void, number>({
            query: (publicationId) => ({
                url: `/publication/${publicationId}/react`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, publicationId) => [
                { type: "Reaction", id: "LIST", publicationId },
            ],
        }),
    }),
});

export const {
    useGetAllReactionsByPublicationIdQuery,
    useAddOrUpdateReactionMutation,
    useRemoveReactionMutation,
} = reactionsApi;
