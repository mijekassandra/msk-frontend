import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../../../../store";

export interface YouthProfilingProps {
    id: number;
    profile_img: string;
    first_name: string;
    last_name: string;
    middle_name: string;
    date_of_birth: string;
    address: string;
    civil_status: string;
    gender: string;
    religion: string;
    contact_number: string;
    voter_status: string;
    educational_attainment: string;
    educational_reason: string;
    occupation: string;
    agency: string;
    disability: string;
    medical_condition: string;
    youth_organization: string;
    skill: string;
    interest: string;
    brgy_id: number;
    account_id: number;
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

// define api service for youth profiling
export const youthProfilingApi = createApi({
    reducerPath: "youthProfilingApi",
    baseQuery,
    tagTypes: ["YouthProfiling"],
    endpoints: (builder) => ({
        getProfiles: builder.query<YouthProfilingProps[], void>({
            query: () => "/profiling",
            transformResponse: (response: { data: YouthProfilingProps[] }) =>
                response.data,
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(
                              ({ id }) =>
                                  ({ type: "YouthProfiling", id } as const)
                          ),
                          { type: "YouthProfiling", id: "LIST" },
                      ]
                    : [{ type: "YouthProfiling", id: "LIST" }],
        }),
        addYouthProfiling: builder.mutation<void, FormData>({
            query: (formData) => ({
                url: "/profiling",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: [{ type: "YouthProfiling", id: "LIST" }],
        }),

        editYouthProfiling: builder.mutation<
            void,
            { id: number; data: FormData }
        >({
            query: ({ id, data }) => ({
                url: `/profiling/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: "YouthProfiling", id: "LIST" },
                { type: "YouthProfiling", id },
            ],
        }),

        // deleteYouthProfiling: builder.mutation<void, number>({
        //     query: (id) => ({
        //         url: `youth_profilings/${id}`,
        //         method: "DELETE",
        //     }),
        //     invalidatesTags: (result, error, id) => [
        //         { type: "YouthProfiling", id },
        //         { type: "YouthProfiling", id: "YouthProfilingLIST" },
        //     ],
        // }),
    }),
});

export const {
    useGetProfilesQuery,
    useAddYouthProfilingMutation,
    useEditYouthProfilingMutation,
    // useDeleteYouthProfilingMutation,
} = youthProfilingApi;
