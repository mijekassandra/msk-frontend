import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../../../../store";

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
export const attendanceApi = createApi({
  reducerPath: "attendanceApi",
  baseQuery,
  tagTypes: ["Attendance"],
  endpoints: (builder) => ({
    //! Fetch all attendance records
    getAllAttendance: builder.query({
      query: () => "/attendance",
      providesTags: ["Attendance"],
    }),

    //! Fetch attendance by activity
    getAttendanceByActivity: builder.query({
      query: (activityId) => `/attendance?activity_id=${activityId}`,
      providesTags: ["Attendance"],
    }),

    //! Add new attendance record
    addAttendance: builder.mutation({
      query: (newAttendance) => ({
        url: "/attendance",
        method: "POST",
        body: newAttendance,
      }),
      invalidatesTags: ["Attendance"],
    }),
  }),
});

export const {
  useGetAllAttendanceQuery,
  useGetAttendanceByActivityQuery,
  useAddAttendanceMutation,
} = attendanceApi;
