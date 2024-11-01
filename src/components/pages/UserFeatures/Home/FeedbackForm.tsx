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
import {
    useCreateFeedbackMutation,
    useEditFeedbackMutation,
} from "../../Publication/api/publicationApi";

interface FeedbackFormProps {
    onClose: () => void;
    onCloseComment?: () => void;
    publicationID: number;
    initialFeedback?: { rating: number; comment: string } | null;
    isEdit?: boolean;
    onSubmitSuccess?: () => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({
    onClose,
    publicationID,
    initialFeedback = { rating: 0, comment: "" },
    isEdit = false,
    onSubmitSuccess,
    onCloseComment,
}) => {
    // logged in user role
    const userDetail = useSelector((state: RootState) => state.auth.user);

    const [feedback, setFeedback] = useState({
        rating: initialFeedback?.rating || 0,
        comment: initialFeedback?.comment || "",
    });
    const [alert, setAlert] = useState<string | null>(null);

    const [createFeedback, { isLoading: isLoadingCreate }] =
        useCreateFeedbackMutation();
    const [editFeedback, { isLoading: isLoadingEdit }] =
        useEditFeedbackMutation();

    const [fieldErrors, setFieldErrors] = useState({
        rating: false,
        comment: false,
    });
    const [errorDisplay, setErrorDisplay] = useState("");

    const handleChange = (key: keyof typeof feedback, value: any) => {
        setFeedback((prevFeedback) => ({
            ...prevFeedback,
            [key]: value,
        }));

        setFieldErrors((prevErrors) => ({
            ...prevErrors,
            [key]: false,
        }));
    };

    const validateForm = () => {
        const errors = {
            rating: !feedback.rating,
            comment: !feedback.comment,
        };

        setFieldErrors(errors);

        // Check if any errors exist
        return !Object.values(errors).some((error) => error === true);
    };

    const handleSubmit = async () => {
        const isValid = validateForm();

        if (!isValid) {
            setErrorDisplay("Please fill in all required fields");
            return;
        }

        try {
            const response = isEdit
                ? await editFeedback({
                      id: publicationID,
                      feedback: feedback.comment,
                  })
                : await createFeedback({
                      id: publicationID,
                      feedback: feedback.comment,
                      rating: feedback.rating,
                  });

            // console.log("response: ", response);

            if (response.error) {
                // console.log("error: ", response.error);

                setAlert(response.error.data.message);

                setTimeout(() => {
                    setAlert(null);
                }, 4000);
            } else if (response.data.status === "success") {
                Swal.fire({
                    title: isEdit ? "Update Success!" : "Create Success!",
                    text: isEdit
                        ? "The comment has been successfully updated."
                        : "The comment has been successfully posted.",
                    icon: "success",
                    confirmButtonText: "OK",
                    customClass: {
                        title: "my-swal-title",
                        htmlContainer: "my-swal-text",
                        popup: "my-swal-popup",
                        confirmButton: "my-swal-button",
                    },
                });
                onSubmitSuccess?.();
                onClose();
                if (isEdit) {
                    onCloseComment();
                }
            }
        } catch (error) {
            const typedError = error as {
                data: { status: string; message: string; error?: any };
            };
            const errorMessage =
                typedError?.data?.message || "An unexpected error occurred";
            setErrorDisplay(errorMessage);

            setTimeout(() => {
                setErrorDisplay("");
            }, 5000);
        }
    };

    return (
        <ModalVariantThree
            onClose={onClose}
            headerTitle={isEdit ? "Edit Feedback" : "Feedback"}
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
                        readOnly={isEdit ? true : false}
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
                        value={feedback.comment}
                        error={fieldErrors.comment}
                        onChange={(e) =>
                            handleChange("comment", e.target.value)
                        }
                    />
                    <Stack alignContent="end" sx={{ width: "100%" }}>
                        {errorDisplay && (
                            <Typography
                                variant="caption"
                                textAlign="right"
                                color="error.main"
                            >
                                {errorDisplay}
                            </Typography>
                        )}
                    </Stack>
                    <PrimaryButton
                        onClick={handleSubmit}
                        size="medium"
                        width="100%"
                        disabled={isLoadingCreate || isLoadingEdit}
                    >
                        {isLoadingCreate || isLoadingEdit
                            ? "Submitting..."
                            : isEdit
                            ? "UPDATE"
                            : "SUBMIT"}
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
