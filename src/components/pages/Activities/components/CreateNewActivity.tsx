import React, { useState, useEffect } from "react";
import { Stack, TextField, Typography } from "@mui/material";
import Swal from "sweetalert2";
import "../../../../index.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { formatDate } from "../../../../utils/dateUtil";
import NoImage from "../../../../assets/no-image.png";

//import components
import ModalVariantTwo from "../../../modals/ModalVariantTwo";
import CustomUpload2 from "../../../layout/CustomUpload2";
import ActivitiesCard from "../../../cards/ActivitiesCard";

// file endpoint
const { VITE_FILE_ENDPOINT } = import.meta.env;

interface CreateNewActivityProps {
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
    addActivity: any;
    editActivity: any;
}

const CreateNewActivity: React.FC<CreateNewActivityProps> = ({
    mode,
    initialData = {},
    onClose,
    addActivity,
    editActivity,
}) => {
    // logged in user details
    const userDetail = useSelector((state: RootState) => state.auth.user);

    const selectedBarangay = useSelector(
        (state: RootState) => state.admin.selectedBarangay
    );

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
            ? initialData.attachment.split(/[/\\]/).pop()
            : null // Extract file name from path
    );
    const [errorDisplay, setErrorDisplay] = useState("");
    const [fieldErrors, setFieldErrors] = useState({
        title: false,
        content: false,
    });
    const [alert, setAlert] = useState(null);

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

    const handleSubmitActivity = async () => {
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
                const response = await addActivity(formSubmissionData);

                if (response.error) {
                    setAlert(response.error.data.message);
                    setTimeout(() => {
                        setAlert(null);
                    }, 4000);
                } else if (response.data.status === "success") {
                    Swal.fire({
                        title: "Success!",
                        text: "The activity has been successfully created.",
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
                const response = await editActivity({
                    id: formData.id,
                    activity: formSubmissionData,
                });

                if (response.error) {
                    setAlert(response.error.data.message);

                    setTimeout(() => {
                        setAlert(null);
                    }, 4000);
                } else if (response.data.status === "success") {
                    Swal.fire({
                        title: "Success!",
                        text: "The activity has been successfully updated.",
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
            onSave={handleSubmitActivity}
            headerTitle={
                mode === "create"
                    ? "Create Activity"
                    : mode === "edit"
                    ? "Edit Activity"
                    : "View Activity"
            }
            mode={mode}
            maxWidth={mode === "view" ? "800px" : ""}
            content={
                mode === "view" ? (
                    <>
                        <ActivitiesCard
                            barangay={
                                formData.type !== "Federation"
                                    ? formData.barangay
                                    : "Federation"
                            }
                            cardImage={
                                formData.attachment
                                    ? VITE_FILE_ENDPOINT + formData.attachment
                                    : NoImage
                            }
                            type={formData.type}
                            date={formatDate(formData.created_at)}
                            title={formData.title}
                            mode={mode}
                            selectedBarangay={selectedBarangay}
                        ></ActivitiesCard>
                    </>
                ) : (
                    <Stack spacing={2}>
                        <TextField
                            id="outlined-title"
                            name="activity_title"
                            label="Title"
                            variant="outlined"
                            value={formData.title}
                            onChange={handleInputChange}
                            // disabled={mode === "view"}
                        />
                        <TextField
                            id="outlined-description"
                            name="activity_content"
                            label="Description"
                            variant="outlined"
                            multiline
                            minRows={5}
                            maxRows={10}
                            value={formData.content}
                            onChange={handleInputChange}
                            // disabled={mode === "view"}
                        />
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
                        />{" "}
                    </Stack>
                )
            }
        ></ModalVariantTwo>
    );
};

export default CreateNewActivity;
