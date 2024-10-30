import React, { useState, useEffect } from "react";
import {
    Stack,
    TextField,
    Rating,
    Typography,
    Box,
    Alert,
} from "@mui/material";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { ThumbsUpDownOutlined } from "@mui/icons-material";

// import components
import ModalVariantThree from "../../../modals/ModalVariantThree";
import PrimaryButton from "../../../buttons/PrimaryButton";

// api slice
import { useCreateFeedbackMutation } from "../../Publication/api/publicationApi";

interface FeedbackFormProps {
    onClose: () => void;
    publicationID: number;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({
    onClose,
    publicationID,
}) => {
    // logged in user role
    const userDetail = useSelector((state: RootState) => state.auth.user);

    const [feedback, setFeedback] = useState({
        rating: 5,
        comment: "",
    });
    const [alert, setAlert] = useState<string | null>(null);

    const [createFeedback, { isLoading }] = useCreateFeedbackMutation();

    const handleChange = (key: keyof typeof feedback, value: any) => {
        setFeedback((prevFeedback) => ({
            ...prevFeedback,
            [key]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await createFeedback({
                id: publicationID,
                feedback: { ...feedback, account_id: userDetail.id },
            });

            console.log("response: ", response);

            if (response.error) {
                // console.log("alert: ", alert);
                // console.log("error: ", response.error);
                // console.log("feedback: ", feedback);

                setAlert(response.error.data.message);

                setTimeout(() => {
                    setAlert(null);
                }, 4000);
            } else if (response.data.status === "success") {
                Swal.fire({
                    title: "Create Success!",
                    text: "The comment has been successfully posted.",
                    icon: "success",
                    confirmButtonText: "OK",
                    customClass: {
                        title: "my-swal-title",
                        htmlContainer: "my-swal-text",
                        popup: "my-swal-popup",
                        confirmButton: "my-swal-button",
                    },
                });
                onClose();
            }
        } catch (error) {
            console.log("alert: ", alert);
            console.log("error: ", error);

            setAlert(
                error instanceof Error
                    ? error.message
                    : "An unexpected error occurred"
            );

            setTimeout(() => {
                setAlert(null);
            }, 4000);
        }
    };

    return (
        <ModalVariantThree
            onClose={onClose}
            // onSave={}
            headerTitle="Feedback"
            headerIcon={<ThumbsUpDownOutlined sx={{ fontSize: "16px" }} />}
            content={
                <Stack rowGap={1.5} justifyContent="center" alignItems="center">
                    <Stack gap={1} paddingInline={2}>
                        <Typography variant="subtitle2" textAlign="center">
                            Give us your Feedback
                        </Typography>
                        <Typography variant="body1" textAlign="center">
                            We value your feedback! Let us know what you think
                            about this publication.
                        </Typography>
                    </Stack>
                    <Rating
                        name="feedback-rating"
                        value={feedback.rating}
                        onChange={(event, newValue) =>
                            handleChange("rating", newValue)
                        }
                        size="large"
                    />
                    <TextField
                        id="outlined-email"
                        name="rating"
                        placeholder="Add a comment.."
                        variant="outlined"
                        multiline
                        minRows={5}
                        maxRows={10}
                        fullWidth
                        margin="normal"
                        value={feedback.comment}
                        onChange={(e) =>
                            handleChange("comment", e.target.value)
                        }
                    />
                    <PrimaryButton
                        onClick={handleSubmit}
                        size="medium"
                        width="100%"
                        disabled={isLoading}
                    >
                        {isLoading ? "Submitting..." : "SUBMIT"}
                    </PrimaryButton>
                    {alert && (
                        <Box
                            sx={{
                                position: "fixed",
                                bottom: 16,
                                right: 16,
                                zIndex: 1000,
                            }}
                        >
                            <Alert variant="filled" severity="error">
                                {alert}
                            </Alert>
                        </Box>
                    )}
                </Stack>
            }
        ></ModalVariantThree>
    );
};

export default FeedbackForm;
