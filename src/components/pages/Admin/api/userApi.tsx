import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../../../store";
import { useSelector } from "react-redux";

interface UserProps {
  id: number;
  user_type: string;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  date_of_birth: string;
  gender: "Female" | "Male" | "No Preference";
  address: string;
  email: string;
  date: string;
}

interface AccountProps {
  id: number;
  email: string;
  role: string;
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

//define api service for accounts
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query<AccountProps[], void>({
      query: () => "/users",
      transformResponse: (response: { data: AccountProps[] }) => response.data,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "User", id } as const)),
              { type: "User", id: "UserLIST" },
            ]
          : [{ type: "User", id: "UserLIST" }],
    }),
    getUserByID: builder.query<UserProps, number>({
      query: (id) => `/users/${id}`,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),
    registerUser: builder.mutation<void, Partial<AccountProps>>({
      query: (accountDetails) => ({
        url: "/register",
        method: "POST",
        body: accountDetails,
      }),
      invalidatesTags: [{ type: "User", id: "UserLIST" }], // Invalidate the list to refetch
    }),
    editUser: builder.mutation<void, { id: number; account: object }>({
      query: ({ id, account }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        body: account,
      }),
      invalidatesTags: [{ type: "User", id: "UserLIST" }], // Invalidate the list to refetch
    }),
    deleteUser: builder.mutation<void, number>({
      query: (id) => ({
        url: `/user/${id}`, // Use id in the URL
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "User", id },
        { type: "User", id: "UserLIST" },
      ],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIDQuery,
  useRegisterUserMutation,
  useEditUserMutation,
  useDeleteUserMutation,
} = userApi;
