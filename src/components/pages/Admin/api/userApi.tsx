import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../../../store";

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

// Define API service for accounts
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    // Fetch all users
    getUsers: builder.query<AccountProps[], void>({
      query: () => "/users",
      transformResponse: (response: { data: AccountProps[] }) => response.data,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "User", id } as const)),
              { type: "User", id: "LIST" },
            ]
          : [{ type: "User", id: "LIST" }],
    }),

    // Fetch a user by ID
    getUserByID: builder.query<UserProps, number>({
      query: (id) => `/users/${id}`,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),

    // Register a new user
    registerUser: builder.mutation<
      { data: AccountProps },
      Partial<AccountProps>
    >({
      query: (accountDetails) => ({
        url: "/register",
        method: "POST",
        body: accountDetails,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),

    // Edit an existing user
    editUser: builder.mutation<
      void,
      { id: number; account: Partial<AccountProps> }
    >({
      query: ({ id, account }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: account,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "User", id },
        { type: "User", id: "LIST" },
      ],
    }),

    // Changes a user's status, deac or activate
    changeAccountStatus: builder.mutation<void, number>({
      query: (id) => ({
        url: `/user/${id}/change-status`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "User", id },
        { type: "User", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIDQuery,
  useRegisterUserMutation,
  useEditUserMutation,
  useChangeAccountStatusMutation,
} = userApi;
