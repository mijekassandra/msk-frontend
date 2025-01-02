import React, { useState, useEffect } from "react";
import {
    Stack,
    TextField,
    Typography,
    InputAdornment,
    MenuItem,
    Alert,
    Box,
} from "@mui/material";
import { LocationOn } from "@mui/icons-material";
import Swal from "sweetalert2";
import "../../../../index.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { formatDate } from "../../../../utils/dateUtil";
import NoImage from "/src/assets/no-image.png";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

//import components
import ModalVariantTwo from "../../../modals/ModalVariantTwo";
import CustomUpload2 from "../../../layout/CustomUpload2";
import ActivitiesCard from "../../../cards/ActivitiesCard";

// api service
import { useNotifyUsersMutation } from "../../../../features/Notification/api/notificationApi";

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
        barangay?: string | null;
        location?: string | null;
        date_of_activity?: string | null;
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
    // notification api
    const [postNotification] = useNotifyUsersMutation();

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
        location: initialData.location || "",
        date_of_activity: initialData.date_of_activity
            ? dayjs(initialData.date_of_activity).format("YYYY-MM-DD")
            : "",
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
            setFileName(file.name);
            setFormData((prev) => ({
                ...prev,
                attachment: file,
                barangay: userDetail?.barangay,
            }));
        }
    };

    // specific for Date Change
    const handleDateChange = (newDate: any) => {
        setFormData({
            ...formData,
            date_of_activity: newDate
                ? dayjs(newDate).format("YYYY-MM-DD")
                : "",
        });
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
            location: !formData.location,
            date_of_activity: !formData.date_of_activity,
        };

        setFieldErrors(errors);
        console.log(fieldErrors);
        // Check if any errors exist
        return !Object.values(errors).some((error) => error === true);
    };

    const handleSubmitActivity = async () => {
        const isValid = validateForm();

        if (!isValid) {
            setErrorDisplay("Please fill in all required fields");
            return;
        }

        setLoading(true); // Start loading

        try {
            const formSubmissionData = new FormData();
            formSubmissionData.append("title", formData.title);
            formSubmissionData.append("content", formData.content);
            formSubmissionData.append("location", formData.location);
            formSubmissionData.append(
                "date_of_activity",
                formData.date_of_activity
            );
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
                    // Check if the updated status is "Published"
                    if (formData.status === "published") {
                        try {
                            // Determine the notification details
                            const message = `"${formData.title}" has been posted`;

                            const notificationData = {
                                type: "activity",
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
                    if (formData.status === "published") {
                        try {
                            // Determine the notification details
                            const message = `"${formData.title}" has been posted`;

                            const notificationData = {
                                type: "activity",
                                message,
                                source_id: formData.id,
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
            loading={loading}
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
                            location={formData.location}
                            date_of_activity={formatDate(
                                formData.date_of_activity
                            )}
                            content={formData.content}
                        ></ActivitiesCard>
                    </>
                ) : (
                    <Stack spacing={2}>
                        <TextField
                            id="outlined-title"
                            name="title"
                            label="Title"
                            variant="outlined"
                            value={formData.title}
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
                            maxRows={10}
                            value={formData.content}
                            onChange={handleInputChange}
                            // disabled={mode === "view"}
                        />
                        <Stack direction="row" gap={1}>
                            <TextField
                                id="outlined-location"
                                name="location"
                                label="Location"
                                variant="outlined"
                                value={formData.location}
                                onChange={handleInputChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LocationOn />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    width: {
                                        xs: "100%",
                                        sm: "50%",
                                    },
                                }}
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    slotProps={{
                                        textField: {
                                            size: "medium",
                                        },
                                        popper: { placement: "auto" },
                                    }}
                                    value={
                                        formData.date_of_activity
                                            ? dayjs(formData.date_of_activity)
                                            : null
                                    }
                                    onChange={(newDate) =>
                                        handleDateChange(newDate)
                                    }
                                    sx={{
                                        width: {
                                            xs: "100%",
                                            sm: "50%",
                                        },
                                    }}
                                />
                            </LocalizationProvider>
                        </Stack>

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
                            fileName={fileName}
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

export default CreateNewActivity;
