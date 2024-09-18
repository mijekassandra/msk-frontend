import React, { useState, useEffect } from "react";
import { Stack, TextField } from "@mui/material";
import Swal from "sweetalert2";

//import components
import ModalVariantTwo from "../../../modals/ModalVariantTwo";
import CustomUpload2 from "../../../layout/CustomUpload2";

interface CreateNewPublicationProps {
    mode: "create" | "edit" | "view";
    initialData?: {
        id?: number | string;
        publication_title?: string;
        publication_content?: string;
        publication_type?: "Federation" | "Chairperson";
        date?: string;
    };
    onClose: () => void;
    addPublication: any;
    editPublication: any;
    totalCount: number;
}

const CreateNewPublication: React.FC<CreateNewPublicationProps> = ({
    mode,
    initialData = {},
    onClose,
    addPublication,
    editPublication,
    totalCount,
}) => {
    const [formData, setFormData] = useState({
        id: initialData.id || "",
        publication_title: initialData.publication_title || "",
        publication_content: initialData.publication_content || "",
        publication_type: initialData.publication_type || "",
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
                publication_title: initialData.publication_title || "",
                publication_content: initialData.publication_content || "",
                publication_type: initialData.publication_type || "",
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

    const handleSubmitPublication = async () => {
        try {
            const currentDateTime = getCurrentDateTime();

            const publicationData = {
                ...formData,
                id: mode === "create" ? String(totalCount) : Number(initialData.id), // Ensure `id` is a number
                user_id: 0, // 0 sa ky wa pay login
                publication_type: "", //empty sa kay waz login
                date: mode === "create" ? currentDateTime : formData.date,
            };

            if (mode === "create") {
                await addPublication(publicationData);

                Swal.fire({
                    title: "Success!",
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
            } else if (mode === "edit") {
                await editPublication({
                    id: String(publicationData.id),
                    publication: publicationData,
                });

                Swal.fire({
                    title: "Success!",
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
            }
            onClose(); // Close modal after successful save
        } catch (error) {
            console.error("Error saving publication:", error);
        }
    };

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
            content={
                <Stack spacing={2}>
                    <TextField
                        id="outlined-title"
                        name="publication_title"
                        label="Title"
                        variant="outlined"
                        value={formData.publication_title}
                        onChange={handleInputChange}
                        disabled={mode === "view"}
                    />
                    <TextField
                        id="outlined-description"
                        name="publication_content"
                        label="Description"
                        variant="outlined"
                        multiline
                        minRows={5}
                        maxRows={10}
                        value={formData.publication_content}
                        onChange={handleInputChange}
                        disabled={mode === "view"}
                    />
                    <CustomUpload2 label="Attach Files" />
                </Stack>
            }
        ></ModalVariantTwo>
    );
};

export default CreateNewPublication;
