import React, { useState, useEffect } from "react";
import {
    Stack,
    TextField,
    Typography,
    MenuItem,
    Box,
    Alert,
} from "@mui/material";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { formatDate } from "../../../../utils/dateUtil.ts";
import NoImage from "../../../../assets/no-image.png";

//import components
import ModalVariantTwo from "../../../modals/ModalVariantTwo";
import CustomUpload2 from "../../../layout/CustomUpload2";
import PublicationCard from "../../../cards/PublicationCard";

// api service
import { useNotifyUsersMutation } from "../../../../features/Notification/api/notificationApi.tsx";

// file endpoint
const { VITE_FILE_ENDPOINT } = import.meta.env;

interface CreateNewPublicationProps {
    mode: "create" | "edit" | "view";
    initialData?: {
        id?: number;
        title?: string;
        content?: string;
        type?: "Federation" | "Chairperson";
        attachment?: File | null | string;
        created_at?: string;
        barangay?: string;
        status?: "draft" | "archived" | "published";
    };
    onClose: () => void;
    addPublication: any;
    editPublication: any;
}

const CreateNewPublication: React.FC<CreateNewPublicationProps> = ({
    mode,
    initialData = {},
    onClose,
    addPublication,
    editPublication,
}) => {
    // notification api
    const [postNotification] = useNotifyUsersMutation();

    // logged in user details
    const userDetail = useSelector((state: RootState) => state.auth.user);

    const selectedBarangay = useSelector(
        (state: RootState) => state.admin.selectedBarangay
    );

    // form data to populate form with selected data
    const [formData, setFormData] = useState({
        id: initialData.id || "",
        title: initialData.title || "",
        content: initialData.content || "",
        attachment: initialData.attachment || null,
        created_at: initialData.created_at || null,
        barangay: initialData.barangay || null,
        type: initialData.type || null,
        status: initialData.status || "draft",
    });
    const [fileName, setFileName] = useState<string | null>(
        initialData.attachment
            ? typeof initialData.attachment === "string"
                ? initialData.attachment.split(/[/\\]/).pop() || null
                : initialData.attachment.name
            : null
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
            setFileName(file.name); // Update the file name in state
            setFormData((prev) => ({
                ...prev,
                attachment: file,
                barangay: userDetail?.barangay,
            })); // Update formData with the file
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

    // submit button
    const handleSubmitPublication = async () => {
        const isValid = validateForm();

        if (!isValid) {
            setErrorDisplay("Please fill in all required fields");
            return;
        }

        setLoading(true);

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
                const response = await addPublication(formSubmissionData);

                if (response.error) {
                    setAlert(response.error.data.message);

                    setTimeout(() => {
                        setAlert(null);
                    }, 4000);
                } else if (response.data.status === "success") {
                    // Check if the updated status is "Published"
                    if (formData.status === "published") {
                        try {
                            // Determine the notification details
                            const message = `"${formData.title}" has been published`;

                            const notificationData = {
                                type: "publication",
                                message,
                                source_id: response.data.source_id,
                                brgy_id:
                                    userDetail.role === "Federation"
                                        ? null
                                        : userDetail.brgy_id,
                            };

                            //! Send notification
                            await postNotification(notificationData);
                        } catch (error) {
                            console.error("Error sending notification:", error);
                        }
                    }

                    // Show success message regardless of notification
                    Swal.fire({
                        title: "Create Success!",
                        text: "The publication has been successfully created.",
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
                const response = await editPublication({
                    id: formData.id,
                    publication: formSubmissionData,
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
                            const message = `"${formData.title}" has been published`;

                            const notificationData = {
                                type: "publication",
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
                        text: "The publication has been successfully updated.",
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
            onSave={handleSubmitPublication}
            headerTitle={
                mode === "create"
                    ? "Create Publication"
                    : mode === "edit"
                    ? "Edit Publication"
                    : "View Publication"
            }
            mode={mode}
            maxWidth={mode === "view" ? "800px" : ""}
            loading={loading}
            content={
                mode === "view" ? (
                    <>
                        <PublicationCard
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
                            views={24}
                            comments={5}
                            rating={5}
                            mode={mode}
                            selectedBarangay={selectedBarangay}
                            publicationID={Number(formData.id)}
                        ></PublicationCard>
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
                            // disabled={mode === "view"}
                        />
                        <TextField
                            id="outlined-description"
                            name="content"
                            label="Description"
                            variant="outlined"
                            multiline
                            minRows={5}
                            maxRows={8}
                            value={formData.content}
                            error={fieldErrors.content}
                            onChange={handleInputChange}
                            // disabled={mode === "view"}
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
        ></ModalVariantTwo>
    );
};

export default CreateNewPublication;
