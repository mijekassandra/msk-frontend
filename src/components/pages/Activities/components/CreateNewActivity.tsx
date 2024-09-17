import React, { useState, useEffect } from "react";
import { Stack, TextField } from "@mui/material";
import Swal from "sweetalert2";

//import components
import ModalVariantTwo from "../../../modals/ModalVariantTwo";
import CustomUpload2 from "../../../layout/CustomUpload2";

interface CreateNewActivityProps {
    mode: "create" | "edit" | "view";
    initialData?: {
        id?: number | string;
        activity_title?: string;
        activity_content?: string;
        activity_type?: "Federation" | "Chairperson";
        date?: string;
    };
    onClose: () => void;
    addActivity: any;
    editActivity: any;
    totalCount: number;
}

const CreateNewActivity: React.FC<CreateNewActivityProps> = ({
    mode,
    initialData = {},
    onClose,
    addActivity,
    editActivity,
    totalCount,
}) => {
    const [formData, setFormData] = useState({
        id: initialData.id || "",
        activity_title: initialData.activity_title || "",
        activity_content: initialData.activity_content || "",
        activity_type: initialData.activity_type || "",
        date: initialData.date || "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "id" ? Number(value) : value,
        }));
    };

    useEffect(() => {
        if (mode === "edit" && initialData) {
            setFormData({
                id: initialData.id || "",
                activity_title: initialData.activity_title || "",
                activity_content: initialData.activity_content || "",
                activity_type: initialData.activity_type || "",
                date: initialData.date || "",
            });
        }
    }, [mode, initialData]);

    const getCurrentDateTime = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    const handleSubmitActivity = async () => {
        try {
            const currentDateTime = getCurrentDateTime();

            const activityData = {
                ...formData,
                id: mode === "create" ? String(totalCount) : Number(initialData.id), // Ensure `id` is a number
                user_id: 0, // 0 sa ky wa pay loign
                activity_type: "", //empty kay waz pa login
                date: mode === "create" ? currentDateTime : formData.date,
            };

            if (mode === "create") {
                await addActivity(activityData);

                Swal.fire({
                    title: "Success!",
                    text: "The activity has been successfully created.",
                    icon: "success",
                    confirmButtonText: "OK",
                });
            } else if (mode === "edit") {
                await editActivity({
                    id: String(activityData.id),
                    activity: activityData,
                });

                Swal.fire({
                    title: "Success!",
                    text: "The activity has been successfully updated.",
                    icon: "success",
                    confirmButtonText: "OK",
                });
            }
            onClose(); // Close modal after successful save
        } catch (error) {
            console.error("Error saving activity:", error);
        }
    };

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
            content={
                <Stack spacing={2}>
                    <TextField
                        id="outlined-title"
                        name="activity_title"
                        label="Title"
                        variant="outlined"
                        value={formData.activity_title}
                        onChange={handleInputChange}
                        disabled={mode === "view"}
                    />
                    <TextField
                        id="outlined-description"
                        name="activity_content"
                        label="Description"
                        variant="outlined"
                        multiline
                        minRows={5}
                        maxRows={10}
                        value={formData.activity_content}
                        onChange={handleInputChange}
                        disabled={mode === "view"}
                    />
                    <CustomUpload2 label="Attach Files" />
                </Stack>
            }
        ></ModalVariantTwo>
    );
};

export default CreateNewActivity;
