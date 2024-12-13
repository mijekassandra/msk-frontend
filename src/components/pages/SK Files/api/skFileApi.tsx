import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../../../store";

interface SkFileApiProps {
    id: number;
    file_name: string;
    file_type: string;
    attachment: string;
    description: string;
    account_id: number;
}

interface AllSkFilesProps {
    status: string;
    message: string;
    skFiles: SkFileApiProps[];
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

export const skFileApi = createApi({
    reducerPath: "skFilesApi",
    baseQuery,
    tagTypes: ["SKFile"],
    endpoints: (builder) => ({
        getSkFiles: builder.query<AllSkFilesProps, void>({
            query: () => "/sk-file",
            providesTags: (result) =>
                result?.skFiles
                    ? [
                          ...result.skFiles.map(
                              ({ id }) => ({ type: "SKFile", id } as const)
                          ),
                          { type: "SKFile", id: "LIST" },
                      ]
                    : [{ type: "SKFile", id: "LIST" }],
        }),
        uploadSkFile: builder.mutation<void, FormData>({
            query: (formData) => ({
                url: "/sk-file",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: [{ type: "SKFile", id: "LIST" }],
            async onQueryStarted(_arg, { queryFulfilled }) {
                try {
                    await queryFulfilled;
                } catch (error) {
                    console.error("Error occurred during upload:", error);
                }
            },
        }),

        updateSkFileById: builder.mutation<
            void,
            { id: number; uploadedFile: object }
        >({
            query: ({ id, uploadedFile }) => ({
                url: `/sk-file/${id}`,
                method: "PUT",
                body: uploadedFile,
            }),
            invalidatesTags: (_result, _error, { id }) => [
                { type: "SKFile", id: "LIST" },
                { type: "SKFile", id },
            ],
        }),
        deleteSkFile: builder.mutation<void, number>({
            query: (id) => ({
                url: `/sk-file/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (_result, _error, id) => [
                { type: "SKFile", id: "LIST" },
                { type: "SKFile", id },
            ],
        }),
    }),
});

export const {
    useGetSkFilesQuery,
    useUploadSkFileMutation,
    useUpdateSkFileByIdMutation,
    useDeleteSkFileMutation,
} = skFileApi;
