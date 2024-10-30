import React, { useState, useEffect } from "react";
import {
    Stack,
    Box,
    Typography,
    Avatar,
    CircularProgress,
} from "@mui/material";
import Swal from "sweetalert2";

// import
import ModalVariantThree from "../../../modals/ModalVariantThree";
import { CommentOutlined } from "@mui/icons-material";

// import component

// import apiSlice
import {
    useGetAllFeedbacksByPublicationIdQuery,
    useGetFeedbackByIdQuery,
    useEditFeedbackMutation,
    useDeleteFeedbackByIdMutation,
} from "../../Publication/api/publicationApi";

interface CommentsListProps {
    onClose: () => void;
    publicationID: number;
}

const CommentsList: React.FC<CommentsListProps> = ({ onClose }) => {
    const {
        data: allComments = [],
        isError,
        isLoading,
        refetch,
    } = useGetAllFeedbacksByPublicationIdQuery;

    const [editComment] = useEditFeedbackMutation();
    const [deleteFeedbackById] = useDeleteFeedbackByIdMutation();

    // Force refetch if needed
    useEffect(() => {
        refetch();
    }, []);

    return (
        <ModalVariantThree
            onClose={onClose}
            headerTitle="Comments"
            headerIcon={<CommentOutlined sx={{ fontSize: "14px" }} />}
            content={
                isLoading ? (
                    <CircularProgress />
                ) : isError ? (
                    <Typography color="error">
                        Failed to load comments.
                    </Typography>
                ) : allComments.length === 0 ? (
                    <Stack alignItems="center" gap={1} margin={1}>
                        <img
                            src="\src\assets\no-comment.png"
                            width="150px"
                            alt="No comment"
                        />
                        <Typography variant="subtitle1" textAlign="center">
                            No comments
                        </Typography>
                    </Stack>
                ) : (
                    <Stack spacing={2}>
                        {allComments.map((comment) => (
                            <Box
                                key={comment.id}
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    border: "1px solid #e0e0e0",
                                    borderRadius: "8px",
                                    gap: "8px",
                                    padding: "12px 8px",
                                    boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)",
                                }}
                            >
                                <Avatar sx={{ width: "35px", height: "35px" }}>
                                    {comment.userInitials || "U"}{" "}
                                    {/* Assuming user initials */}
                                </Avatar>
                                <Stack spacing={0.5}>
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        spacing={1}
                                    >
                                        <Typography
                                            variant="body1"
                                            fontWeight={600}
                                        >
                                            {comment.userName || "Anonymous"}{" "}
                                            {/* Display user name */}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            color="textSecondary"
                                        >
                                            • {comment.timeAgo || "Just now"}{" "}
                                            {/* Display time */}
                                        </Typography>
                                    </Stack>
                                    <Typography variant="body1">
                                        {comment.commentText}
                                    </Typography>
                                </Stack>
                            </Box>
                        ))}
                    </Stack>
                )
            }
        ></ModalVariantThree>
    );
};

export default CommentsList;
