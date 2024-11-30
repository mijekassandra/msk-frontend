import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../../store";

interface NotificationProps {
    id: number;
    account_id: number;
    brgy_id: number | null;
    type: string;
    message: string;
    is_read: boolean;
    created_at: string;
    source_id: number;
}

interface NotifyRequest {
    brgy_id?: number;
    type: string;
    message: string;
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

export const notificationApi = createApi({
    reducerPath: "notificationApi",
    baseQuery,
    tagTypes: ["Notifications"], // Adjusted for consistency
    endpoints: (builder) => ({
        //! Fetch notifications for a user
        getNotifications: builder.query<
            NotificationProps[],
            { account_id: number; brgy_id?: number }
        >({
            query: ({ account_id, brgy_id }) => {
                const params = new URLSearchParams();
                params.append("account_id", account_id.toString());
                if (brgy_id) params.append("brgy_id", brgy_id.toString());
                const url = `/notifications?${params.toString()}`;
                return url;
            },
            providesTags: (result) =>
                Array.isArray(result)
                    ? [
                          ...result.map(
                              ({ id }) =>
                                  ({ type: "Notifications", id } as const)
                          ),
                          { type: "Notifications", id: "LIST" },
                      ]
                    : [{ type: "Notifications", id: "LIST" }],
        }),

        //! Send a notification
        notifyUsers: builder.mutation<void, NotifyRequest>({
            query: (body) => ({
                url: "/notify",
                method: "POST",
                body,
            }),
            invalidatesTags: [{ type: "Notifications", id: "LIST" }],
        }),

        //! Mark a notification as read
        markNotificationAsRead: builder.mutation<void, number>({
            query: (id) => ({
                url: `/${id}/read`,
                method: "PATCH",
            }),
            invalidatesTags: [{ type: "Notifications", id: "LIST" }],
        }),
    }),
});

export const {
    useGetNotificationsQuery,
    useNotifyUsersMutation,
    useMarkNotificationAsReadMutation,
} = notificationApi;
