import React, { useState, useEffect } from "react";
import { Stack, TextField, Rating, Typography } from "@mui/material";
import Swal from "sweetalert2";

import { ThumbsUpDownOutlined } from "@mui/icons-material";

// import components
import ModalVariantThree from "../../../modals/ModalVariantThree";
import PrimaryButton from "../../../buttons/PrimaryButton";

interface FeedbackFormProps {
    onClose: () => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onClose }) => {
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
                            We value your feedback! Let us know what you think about this
                            publication.
                        </Typography>
                    </Stack>
                    <Rating name="read-only" value={5} size="large" />
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
                    />
                    <PrimaryButton size="medium" width="100%">
                        SUBMIT
                    </PrimaryButton>
                </Stack>
            }
        ></ModalVariantThree>
    );
};

export default FeedbackForm;
