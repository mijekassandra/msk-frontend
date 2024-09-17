import React, { useState, useEffect } from "react";
import { Stack, TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import Swal from "sweetalert2";

// Import components
import ModalVariantTwo from "../../../modals/ModalVariantTwo";
import CustomUpload2 from "../../../layout/CustomUpload2";

interface CreateAnnouncementProps {
    mode: "create" | "edit" | "view";
    initialData?: {
        id?: number | string;
        announcement_title?: string;
        announcement_content?: string;
        announcement_status?: "Default" | "Archived" | "Published";
        announcement_type?: "Federation" | "Chairperson";
        date?: string;
    };
    onClose: () => void;
    addAnnouncement: any;
    editAnnouncement: any;
    totalCount: number;
}

const CreateAnnouncement: React.FC<CreateAnnouncementProps> = ({
    mode,
    initialData = {},
    onClose,
    addAnnouncement,
    editAnnouncement,
    totalCount,
}) => {
    // Initialize form data with default values
    const [formData, setFormData] = useState({
        id: initialData.id || "",
        announcement_title: initialData.announcement_title || "",
        announcement_content: initialData.announcement_content || "",
        announcement_type: initialData.announcement_type || "",
        date: initialData.date || "",
        announcement_status: initialData.announcement_status || "",
    });

    // Handle input changes for TextField and Select components
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "id" ? Number(value) : value,
        }));
    };

    // Populate form data when editing
    useEffect(() => {
        if (mode === "edit" && initialData) {
            setFormData({
                id: initialData.id || "",
                announcement_title: initialData.announcement_title || "",
                announcement_content: initialData.announcement_content || "",
                announcement_status: initialData.announcement_status || "",
                date: initialData.date || "",
                announcement_type: initialData.announcement_type || "",
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

    // Handle form submission (create or edit)
    const handleSubmitAnnouncement = async () => {
        try {
            const currentDateTime = getCurrentDateTime();

            const announcementData = {
                ...formData,
                id: mode === "create" ? String(totalCount) : Number(initialData.id), // Ensure `id` is a number
                user_id: 0, // 0 sa ky wa pay loign
                announcement_type: "", // Empty sa ky wa pa login
                date: mode === "create" ? currentDateTime : formData.date,
            };

            if (mode === "create") {
                await addAnnouncement(announcementData);
                Swal.fire({
                    title: "Success!",
                    text: "The annoucement has been successfully created.",
                    icon: "success",
                    confirmButtonText: "OK",
                });
            } else if (mode === "edit") {
                await editAnnouncement({
                    id: String(announcementData.id),
                    announcement: announcementData,
                });
                Swal.fire({
                    title: "Success!",
                    text: "The annoucement has been successfully updated.",
                    icon: "success",
                    confirmButtonText: "OK",
                });
            }
            onClose(); // Close modal after successful save
        } catch (error) {
            console.error("Error saving announcement:", error);
        }
    };

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
            content={
                <Stack spacing={2}>
                    <TextField
                        id="outlined-title"
                        name="announcement_title"
                        label="Title"
                        variant="outlined"
                        value={formData.announcement_title}
                        onChange={handleInputChange}
                        disabled={mode === "view"}
                    />
                    <TextField
                        id="outlined-description"
                        name="announcement_content"
                        label="Description"
                        variant="outlined"
                        multiline
                        minRows={5}
                        maxRows={10}
                        value={formData.announcement_content}
                        onChange={handleInputChange}
                        disabled={mode === "view"}
                    />
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id="announcement-status-label">Status</InputLabel>
                        <Select
                            labelId="announcement-status-label"
                            id="announcement-status"
                            name="announcement_status"
                            value={formData.announcement_status}
                            onChange={handleInputChange}
                            label="Status"
                            disabled={mode === "view"}
                        >
                            <MenuItem value="Published">Published</MenuItem>
                            <MenuItem value="Draft">Draft</MenuItem>
                            <MenuItem value="Archived">Archived</MenuItem>
                        </Select>
                    </FormControl>
                    <CustomUpload2 label="Attach Files" />
                </Stack>
            }
        />
    );
};

export default CreateAnnouncement;
