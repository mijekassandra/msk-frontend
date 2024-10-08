import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./../../../../store";

interface PublicationProps {
  id: number;
  title: string;
  type: string;
  content: string;
  attachment: File;
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

export const publicationApi = createApi({
  reducerPath: "publicationApi",
  baseQuery,
  tagTypes: ["Publication"],
  endpoints: (builder) => ({
    getPublications: builder.query<PublicationProps[], void>({
      query: () => "publication/",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Publication", id } as const)),
              { type: "Publication", id: "PublicationLIST" },
            ]
          : [{ type: "Publication", id: "PublicationLIST" }],
    }),
    getPublicationByID: builder.query<PublicationProps, number>({
      query: (id) => `publication/${id}`, // Use id in the URL
      providesTags: (result, error, id) => [{ type: "Publication", id }],
    }),
    addPublication: builder.mutation<void, Partial<PublicationProps>>({
      query: (publicationDetails) => {
        const formData = new FormData();
        formData.append("title", publicationDetails.title || "");
        formData.append("content", publicationDetails.content || "");

        if (publicationDetails.attachment) {
          formData.append("attachment", publicationDetails.attachment);
        }

        return {
          url: "publication/",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: [{ type: "Publication", id: "PublicationLIST" }],
    }),
    editPublication: builder.mutation<
      void,
      { id: number; publication: object }
    >({
      query: ({ id, publication }) => ({
        url: `publication/${id}`,
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
