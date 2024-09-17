import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface SkFileApiProps {
    id: number;
    file_name: string;
    file_size: number;
    file_type: string;
    upload_date: string; // ISO date string
}

const { VITE_APP_ENDPOINT } = import.meta.env;

export const skFileApi = createApi({
    reducerPath: "skFilesApi",
    baseQuery: fetchBaseQuery({ baseUrl: VITE_APP_ENDPOINT }), // Change this to your API base URL
    tagTypes: ["SKFile"],
    endpoints: (builder) => ({
        getSkFiles: builder.query<SkFileApiProps[], void>({
            query: () => "sk_files/",
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({ type: "SKFile", id } as const)),
                          { type: "SKFile", id: "SKFileLIST" },
                      ]
                    : [{ type: "SKFile", id: "SKFileLIST" }],
        }),
        uploadSkFile: builder.mutation<SkFileApiProps, Partial<SkFileApiProps>>({
            query: (newFile) => ({
                url: "sk_files/",
                method: "POST",
                body: newFile,
            }),
            invalidatesTags: ["SKFile"],
        }),
        deleteSkFile: builder.mutation<void, number>({
            query: (id) => ({
                url: `sk_files/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["SKFile"],
        }),
    }),
});

export const { useGetSkFilesQuery, useUploadSkFileMutation, useDeleteSkFileMutation } = skFileApi;
