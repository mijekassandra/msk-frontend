import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface AccountProps {
    id: number;
    user_type: string;
    first_name: string;
    last_name: string;
    username: string;
    password: string;
    date_of_birth: string;
    gender: "Female" | "Male" | "Prefer not to say";
    address: string;
    email: string;
    date: string;
}

const { VITE_APP_ENDPOINT } = import.meta.env;

//define api service for accounts
export const accountApi = createApi({
    reducerPath: "accountApi",
    baseQuery: fetchBaseQuery({ baseUrl: VITE_APP_ENDPOINT }),
    tagTypes: ["Account"],
    endpoints: (builder) => ({
        getAccounts: builder.query<AccountProps[], void>({
            query: () => "accounts/",
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({ type: "Account", id } as const)),
                          { type: "Account", id: "AccountLIST" },
                      ]
                    : [{ type: "Account", id: "AccountLIST" }],
        }),
        getAccountByID: builder.query<AccountProps, number>({
            query: (id) => `accounts/${id}`,
            providesTags: (result, error, id) => [{ type: "Account", id }],
        }),
        addAccount: builder.mutation<void, Partial<AccountProps>>({
            query: (accountDetails) => ({
                url: "accounts/",
                method: "POST",
                body: accountDetails,
            }),
            invalidatesTags: [{ type: "Account", id: "AccountLIST" }], // Invalidate the list to refetch
        }),
        editAccount: builder.mutation<void, { id: number; account: object }>({
            query: ({ id, account }) => ({
                url: `accounts/${id}`,
                method: "PATCH",
                body: account,
            }),
            invalidatesTags: [{ type: "Account", id: "AccountLIST" }], // Invalidate the list to refetch
        }),
        deleteAccount: builder.mutation<void, number>({
            query: (id) => ({
                url: `accounts/${id}`, // Use id in the URL
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => [
                { type: "Account", id },
                { type: "Account", id: "AccountLIST" },
            ],
        }),
    }),
});

export const {
    useGetAccountsQuery,
    useGetAccountByIDQuery,
    useAddAccountMutation,
    useEditAccountMutation,
    useDeleteAccountMutation,
} = accountApi;
