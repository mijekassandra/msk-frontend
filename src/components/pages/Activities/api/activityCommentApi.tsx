import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../../../store";

interface FeedbackProps {
  id: number;
  feedback: string;
  rating: number;
  created_at: string;
  updated_at: string;
  activity_id: number;
  account_id: number;
  feedbback_by: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:4000",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.token;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// Define the API slice
export const activityFeedbackApi = createApi({
  reducerPath: "activityFeedbackApi",
  baseQuery,
  tagTypes: ["Feedback"],
  endpoints: (builder) => ({
    //! Fetch all attendance records
    getAllFeedbacksByActivityId: builder.query<FeedbackProps[], number>({
      // query: (id) => `/activity/${id}/feedbacks`,
      query: (id) => `/feedback?activity_id=${id}`,
      providesTags: (_result, _error, id) => [{ type: "Feedback", id }],
    }),
    getFeedbackById: builder.query<FeedbackProps, number>({
      query: (id) => `/feedback/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Feedback", id }],
    }),
    createFeedback: builder.mutation({
      query: ({
        feedback_id,
        activity_id,
        feedback,
        rating,
        account_id,
        feedback_by,
      }) => ({
        url: `/feedback`,
        method: "POST",
        body: {
          feedback_id,
          feedback,
          rating,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          activity_id,
          account_id,
          feedback_by,
        },
      }),
      invalidatesTags: (_result, _error, { activity_id }) => [
        { type: "Feedback", id: "LIST" },
        { type: "Feedback", id: activity_id },
      ],
    }),

    editFeedback: builder.mutation({
      query: ({ id, ...updates }) => ({
        url: `/feedback/${id}`,
        method: "PATCH",
        body: updates,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Feedback", id: "LIST" },
        { type: "Feedback", id },
      ],
    }),

    deleteFeedbackById: builder.mutation({
      query: (id) => ({
        url: `/feedback/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Feedback", id }],
    }),
  }),
});

export const {
  useGetAllFeedbacksByActivityIdQuery,
  useGetFeedbackByIdQuery,
  useCreateFeedbackMutation,
  useEditFeedbackMutation,
  useDeleteFeedbackByIdMutation,
} = activityFeedbackApi;
