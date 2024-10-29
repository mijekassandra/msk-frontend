import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface YouthProfilingProps {
    id: number;
    first_name: string;
    last_name: string;
    middle_name: string;
    date_of_birth: string;
    civil_status: string;
    sex: string;
    religion: string;
    contact_no: string;
    email: string;
    vote_status: string;
    address: string;
    educational_attainment: string;
    skill: string;
    interest: string;
    date: string;
}

const { VITE_APP_ENDPOINT } = import.meta.env;

// define api service for youth profiling
export const youthProfilingApi = createApi({
    reducerPath: "youthProfilingApi",
    baseQuery: fetchBaseQuery({ baseUrl: VITE_APP_ENDPOINT }),
    tagTypes: ["YouthProfiling"],
    endpoints: (builder) => ({
        getYouthProfilings: builder.query<YouthProfilingProps[], void>({
            query: () => "youth_profilings/",
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(
                              ({ id }) =>
                                  ({ type: "YouthProfiling", id } as const)
                          ),
                          { type: "YouthProfiling", id: "YouthProfilingLIST" },
                      ]
                    : [{ type: "YouthProfiling", id: "YouthProfilingLIST" }],
        }),
        getYouthProfilingByID: builder.query<YouthProfilingProps, number>({
            query: (id) => `youth_profilings/${id}`,
            providesTags: (result, error, id) => [
                { type: "YouthProfiling", id },
            ],
        }),
        addYouthProfiling: builder.mutation<void, Partial<YouthProfilingProps>>(
            {
                query: (data) => ({
                    url: "youth_profilings/",
                    method: "POST",
                    body: data,
                }),
                invalidatesTags: [
                    { type: "YouthProfiling", id: "YouthProfilingLIST" },
                ],
            }
        ),
        editYouthProfiling: builder.mutation<
            void,
            { id: number; data: object }
        >({
            query: ({ id, data }) => ({
                url: `youth_profilings/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: [
                { type: "YouthProfiling", id: "YouthProfilingLIST" },
            ],
        }),
        deleteYouthProfiling: builder.mutation<void, number>({
            query: (id) => ({
                url: `youth_profilings/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => [
                { type: "YouthProfiling", id },
                { type: "YouthProfiling", id: "YouthProfilingLIST" },
            ],
        }),
    }),
});

export const {
    useGetYouthProfilingsQuery,
    useGetYouthProfilingByIDQuery,
    useAddYouthProfilingMutation,
    useEditYouthProfilingMutation,
    useDeleteYouthProfilingMutation,
} = youthProfilingApi;
