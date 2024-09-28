import React, { useState, useEffect } from "react";
import { Stack, Box, Typography, Avatar } from "@mui/material";
import Swal from "sweetalert2";
// import
import ModalVariantThree from "../../../modals/ModalVariantThree";
import { CommentOutlined } from "@mui/icons-material";

interface CommentsListProps {
    onClose: () => void;
}

const CommentsList: React.FC<CommentsListProps> = ({ onClose }) => {
    return (
        <ModalVariantThree
            onClose={onClose}
            headerTitle="Comments"
            headerIcon={<CommentOutlined sx={{ fontSize: "14px" }} />}
            content={
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        border: "1px solid #e0e0e0",
                        borderRadius: "8px",
                        gap: "8px",
                        padding: "12px 8px",
                        boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)", // Add shadow here
                    }}
                >
                    {/* Avatar */}
                    <Stack>
                        <Avatar sx={{ width: "35px", height: "35px" }}>L</Avatar>{" "}
                    </Stack>
                    <Stack spacing={0.5}>
                        {/* User Name and Time */}
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Typography variant="body1" fontWeight={600}>
                                Lando Norris {/* Replace with dynamic name */}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                                • 12 minutes ago {/* Replace with dynamic timestamp */}
                            </Typography>
                        </Stack>

                        {/* Comment Text */}
                        <Typography variant="body1">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam
                            viverra vehicula. Nam ut pulvinar eros. Donec pharetra massa id risus
                            consectetur aliquet. {/* Replace with dynamic comment */}
                        </Typography>
                    </Stack>
                </Box>
            }
        ></ModalVariantThree>
    );
};

export default CommentsList;
