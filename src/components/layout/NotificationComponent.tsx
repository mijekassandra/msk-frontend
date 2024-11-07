import React, { useState } from "react";
import { Popover, Stack, Typography, Box, Avatar } from "@mui/material";

interface NotificationComponentProps {
    anchorEl: HTMLElement | null;
    onClose: () => void;
    name: string;
    action: string;
    time: string;
    viewed: boolean;
}

const NotificationComponent: React.FC<NotificationComponentProps> = ({
    anchorEl,
    onClose,
    name,
    action,
    time,
    viewed,
}) => {
    const open = Boolean(anchorEl);
    const id = open ? "notification-popover" : undefined;

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
                    <Stack
                        direction="row"
                        alignItems="center"
                        gap={1}
                        sx={{
                            padding: "6px 12px",
                            minHeight: "60px",
                            borderBottom: "1px solid #e7e7e8",
                            background: "#f0f6ff",
                        }}
                    >
                        <Avatar sx={{ width: 40, height: 40 }} />
                        <Stack>
                            <Typography
                                variant="body2"
                                color="#3e3e3e"
                                lineHeight={1.3}
                            >
                                Princess Nina Puzon commented on your
                                Publication "Excited for next year!"
                            </Typography>

                            <Typography variant="caption" color="#a6a6a7">
                                4 hours ago
                            </Typography>
                        </Stack>
                    </Stack>
                    <Stack
                        direction="row"
                        alignItems="center"
                        gap={1}
                        sx={{
                            padding: "6px 12px",
                            minHeight: "60px",
                            borderBottom: "1px solid #e7e7e8",
                            // background: "#f0f6ff",
                        }}
                    >
                        <Avatar sx={{ width: 40, height: 40 }} />
                        <Stack>
                            <Typography
                                variant="body2"
                                color="#3e3e3e"
                                lineHeight={1.3}
                            >
                                Princess Nina Puzon commented on your
                                Publication "Excited for next year!"
                            </Typography>

                            <Typography variant="caption" color="#a6a6a7">
                                4 hours ago
                            </Typography>
                        </Stack>
                    </Stack>
                    <Stack
                        direction="row"
                        alignItems="center"
                        gap={1}
                        sx={{
                            padding: "6px 12px",
                            minHeight: "60px",
                            borderBottom: "1px solid #e7e7e8",
                            // background: "#f0f6ff",
                        }}
                    >
                        <Avatar sx={{ width: 40, height: 40 }} />
                        <Stack>
                            <Typography
                                variant="body2"
                                color="#3e3e3e"
                                lineHeight={1.3}
                            >
                                Princess Nina Puzon commented on your
                                Publication "Excited for next year!"
                            </Typography>

                            <Typography variant="caption" color="#a6a6a7">
                                4 hours ago
                            </Typography>
                        </Stack>
                    </Stack>
                    <Stack
                        direction="row"
                        alignItems="center"
                        gap={1}
                        sx={{
                            padding: "6px 12px",
                            minHeight: "60px",
                            borderBottom: "1px solid #e7e7e8",
                            // background: "#f0f6ff",
                        }}
                    >
                        <Avatar sx={{ width: 40, height: 40 }} />
                        <Stack>
                            <Typography
                                variant="body2"
                                color="#3e3e3e"
                                lineHeight={1.3}
                            >
                                Princess Nina Puzon commented on your
                                Publication "Excited for next year!"
                            </Typography>

                            <Typography variant="caption" color="#a6a6a7">
                                4 hours ago
                            </Typography>
                        </Stack>
                    </Stack>
                    <Stack
                        direction="row"
                        alignItems="center"
                        gap={1}
                        sx={{
                            padding: "6px 12px",
                            minHeight: "60px",
                            borderBottom: "1px solid #e7e7e8",
                            // background: "#f0f6ff",
                        }}
                    >
                        <Avatar sx={{ width: 40, height: 40 }} />
                        <Stack>
                            <Typography
                                variant="body2"
                                color="#3e3e3e"
                                lineHeight={1.3}
                            >
                                Princess Nina Puzon commented on your
                                Publication "Excited for next year!"
                            </Typography>

                            <Typography variant="caption" color="#a6a6a7">
                                4 hours ago
                            </Typography>
                        </Stack>
                    </Stack>
                    <Stack
                        direction="row"
                        alignItems="center"
                        gap={1}
                        sx={{
                            padding: "6px 12px",
                            minHeight: "60px",
                            borderBottom: "1px solid #e7e7e8",
                            // background: "#f0f6ff",
                        }}
                    >
                        <Avatar sx={{ width: 40, height: 40 }} />
                        <Stack>
                            <Typography
                                variant="body2"
                                color="#3e3e3e"
                                lineHeight={1.3}
                            >
                                Princess Nina Puzon commented on your
                                Publication "Excited for next year!"
                            </Typography>

                            <Typography variant="caption" color="#a6a6a7">
                                4 hours ago
                            </Typography>
                        </Stack>
                    </Stack>
                </Box>
                <Stack
                    sx={{
                        backgroundColor: "primary.light",
                        padding: "10px",
                    }}
                >
                    <Typography
                        variant="body1"
                        textAlign="center"
                        color="white"
                    >
                        See more
                    </Typography>
                </Stack>
            </Box>
        </Popover>
    );
};

export default NotificationComponent;
