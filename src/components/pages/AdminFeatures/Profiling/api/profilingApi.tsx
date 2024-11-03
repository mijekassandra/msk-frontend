import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
}

const { VITE_APP_ENDPOINT } = import.meta.env;

// define api service for youth profiling
export const youthProfilingApi = createApi({
    reducerPath: "youthProfilingApi",
    baseQuery: fetchBaseQuery({ baseUrl: VITE_APP_ENDPOINT }),
    tagTypes: ["YouthProfiling"],
    endpoints: (builder) => ({
        addYouthProfiling: builder.mutation<void, FormData>({
            query: (formData) => ({
                url: "/profiling",
                method: "PUT",
                body: formData,
            }),
            invalidatesTags: [
                { type: "YouthProfiling", id: "YouthProfilingLIST" },
            ],
        }),
        editYouthProfiling: builder.mutation<
            void,
            { id: number; data: FormData }
        >({
            query: ({ id, data }) => ({
                url: `/profiling/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: [
                { type: "YouthProfiling", id: "YouthProfilingLIST" },
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
    useAddYouthProfilingMutation,
    useEditYouthProfilingMutation,
    // useDeleteYouthProfilingMutation,
} = youthProfilingApi;
