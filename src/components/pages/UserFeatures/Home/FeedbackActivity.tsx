import React, { useState } from "react";
import {
  Stack,
  TextField,
  Rating,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import Swal from "sweetalert2";
import { ThumbsUpDownOutlined } from "@mui/icons-material";

// import components
import ModalVariantThree from "../../../modals/ModalVariantThree";
import PrimaryButton from "../../../buttons/PrimaryButton";

// api slice
import {
  useCreateFeedbackMutation,
  useEditFeedbackMutation,
} from "../../Activities/api/activityCommentApi";

interface FeedbackFormProps {
  onClose: () => void;
  onCloseComment?: () => void;
  activityID: number;
  initialFeedback?: {
    rating: number;
    comment: string;
    id: number;
  } | null;
  isEdit?: boolean;
  onSubmitSuccess?: () => void;
  userDetail: any;
}

const FeedbackActivity: React.FC<FeedbackFormProps> = ({
  onClose,
  activityID,
  initialFeedback = { rating: 0, comment: "", id: 0 },
  isEdit = false,
  onSubmitSuccess,
  onCloseComment,
  userDetail,
}) => {
  const [feedback, setFeedback] = useState({
    rating: initialFeedback?.rating,
    comment: initialFeedback?.comment,
    feedback_id: initialFeedback?.id,
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
      const timestamp = new Date().toISOString();
      let feedbackId = initialFeedback?.id; // Use `id` when editing

      // Generate `feedback_id` only for new feedback
      if (!isEdit) {
        const allFeedbacksResponse = await fetch(
          "http://localhost:4000/feedback"
        );
        const allFeedbacks = await allFeedbacksResponse.json();

        feedbackId =
          allFeedbacks.length > 0
            ? Math.max(...allFeedbacks.map((fb: any) => fb.feedback_id)) + 1
            : 1; // If empty, start from 1
      }

      // Ensure `id` exists when editing
      if (isEdit && !initialFeedback?.id) {
        console.error("Error: Missing `id` for editing feedback!");
        setErrorDisplay("An error occurred while updating. Please try again.");
        return;
      }

      // Define the updated data
      const updatedFeedback = {
        id: initialFeedback?.id || feedbackId,
        feedback: feedback.comment,
        rating: feedback.rating,
        updated_at: timestamp,
      };

      // Call the correct API mutation
      const response: any = isEdit
        ? await editFeedback(updatedFeedback)
        : await createFeedback({
            id: feedbackId, // ✅ Ensure new feedback gets an ID
            feedback_id: feedbackId,
            activity_id: activityID,
            feedback: feedback.comment,
            rating: feedback.rating,
            created_at: timestamp,
            updated_at: timestamp,
            account_id: userDetail.id,
            feedback_by: `${userDetail.first_name} ${userDetail.last_name}`,
          });

      if (response.error) {
        setAlert(response.error.data.message);
        setTimeout(() => {
          setAlert(null);
        }, 4000);
      } else {
        Swal.fire({
          title: isEdit ? "Update Success!" : "Create Success!",
          text: isEdit
            ? "The comment has been successfully updated."
            : "The comment has been successfully posted.",
          icon: "success",
          customClass: {
            title: "my-swal-title",
            htmlContainer: "my-swal-text",
            popup: "my-swal-popup",
            confirmButton: "my-swal-button",
          },
          confirmButtonText: "OK",
        });

        onSubmitSuccess?.();
        onClose();

        if (isEdit && onCloseComment) {
          onCloseComment();
        }
      }
    } catch (error) {
      console.log("Error: ", error);
      setErrorDisplay("An unexpected error occurred");

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
              We value your feedback! Let us know what you think about this
              acitivity.
            </Typography>
          </Stack>
          <Rating
            name="feedback-rating"
            value={feedback.rating}
            onChange={(_event, newValue) => handleChange("rating", newValue)}
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
            onChange={(e) => handleChange("comment", e.target.value)}
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

export default FeedbackActivity;
