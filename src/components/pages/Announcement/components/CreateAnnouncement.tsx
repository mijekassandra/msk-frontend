import React, { useState, useEffect } from "react";
import {
    Stack,
    TextField,
    Typography,
    MenuItem,
    Alert,
    Box,
} from "@mui/material";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { formatDate } from "../../../../utils/dateUtil.ts";
import NoImage from "../../../../assets/no-image.png";

// Import components
import ModalVariantTwo from "../../../modals/ModalVariantTwo";
import CustomUpload2 from "../../../layout/CustomUpload2";
import AnnouncementCard from "../../../cards/AnnouncementCard.js";

// api service
import { useNotifyUsersMutation } from "../../../../features/Notification/api/notificationApi.tsx";

// file endpoint
const { VITE_FILE_ENDPOINT } = import.meta.env;

interface CreateAnnouncementProps {
    mode: "create" | "edit" | "view";
    initialData?: {
        id?: number | string;
        title?: string;
        content?: string;
        status?: "draft" | "archived" | "published";
        type?: "Federation" | "Chairperson";
        attachment?: File | null;
        created_at?: string;
        barangay?: string;
    };
    onClose: () => void;
    addAnnouncement: any;
    editAnnouncement: any;
}

const CreateAnnouncement: React.FC<CreateAnnouncementProps> = ({
    mode,
    initialData = {},
    onClose,
    addAnnouncement,
    editAnnouncement,
}) => {
    // notification api
    const [postNotification] = useNotifyUsersMutation();

    // logged in user details
    const userDetail = useSelector((state: RootState) => state.auth.user);

    const selectedBarangay = useSelector(
        (state: RootState) => state.admin.selectedBarangay
    );

    // Initialize form data with default values
    const [formData, setFormData] = useState({
        id: initialData.id || "",
        title: initialData.title || "",
        content: initialData.content || "",
        attachment: initialData.attachment || null,
        status: initialData.status || "",
        created_at: initialData.created_at || null,
        type: initialData.type || null,
        barangay: initialData.barangay || "",
    });

    const [fileName, setFileName] = useState<string | null>(
        initialData.attachment
            ? initialData.attachment.split(/[/\\]/).pop()
            : null // Extract file name from path
    );
    const [errorDisplay, setErrorDisplay] = useState("");
    const [fieldErrors, setFieldErrors] = useState({
        title: false,
        content: false,
    });
    const [alert, setAlert] = useState(null);
    const [loading, setLoading] = useState(false);

    // Function to handle file selection from CustomUpload2
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setFileName(file.name);
            setFormData((prev) => ({
                ...prev,
                attachment: file,
                barangay: userDetail?.barangay,
            }));
        }
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement> | any
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Clear field errors on input change
        setFieldErrors((prev) => ({ ...prev, [name]: false }));
    };

    const validateForm = () => {
        const errors = {
            title: !formData.title,
            content: !formData.content,
        };

        setFieldErrors(errors);

        // Check if any errors exist
        return !Object.values(errors).some((error) => error === true);
    };

    // Handle form submission (create or edit)
    const handleSubmitAnnouncement = async () => {
        const isValid = validateForm();

        if (!isValid) {
            setErrorDisplay("Please fill in all required fields");
            return;
        }

        try {
            const formSubmissionData = new FormData();
            formSubmissionData.append("title", formData.title);
            formSubmissionData.append("content", formData.content);
            formSubmissionData.append("status", formData.status);

            // Attach the new file if uploaded; otherwise, attach the existing file
            if (formData.attachment instanceof File) {
                formSubmissionData.append("attachment", formData.attachment);
            }

            if (mode === "create") {
                const response = await addAnnouncement(formSubmissionData);

                if (response.error) {
                    setAlert(response.error.data.message);

                    setTimeout(() => {
                        setAlert(null);
                    }, 4000);
                } else if (response.data.status === "success") {
                    // const createdAnnouncementId = response.data.id;

                    if (formData.status === "published") {
                        try {
                            // Determine the notification details
                            const message = `"${formData.title}" has been posted`;

                            const notificationData = {
                                type: "announcement",
                                message,
                                source_id: response.data.source_id,
                                brgy_id:
                                    userDetail.role === "Federation"
                                        ? null
                                        : userDetail.brgy_id,
                            };

                            //! Send notification
                            const res = await postNotification(
                                notificationData
                            );
                        } catch (error) {
                            console.error("Error sending notification:", error);
                        }
                    }

                    Swal.fire({
                        title: "Create Success!",
                        text: "The announcement has been successfully created.",
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
            } else if (mode === "edit") {
                const response = await editAnnouncement({
                    id: formData.id,
                    announcement: formSubmissionData,
                });

                if (response.error) {
                    setAlert(response.error.data.message);

                    setTimeout(() => {
                        setAlert(null);
                    }, 4000);
                } else if (response.data.status === "success") {
                    if (formData.status === "published") {
                        try {
                            // Determine the notification details
                            const message = `"${formData.title}" has been posted`;

                            const notificationData = {
                                type: "announcement",
                                message,
                                source_id: formData.id,
                                brgy_id:
                                    userDetail.role === "Federation"
                                        ? null
                                        : userDetail.brgy_id,
                            };

                            // Send notification
                            await postNotification(notificationData);
                        } catch (error) {
                            console.error("Error sending notification:", error);
                        }
                    }
                    Swal.fire({
                        title: "Update Success!",
                        text: "The announcement has been successfully updated.",
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
            }
            onClose(); // Close modal after successful save
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
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (mode === "create") {
            setFormData((prev) => ({
                ...prev,
                type:
                    userDetail.role === "Federation"
                        ? "Federation"
                        : "Chairperson",
            }));
        }
    }, [mode, userDetail.role]);

    return (
        <ModalVariantTwo
            onClose={onClose}
            onSave={handleSubmitAnnouncement}
            headerTitle={
                mode === "create"
                    ? "Create Announcement"
                    : mode === "edit"
                    ? "Edit Announcement"
                    : "View Announcement"
            }
            mode={mode}
            maxWidth={mode === "view" ? "800px" : ""}
            loading={loading}
            content={
                mode === "view" ? (
                    <>
                        <AnnouncementCard
                            barangay={
                                formData.type !== "Federation"
                                    ? formData.barangay
                                    : "Federation"
                            }
                            type={formData.type}
                            date={formatDate(formData.created_at)}
                            cardImage={
                                formData.attachment
                                    ? VITE_FILE_ENDPOINT + formData.attachment
                                    : NoImage
                            }
                            title={formData.title}
                            content={formData.content}
                            selectedBarangay={selectedBarangay}
                        ></AnnouncementCard>{" "}
                    </>
                ) : (
                    <Stack spacing={2}>
                        <TextField
                            id="outlined-title"
                            name="title"
                            label="Title"
                            variant="outlined"
                            value={formData.title}
                            error={fieldErrors.title}
                            onChange={handleInputChange}
                            //   disabled={mode === "view"}
                        />
                        <TextField
                            id="outlined-description"
                            name="content"
                            label="Description"
                            variant="outlined"
                            multiline
                            minRows={5}
                            maxRows={10}
                            value={formData.content}
                            error={fieldErrors.content}
                            onChange={handleInputChange}
                            //   disabled={mode === "view"}
                        />

                        <TextField
                            fullWidth
                            select
                            variant="outlined"
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                            label="Select Status"
                            InputLabelProps={{
                                shrink: false,
                                style: {
                                    display: formData.status ? "none" : "block",
                                },
                            }}
                        >
                            <MenuItem value="" disabled>
                                Select Status
                            </MenuItem>
                            <MenuItem value="draft">Draft</MenuItem>
                            <MenuItem value="archived">Archived</MenuItem>
                            <MenuItem value="published">Published</MenuItem>
                        </TextField>

                        {errorDisplay && (
                            <Typography
                                variant="caption"
                                textAlign="right"
                                color="error.main"
                            >
                                {errorDisplay}
                            </Typography>
                        )}
                        <CustomUpload2
                            label="Attach Files"
                            onChange={handleFileChange}
                            accept="image/*,application/pdf"
                            fileName={fileName} // Pass the file name
                            mode={mode}
                        />

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
                )
            }
        />
    );
};

export default CreateAnnouncement;
