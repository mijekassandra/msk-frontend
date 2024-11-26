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

interface NotificationComponentProps {
    anchorEl: HTMLElement | null;
    onClose: () => void;
    name: string;
    action: string;
    time: string;
    viewed: boolean;
}

// api service
import { useGetNotificationsQuery } from "../../features/Notification/api/notificationApi";

const NotificationComponent: React.FC<NotificationComponentProps> = ({
    anchorEl,
    onClose,
    action,
    time,
    viewed,
}) => {
    const open = Boolean(anchorEl);
    const id = open ? "notification-popover" : undefined;

    // logged in user role
    const userDetail = useSelector((state: RootState) => state.auth.user);

    const {
        data: notifications,
        isLoading,
        isError,
    } = useGetNotificationsQuery({
        account_id: userDetail.id,
    });

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
                    xs: "250px",
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
                                alignItems="center"
                                gap={1}
                                sx={{
                                    padding: "6px 12px",
                                    minHeight: "60px",
                                    borderBottom: "1px solid #e7e7e8",
                                    background: notification.is_read
                                        ? "#ffffff"
                                        : "#f0f6ff",
                                }}
                            >
                                <Avatar sx={{ width: 40, height: 40 }} />
                                <Stack gap={1}>
                                    <Typography
                                        variant="body2"
                                        color="#3e3e3e"
                                        lineHeight={1.3}
                                    >
                                        {notification.message}
                                    </Typography>

                                    <Typography
                                        variant="caption"
                                        color="#a6a6a7"
                                        text="flex-end"
                                    >
                                        {formatDateTime(
                                            notification.created_at
                                        )}
                                    </Typography>
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
