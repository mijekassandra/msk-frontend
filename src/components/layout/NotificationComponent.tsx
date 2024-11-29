import React, { useState } from "react";
import {
    Popover,
    Stack,
    Typography,
    Box,
    Avatar,
    CircularProgress,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { formatDateTime } from "../../utils/dateTimeUtil";
import { useNavigate } from "react-router-dom";

interface NotificationComponentProps {
    anchorEl: HTMLElement | null;
    onClose: () => void;
    name?: string;
    action?: string;
    time?: string;
    viewed?: boolean;
}

// api service
import {
    useGetNotificationsQuery,
    useMarkNotificationAsReadMutation,
} from "../../features/Notification/api/notificationApi";

const NotificationComponent: React.FC<NotificationComponentProps> = ({
    anchorEl,
    onClose,
    action,
    time,
    viewed,
}) => {
    const open = Boolean(anchorEl);
    const id = open ? "notification-popover" : undefined;
    const navigate = useNavigate(); // Hook to handle navigation

    // logged in user role
    const userDetail = useSelector((state: RootState) => state.auth.user);

    const {
        data: notifications,
        isLoading,
        isError,
    } = useGetNotificationsQuery({
        account_id: userDetail.id,
    });
    const [markNotificationAsRead] = useMarkNotificationAsReadMutation();

    const handleMarkAsRead = async (id: any) => {
        try {
            // Call the mutation to mark the notification as read
            await markNotificationAsRead(id).unwrap();
            console.log(`Notification ${id} marked as read.`);
        } catch (error) {
            console.error("Failed to mark notification as read:", error);
        }
    };

    // Define the onClick handler
    const handleNotificationClick = async (type: any, id: number) => {
        try {
            // Mark notification as read first
            await handleMarkAsRead(id);

            // After marking as read, navigate to the appropriate page based on the type
            if (type === "publication") {
                navigate(`/publication/${id}`);
            } else if (type === "announcement") {
                navigate(`/announcement/${id}`);
            } else if (type === "activity") {
                navigate(`/activity/${id}`);
            }
        } catch (error) {
            console.error("Error while handling notification click:", error);
        }
    };

    return (
        <Popover
            id={id}
            open={open}
            onClose={onClose}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
        >
            <Box
                width={{
                    xs: "280px",
                    md: "350px",
                }}
            >
                <Stack
                    sx={{
                        backgroundColor: "#F5F5F5 ",
                        padding: "12px",
                        borderBottom: "1px solid #e7e7e8",
                    }}
                >
                    <Typography
                        variant="h5"
                        textAlign="center"
                        color="primary.main"
                    >
                        Notification
                    </Typography>
                </Stack>
                <Box sx={{ maxHeight: "360px", overflowY: "auto" }}>
                    {isLoading ? (
                        <Stack
                            alignItems="center"
                            justifyContent="center"
                            sx={{ minHeight: "200px" }}
                        >
                            <CircularProgress />
                        </Stack>
                    ) : isError ? (
                        <Typography
                            textAlign="center"
                            sx={{ padding: "16px", color: "red" }}
                        >
                            Failed to load notifications.
                        </Typography>
                    ) : notifications && notifications.length > 0 ? (
                        notifications.map((notification) => (
                            <Stack
                                key={notification.id}
                                direction="row"
                                // justifyContent="space-between"
                                alignItems="center"
                                gap={1}
                                sx={{
                                    padding: "8px 16px",
                                    minHeight: "60px",
                                    borderBottom: "1px solid #e7e7e8",
                                    background: notification.is_read
                                        ? "#ffffff"
                                        : "#f0f6ff",
                                    cursor: "pointer",
                                }}
                                onClick={() =>
                                    handleNotificationClick(
                                        notification.type,
                                        notification.id
                                    )
                                } // Handle routing on click
                            >
                                <Avatar sx={{ width: 40, height: 40 }} />
                                <Stack gap={0.5} width="-webkit-fill-available">
                                    <Typography
                                        variant="body2"
                                        fontWeight={600}
                                        color="#3e3e3e"
                                        lineHeight={1.3}
                                        textTransform="uppercase"
                                    >
                                        {notification.brgy_id !== null
                                            ? "CHAIRPERSON"
                                            : "FEDERATION"}{" "}
                                        {notification.type}
                                    </Typography>

                                    <Typography
                                        variant="body1"
                                        color="#3e3e3e"
                                        lineHeight={1.3}
                                        sx={{
                                            fontSize: "11px",
                                        }}
                                    >
                                        {notification.message}
                                    </Typography>

                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                    >
                                        <Typography
                                            variant="caption"
                                            color="#a6a6a7"
                                        >
                                            {formatDateTime(
                                                notification.created_at
                                            )}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            color={
                                                notification.is_read
                                                    ? "text.secondary"
                                                    : "primary.main"
                                            } // Change color based on read status
                                            sx={{
                                                "&:hover": {
                                                    cursor: "pointer",
                                                    color: "primary.dark",
                                                    textDecoration: "underline",
                                                },
                                            }}
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent triggering the onClick of the parent stack
                                                handleMarkAsRead(
                                                    notification.id
                                                );
                                            }}
                                        >
                                            {notification.is_read
                                                ? ""
                                                : "Mark as read"}
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </Stack>
                        ))
                    ) : (
                        <Typography
                            textAlign="center"
                            sx={{ padding: "16px", color: "#a6a6a7" }}
                        >
                            No notifications to show.
                        </Typography>
                    )}
                </Box>
            </Box>
        </Popover>
    );
};

export default NotificationComponent;
