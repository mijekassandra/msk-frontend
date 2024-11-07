import React, { useState } from "react";
import {
    Stack,
    Box,
    Typography,
    Avatar,
    CircularProgress,
    IconButton,
    Menu,
    MenuItem,
} from "@mui/material";
import { CommentOutlined, MoreHoriz } from "@mui/icons-material";
import { formatDistanceStrict } from "date-fns";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import Swal from "sweetalert2";

// import components
import ModalVariantThree from "../../../modals/ModalVariantThree";
import FeedbackForm from "./FeedbackForm";

// import apiSlice
import {
    useGetAllFeedbacksByPublicationIdQuery,
    useDeleteFeedbackByIdMutation,
} from "../../Publication/api/publicationApi";

interface CommentsListProps {
    onClose: () => void;
    publicationID: number;
}

const CommentsList: React.FC<CommentsListProps> = ({
    onClose,
    publicationID,
}) => {
    // logged in user role
    const userDetail = useSelector((state: RootState) => state.auth.user);

    const {
        data: allComments = [],
        isError,
        isLoading,
        refetch,
    } = useGetAllFeedbacksByPublicationIdQuery(publicationID);
    const [deleteFeedbackById] = useDeleteFeedbackByIdMutation();

    const [editComment, setEditComment] = useState<{
        rating: number;
        comment: string;
        id: number;
    } | null>(null);

    const [isFeedbackFormOpen, setFeedbackFormOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<{
        [key: number]: HTMLElement | null;
    }>({}); // Use object to store anchorEl for each comment

    const formatTimeAgo = (dateString: string) => {
        const date = new Date(dateString);
        return formatDistanceStrict(date, new Date(), { addSuffix: true });
    };

    const handleClick = (
        event: React.MouseEvent<HTMLButtonElement>,
        commentId: number
    ) => {
        setAnchorEl((prev) => ({ ...prev, [commentId]: event.currentTarget }));
    };

    const handleCloseMenu = (commentId: number) => {
        setAnchorEl((prev) => ({ ...prev, [commentId]: null }));
    };

    const handleEdit = (comment: any) => {
        console.log("Selected comment for editing:", comment);
        setEditComment({
            rating: comment.rating,
            comment: comment.feedback,
            id: comment.id,
        });
        setFeedbackFormOpen(true);
        handleCloseMenu(comment.id);
    };

    const handleFeedbackFormClose = () => {
        setFeedbackFormOpen(false);
        setEditComment(null);
    };

    const handleFeedbackFormSuccess = () => {
        refetch();
        handleFeedbackFormClose();
    };

    const handleDelete = async (commentId: number) => {
        onClose();
        handleCloseMenu(commentId);
        const result = await Swal.fire({
            title: "Delete Comment?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Delete!",
            customClass: {
                title: "my-swal-title",
                htmlContainer: "my-swal-text",
                popup: "my-swal-popup",
            },
        });

        if (result.isConfirmed) {
            try {
                const response = await deleteFeedbackById(commentId);

                Swal.fire({
                    title: "Deleted!",
                    text: "The comment has been deleted.",
                    icon: "success",
                    customClass: {
                        title: "my-swal-title",
                        htmlContainer: "my-swal-text",
                        popup: "my-swal-popup",
                        confirmButton: "my-swal-button",
                    },
                    confirmButtonText: "OK",
                });
            } catch (error) {
                Swal.fire("Error!", "Failed to delete the comment.", "error");
            }
        }
    };

    return (
        <ModalVariantThree
            onClose={onClose}
            headerTitle="Comments"
            headerIcon={<CommentOutlined sx={{ fontSize: "14px" }} />}
            content={
                isFeedbackFormOpen ? (
                    <FeedbackForm
                        onClose={handleFeedbackFormClose}
                        publicationID={editComment?.id || publicationID}
                        initialFeedback={editComment}
                        isEdit={Boolean(editComment)}
                        onSubmitSuccess={handleFeedbackFormSuccess}
                        onCloseComment={onClose}
                    />
                ) : isLoading ? (
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
                        {allComments.map((comment: any) => (
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
                                <Avatar
                                    sx={{
                                        width: "35px",
                                        height: "35px",
                                        marginTop: "6px",
                                    }}
                                >
                                    {comment.feedback_by?.charAt(0) || "A"}
                                </Avatar>
                                <Stack spacing={0.5} flexGrow={1}>
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        spacing={1}
                                        justifyContent="space-between"
                                    >
                                        <Stack
                                            direction="row"
                                            alignItems="center"
                                            spacing={1}
                                        >
                                            <Typography
                                                variant="body1"
                                                fontWeight={600}
                                            >
                                                {comment.feedback_by ||
                                                    "Anonymous"}
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                color="textSecondary"
                                            >
                                                •{" "}
                                                {comment.updated_at
                                                    ? formatTimeAgo(
                                                          comment.updated_at
                                                      )
                                                    : "Just now"}
                                            </Typography>
                                        </Stack>

                                        {userDetail.id ===
                                            comment.account_id && (
                                            <Stack direction="row" spacing={1}>
                                                <IconButton
                                                    sx={{ padding: "0" }}
                                                    onClick={(e) =>
                                                        handleClick(
                                                            e,
                                                            comment.id
                                                        )
                                                    }
                                                >
                                                    <MoreHoriz
                                                        sx={{
                                                            color: "#606060",
                                                            fontSize: "18px",
                                                        }}
                                                    />
                                                </IconButton>
                                            </Stack>
                                        )}

                                        {/* <Menu
                                            anchorEl={
                                                anchorEl[comment.id] || null
                                            }
                                            open={Boolean(anchorEl[comment.id])}
                                            onClose={() =>
                                                handleCloseMenu(comment.id)
                                            }
                                            PaperProps={{
                                                sx: {
                                                    boxShadow:
                                                        "0px 1px 3px rgba(0, 0, 0, 0.1)",
                                                },
                                            }}
                                        >
                                            <MenuItem
                                                onClick={() =>
                                                    handleEdit(comment)
                                                }
                                            >
                                                Edit
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() =>
                                                    handleDelete(comment.id)
                                                }
                                            >
                                                Delete
                                            </MenuItem>
                                        </Menu> */}

                                        <Menu
                                            anchorEl={
                                                anchorEl[comment.id] || null
                                            }
                                            open={Boolean(anchorEl[comment.id])}
                                            onClose={() =>
                                                handleCloseMenu(comment.id)
                                            }
                                            PaperProps={{
                                                sx: {
                                                    boxShadow:
                                                        "0px 1px 3px rgba(0, 0, 0, 0.1)",
                                                },
                                            }}
                                        >
                                            <MenuItem
                                                onClick={() =>
                                                    handleEdit(comment)
                                                }
                                            >
                                                Edit
                                            </MenuItem>
                                            <MenuItem
                                                onClick={() =>
                                                    handleDelete(comment.id)
                                                }
                                            >
                                                Delete
                                            </MenuItem>
                                        </Menu>
                                    </Stack>
                                    <Typography variant="body1">
                                        {comment.feedback}
                                    </Typography>
                                </Stack>
                            </Box>
                        ))}
                    </Stack>
                )
            }
        />
    );
};

export default CommentsList;
