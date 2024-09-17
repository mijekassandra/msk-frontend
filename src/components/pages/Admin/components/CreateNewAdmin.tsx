import React, { useState, useEffect } from "react";
import { Stack, TextField } from "@mui/material";
import Swal from "sweetalert2";

//import component
import ModalVariantOne from "../../../modals/ModalVariantOne";
import CustomUpload from "../../../layout/CustomUpload";

interface CreateNewAdminProps {
    mode: "create" | "edit" | "view";
    initialData?: {
        id?: number;
        user_type?: string;
        first_name?: string;
        last_name?: string;
        username?: string;
        password?: string;
        date_of_birth?: string;
        gender?: "female" | "male";
        address?: string;
        email?: string;
        date?: string;
    };
    onClose: () => void;
    addAccount: any;
    editAccount: any;
    totalCount: number;
}

const CreateNewAdmin: React.FC<CreateNewAdminProps> = ({
    mode,
    initialData = {},
    onClose,
    addAccount,
    editAccount,
    totalCount,
}) => {
    const [formData, setFormData] = useState({
        id: initialData.id || "",
        user_type: initialData.user_type || "",
        first_name: initialData.first_name || "",
        last_name: initialData.last_name || "",
        username: initialData.username || "",
        password: initialData.password || "",
        date_of_birth: initialData.date_of_birth || "",
        gender: initialData.gender || "",
        address: initialData.address || "",
        email: initialData.email || "",
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
                user_type: initialData.user_type || "",
                first_name: initialData.first_name || "",
                last_name: initialData.last_name || "",
                username: initialData.username || "",
                password: initialData.password || "",
                date_of_birth: initialData.date_of_birth || "",
                gender: initialData.gender || "",
                address: initialData.address || "",
                email: initialData.email || "",
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

    const handleSubmitAccount = async () => {
        try {
            const currentDateTime = getCurrentDateTime();

            const accountData = {
                ...formData,
                id: mode === "create" ? String(totalCount) : Number(initialData.id), // Ensure `id` is a number
                user_type: "Chairperson",
                date: mode === "create" ? currentDateTime : formData.date,
            };

            if (mode === "create") {
                await addAccount(accountData);

                Swal.fire({
                    title: "Success!",
                    text: "The account has been successfully created.",
                    icon: "success",
                    confirmButtonText: "OK",
                });
            } else if (mode === "edit") {
                await editAccount({
                    id: String(accountData.id),
                    account: accountData,
                });

                Swal.fire({
                    title: "Success!",
                    text: "The account has been successfully updated.",
                    icon: "success",
                    confirmButtonText: "OK",
                });
            }
            onClose(); // Close modal after successful save
        } catch (error) {
            console.error("Error saving publication:", error);
        }
    };

    return (
        <ModalVariantOne
            onClose={onClose}
            onSave={handleSubmitAccount}
            headerTitle={
                mode === "create"
                    ? "Create Account"
                    : mode === "edit"
                    ? "Edit Account"
                    : "View Account"
            }
            mode={mode}
            content={
                <Stack spacing={2.5}>
                    <TextField
                        id="outlined-username"
                        name="username"
                        label="Username"
                        variant="outlined"
                        value={formData.username}
                        onChange={handleInputChange}
                        disabled={mode === "view"}
                    />
                    <TextField
                        id="outlined-email"
                        name="email"
                        label="Email"
                        variant="outlined"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={mode === "view"}
                    />
                </Stack>
            }
        />
    );
};

export default CreateNewAdmin;
