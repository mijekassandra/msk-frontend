import React, { useState, useEffect } from "react";
import {
    Stack,
    TextField,
    MenuItem,
    Typography,
    Alert,
    Box,
} from "@mui/material";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

//import component
import ModalVariantOne from "../../../modals/ModalVariantOne";

interface CreateNewAdminProps {
    mode: "create" | "edit" | "view";
    initialData?: {
        id?: number;
        username?: string;
        email?: string;
        role?: string;
        barangay?: string;
    };
    onClose: () => void;
    addAccount: any;
    editAccount: any;
}

const CreateNewAdmin: React.FC<CreateNewAdminProps> = ({
    mode,
    initialData = {},
    onClose,
    addAccount,
    editAccount,
}) => {
    // logged in user details
    const userDetail = useSelector((state: RootState) => state.auth.user);

    // states
    const [formData, setFormData] = useState({
        id: initialData.id || "",
        username: initialData.username || "",
        email: initialData.email || "",
        role: initialData.role || "",
        barangay: initialData.barangay || "",
    });
    const [errorDisplay, setErrorDisplay] = useState("");
    const [fieldErrors, setFieldErrors] = useState({
        username: false,
        email: false,
        barangay: false,
    });
    const [alert, setAlert] = useState(null);

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
            username: !formData.username,
            email: !formData.email,
            barangay: !formData.barangay,
        };

        setFieldErrors(errors);

        // Check if any errors exist
        return !Object.values(errors).some((error) => error === true);
    };

    const handleSubmitAccount = async () => {
        // Validate form before submitting
        const isValid = validateForm();

        if (!isValid) {
            setErrorDisplay("Please fill in all required fields");
            return;
        }

        try {
            const accountData = {
                ...formData,
                barangay: formData.barangay || userDetail?.barangay, // Default to userDetail's barangay if formData.barangay is empty
                role:
                    userDetail?.role === "Super Admin"
                        ? "Federation"
                        : userDetail?.role === "Chairperson"
                        ? "User"
                        : userDetail?.role === "Federation"
                        ? "Chairperson"
                        : "Default Role",
            };

            if (mode === "create") {
                const response = await addAccount(accountData);

                if (response.error) {
                    setAlert(response.error.data.message);
                    setTimeout(() => {
                        setAlert(null);
                    }, 4000);
                } else if (
                    response.data &&
                    response.data.status === "success"
                ) {
                    // Handle success response
                    Swal.fire({
                        title: "Success!",
                        text: "The account has been successfully created.",
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
                const response = await editAccount({
                    id: String(accountData.id),
                    account: accountData,
                });

                if (response.error) {
                    setAlert(response.error.data.message);
                    setTimeout(() => {
                        setAlert(null);
                    }, 4000);
                } else if (
                    response.data &&
                    response.data.status === "success"
                ) {
                    // Handle success response
                    Swal.fire({
                        title: "Success!",
                        text: "The account has been successfully updated.",
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
            console.log("Failed:", errorMessage);
            setErrorDisplay(errorMessage);

            setTimeout(() => {
                setErrorDisplay("");
            }, 5000);
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
            maxWidth="400px"
            content={
                <Stack rowGap={2}>
                    <TextField
                        id="outlined-username"
                        name="username"
                        label="Username"
                        variant="outlined"
                        value={formData.username}
                        onChange={handleInputChange}
                        error={fieldErrors.username}
                        disabled={mode === "view"}
                    />
                    <TextField
                        id="outlined-email"
                        name="email"
                        label="Email"
                        variant="outlined"
                        value={formData.email}
                        error={fieldErrors.email}
                        onChange={handleInputChange}
                        disabled={mode === "view"}
                    />

                    {(userDetail?.role === "Super Admin" ||
                        userDetail?.role === "Federation") && (
                        <TextField
                            fullWidth
                            label="Barangay"
                            select
                            variant="outlined"
                            name="barangay"
                            placeholder="Select Barangay"
                            value={formData.barangay}
                            error={fieldErrors?.barangay}
                            onChange={handleInputChange}
                            disabled={mode === "view"}
                        >
                            <MenuItem value="">Select Barangay</MenuItem>
                            <MenuItem value="Poblacion">Poblacion</MenuItem>
                            <MenuItem value="Kabulawan">Kabulawan</MenuItem>
                            <MenuItem value="Dampil">Dampil</MenuItem>
                            <MenuItem value="Manaol">Manaol</MenuItem>
                            <MenuItem value="Banglay">Banglay</MenuItem>
                            <MenuItem value="Tabok">Tabok</MenuItem>
                            <MenuItem value="Kauswagan">Kauswagan</MenuItem>
                            <MenuItem value="Gaston">Gaston</MenuItem>
                            <MenuItem value="Lumbo">Lumbo</MenuItem>
                            <MenuItem value="Umagos">Umagos</MenuItem>
                        </TextField>
                    )}

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
            }
        />
    );
};

export default CreateNewAdmin;
