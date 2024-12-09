import React, { useState, useEffect } from "react";
import "../../../../index.css";
import {
    Stack,
    TextField,
    Typography,
    Grid,
    MenuItem,
    Alert,
    Box,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Swal from "sweetalert2";

// import components
import ModalVariantOne from "../../../modals/ModalVariantOne";

interface CreateNewProfilingProps {
    mode: "create" | "edit" | "view";
    initialData?: {
        id?: number;
        first_name?: string;
        last_name?: string;
        middle_name?: string;
        name_ext?: string;
        date_of_birth?: string;
        civil_status?: string;
        gender?: string;
        religion?: string;
        contact_number?: string;
        email?: string;
        voter_status?: string;
        address?: string;
        purok?: string;
        educational_attainment?: string;
        educational_reason?: string;
        occupation?: string;
        agency?: string;
        disability?: string;
        medical_condition?: string;
        youth_organization?: string;
        skills?: string;
        interest?: string;
        isMember?: string;
        // profile_img?: string;
    };
    age?: number;
    onClose: () => void;
    addYouthProfiling: any;
    editYouthProfiling: any;
}

const CreateNewProfiling: React.FC<CreateNewProfilingProps> = ({
    mode,
    initialData = {},
    onClose,
    age,
    addYouthProfiling,
    editYouthProfiling,
}) => {
    // specific for calculating age
    const calculateAge = (dateOfBirth: any) => {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        if (
            monthDifference < 0 ||
            (monthDifference === 0 && today.getDate() < birthDate.getDate())
        ) {
            age--;
        }

        return age;
    };

    const [formData, setFormData] = useState({
        id: initialData.id || "",
        first_name: initialData.first_name || "",
        last_name: initialData.last_name || "",
        middle_name: initialData.middle_name || "",
        name_ext: initialData.name_ext || "",
        date_of_birth: initialData.date_of_birth
            ? dayjs(initialData.date_of_birth).format("YYYY-MM-DD")
            : "",
        civil_status: initialData.civil_status || "",
        gender: initialData.gender || "",
        religion: initialData.religion || "",
        contact_number: initialData.contact_number || "",
        email: initialData.email || "",
        voter_status: initialData.voter_status || "",
        address: initialData.address || "",
        educational_attainment: initialData.educational_attainment || "",
        educational_reason: initialData.educational_reason || "",
        disability: initialData.disability || "",
        medical_condition: initialData.medical_condition || "",
        youth_organization: initialData.youth_organization || "",
        occupation: initialData.occupation || "",
        agency: initialData.agency || "",
        skills: initialData.skills || "",
        interest: initialData.interest || "",
        isMember: initialData.isMember || "no",
        age: age || null,
    });
    const [errorDisplay, setErrorDisplay] = useState("");
    const [fieldErrors, setFieldErrors] = useState({
        first_name: false,
        last_name: false,
        middle_name: false,
        date_of_birth: false,
        civil_status: false,
        gender: false,
        religion: false,
        contact_number: false,
        email: false,
        voter_status: false,
        address: false,
        educational_attainment: false,
        disability: false,
        medical_condition: false,
        occupation: false,
    });
    const [alert, setAlert] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement> | any
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
            ...(name === "isMember" && value === "no"
                ? { youth_organization: "" }
                : {}),
        }));
    };

    const validateForm = () => {
        const errors = {
            first_name: !formData.first_name,
            last_name: !formData.last_name,
            middle_name: !formData.middle_name,
            date_of_birth: !formData.date_of_birth,
            civil_status: !formData.civil_status,
            gender: !formData.gender,
            religion: !formData.religion,
            contact_number: !formData.contact_number,
            email: !formData.email,
            voter_status: !formData.voter_status,
            address: !formData.address,
            educational_attainment: !formData.educational_attainment,
            disability: !formData.disability,
            medical_condition: !formData.medical_condition,
            occupation: !formData.occupation,
        };

        setFieldErrors(errors);

        // Check if any errors exist
        return !Object.values(errors).some((error) => error === true);
    };

    // Handler for date_of_birth field change
    const handleDateChange = (newDate: any) => {
        if (!newDate) {
            setFormData((prevData) => ({
                ...prevData,
                date_of_birth: "",
                age: null,
            }));
            return;
        }

        const formattedDate = dayjs(newDate).format("YYYY-MM-DD");
        const age = calculateAge(formattedDate);

        setFormData((prevData) => ({
            ...prevData,
            date_of_birth: formattedDate,
            age: age,
        }));
    };

    const handleSubmitProfiling = async () => {
        const isValid = validateForm();

        if (!isValid) {
            setErrorDisplay("Please fill in all required fields");
            return;
        }

        setLoading(true); // Start loading

        try {
            const formDataToSend = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                formDataToSend.append(key, String(value ?? ""));
            });

            if (mode === "create") {
                const response = await addYouthProfiling(formDataToSend);

                if (response.error) {
                    setAlert(
                        response.error.message || "Failed to create profile."
                    );
                    setTimeout(() => setAlert(null), 4000);
                } else if (response.data?.status === "success") {
                    Swal.fire({
                        title: "Success!",
                        text: "KK Profile has been successfully created.",
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
                const response = await editYouthProfiling({
                    id: formData.id,
                    data: formData,
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
                    Swal.fire({
                        title: "Success!",
                        text: "KK Profile has been successfully updated.",
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
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            isMember: formData.youth_organization ? "yes" : "no",
        }));
    }, [formData.youth_organization]);

    useEffect(() => {
        if (errorDisplay) {
            const timer = setTimeout(() => {
                setErrorDisplay("");
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [errorDisplay]);

    return (
        <ModalVariantOne
            onClose={onClose}
            onSave={handleSubmitProfiling}
            headerTitle={
                mode === "create"
                    ? "Add KK Information"
                    : mode === "edit"
                    ? "Edit KK Information"
                    : "View KK Information"
            }
            mode={mode}
            maxWidth={"60%"}
            loading={loading}
            content={
                <Stack
                    spacing={2}
                    sx={{
                        height: "400px",
                        overflowY: "auto",
                        paddingBottom: "20px",
                    }}
                >
                    <Typography variant="h5">Personal Information</Typography>
                    <Grid container rowGap={2}>
                        <Grid container item spacing={2} xs={12}>
                            <Grid item xs={12} sm={6} md={3}>
                                <TextField
                                    name="first_name"
                                    label="First Name"
                                    required
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    disabled={mode === "view"}
                                    value={formData.first_name || ""}
                                    error={fieldErrors?.first_name}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <TextField
                                    name="last_name"
                                    label="Last Name"
                                    required
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    disabled={mode === "view"}
                                    value={formData.last_name || ""}
                                    error={fieldErrors?.last_name}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <TextField
                                    name="middle_name"
                                    label="Middle Name"
                                    required
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    disabled={mode === "view"}
                                    value={formData.middle_name || ""}
                                    error={fieldErrors?.middle_name}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <TextField
                                    name="name_ext"
                                    label="Ext."
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    disabled={mode === "view"}
                                    value={formData.name_ext || ""}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                        </Grid>

                        <Grid container item spacing={2} xs={12}>
                            <Grid item xs={12} sm={4}>
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                >
                                    <DatePicker
                                        slotProps={{
                                            textField: {
                                                size: "small",
                                                inputProps: {
                                                    "aria-hidden": false,
                                                },
                                            },
                                        }}
                                        label="Birthdate"
                                        disabled={mode === "view"}
                                        value={
                                            formData.date_of_birth
                                                ? dayjs(formData.date_of_birth)
                                                : null
                                        }
                                        onChange={(newDate) =>
                                            handleDateChange(newDate)
                                        }
                                        sx={{
                                            width: "100%",
                                        }}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <TextField
                                    name="age"
                                    label="Age"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    value={formData.age || ""}
                                    disabled={true}
                                />
                            </Grid>

                            <Grid item xs={12} sm={3}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    select
                                    variant="outlined"
                                    name="gender"
                                    placeholder="Select Gender"
                                    value={formData.gender || ""}
                                    required
                                    error={fieldErrors?.gender}
                                    disabled={mode === "view"}
                                    onChange={handleInputChange}
                                    label="Gender"
                                >
                                    <MenuItem value="" disabled>
                                        Select Gender
                                    </MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="No Preference">
                                        No Preference
                                    </MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    select
                                    placeholder="Voter Status"
                                    required
                                    variant="outlined"
                                    name="voter_status"
                                    value={formData.voter_status}
                                    error={fieldErrors?.voter_status}
                                    onChange={handleInputChange}
                                    label="Select Voter Status"
                                >
                                    <MenuItem value="" disabled>
                                        Selec Voter Status
                                    </MenuItem>
                                    <MenuItem value="active">Active</MenuItem>
                                    <MenuItem value="inactive">
                                        Inactive
                                    </MenuItem>
                                </TextField>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                name="address"
                                label="Address"
                                required
                                variant="outlined"
                                size="small"
                                fullWidth
                                disabled={mode === "view"}
                                value={formData.address || ""}
                                error={fieldErrors?.address}
                                onChange={handleInputChange}
                            />
                        </Grid>

                        <Grid container item spacing={2} xs={12}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="contact_number"
                                    label="Contact No."
                                    required
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    disabled={mode === "view"}
                                    value={formData.contact_number || ""}
                                    error={fieldErrors?.contact_number}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="email"
                                    label="Email Address"
                                    required
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    disabled={mode === "view"}
                                    value={formData.email || ""}
                                    error={fieldErrors?.email}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                        </Grid>
                        <Grid container item spacing={2} xs={12}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    required
                                    select
                                    variant="outlined"
                                    name="civil_status"
                                    value={formData.civil_status || ""}
                                    error={fieldErrors?.civil_status}
                                    onChange={handleInputChange}
                                    disabled={mode === "view"}
                                    label="Civil Status"
                                >
                                    <MenuItem value="" disabled>
                                        Civil Status
                                    </MenuItem>
                                    <MenuItem value="Single">Single</MenuItem>
                                    <MenuItem value="Married">Married</MenuItem>
                                    <MenuItem value="Separated">
                                        Separated
                                    </MenuItem>
                                    <MenuItem value="Divorced">
                                        Divorced
                                    </MenuItem>
                                    <MenuItem value="Widowed">Widowed</MenuItem>
                                </TextField>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="religion"
                                    label="Religion"
                                    variant="outlined"
                                    required
                                    size="small"
                                    fullWidth
                                    disabled={mode === "view"}
                                    value={formData.religion || ""}
                                    error={fieldErrors?.religion}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                        </Grid>

                        <Grid container item spacing={2} xs={12}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    select
                                    variant="outlined"
                                    required
                                    name="educational_attainment"
                                    value={
                                        formData.educational_attainment || ""
                                    }
                                    error={fieldErrors?.educational_attainment}
                                    disabled={mode === "view"}
                                    onChange={handleInputChange}
                                    label="Select Educational Attainment"
                                >
                                    <MenuItem value="" disabled>
                                        Select Educational Attainment
                                    </MenuItem>
                                    <MenuItem value="Elementary Level">
                                        Elementary Level
                                    </MenuItem>
                                    <MenuItem value="Elementary Graduate">
                                        Elementary Graduate
                                    </MenuItem>
                                    <MenuItem value="High School Level">
                                        High School Level
                                    </MenuItem>
                                    <MenuItem value="High School Graduate ">
                                        High School Graduate{" "}
                                    </MenuItem>
                                    <MenuItem value="College Level">
                                        College Level
                                    </MenuItem>
                                    <MenuItem value="College Graduate">
                                        College Graduate
                                    </MenuItem>
                                    <MenuItem value="Masters Degree">
                                        Masters Degree
                                    </MenuItem>
                                    <MenuItem value="Doctorate Degree">
                                        Doctorate Degree
                                    </MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="educational_reason"
                                    value={formData.educational_reason || ""}
                                    label="If out of School Youth, please indicate reason"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    onChange={handleInputChange}
                                    disabled={mode === "view"}
                                />
                            </Grid>
                        </Grid>

                        <Grid container item spacing={2} xs={12}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    select
                                    required
                                    variant="outlined"
                                    name="occupation"
                                    value={formData.occupation || ""}
                                    error={fieldErrors?.occupation}
                                    disabled={mode === "view"}
                                    onChange={handleInputChange}
                                    label="Working"
                                >
                                    <MenuItem value="" disabled>
                                        Working?
                                    </MenuItem>
                                    <MenuItem value="no">No</MenuItem>
                                    <MenuItem value="yes">Yes</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="agency"
                                    value={formData.agency || ""}
                                    label="If government, what agency?"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    disabled={mode === "view"}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Typography variant="h5">Other Information</Typography>

                    <Grid container rowGap={2} paddingBottom={2}>
                        <Grid container item spacing={2} xs={12}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    select
                                    variant="outlined"
                                    name="disability"
                                    disabled={mode === "view"}
                                    required
                                    value={formData.disability || ""}
                                    error={fieldErrors?.disability}
                                    onChange={handleInputChange}
                                    label="Do you have disability/ies?"
                                >
                                    <MenuItem value="" disabled>
                                        Do you have disability/ies?
                                    </MenuItem>
                                    <MenuItem value="no">No</MenuItem>
                                    <MenuItem value="yes">Yes</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    select
                                    variant="outlined"
                                    name="medical_condition"
                                    disabled={mode === "view"}
                                    required
                                    value={formData.medical_condition || ""}
                                    error={fieldErrors?.medical_condition}
                                    onChange={handleInputChange}
                                    label="Do you have medical condition?"
                                >
                                    <MenuItem value="" disabled>
                                        Do you have medical condition?
                                    </MenuItem>
                                    <MenuItem value="no">No</MenuItem>
                                    <MenuItem value="yes">Yes</MenuItem>
                                </TextField>
                            </Grid>
                        </Grid>

                        <Grid container item spacing={2} xs={12}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    select
                                    variant="outlined"
                                    name="isMember"
                                    disabled={mode === "view"}
                                    value={formData.isMember || ""}
                                    onChange={handleInputChange}
                                    label="Are you a member of any youth organization"
                                >
                                    <MenuItem value="" disabled>
                                        Are you a member of any youth
                                        organization
                                    </MenuItem>
                                    <MenuItem value="no">No</MenuItem>
                                    <MenuItem value="yes">Yes</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                {formData.isMember === "yes" && (
                                    <TextField
                                        name="Organization"
                                        label="If YES, please specify what organization"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        disabled={mode === "view"}
                                        onChange={handleInputChange}
                                    />
                                )}
                            </Grid>
                        </Grid>

                        <Grid container item spacing={2} xs={12}>
                            <Grid item xs={12} sm={6} md={6}>
                                <TextField
                                    name="skills"
                                    label="Skills"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    disabled={mode === "view"}
                                    value={formData.skills || ""}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <TextField
                                    name="interest"
                                    label="Interest"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    disabled={mode === "view"}
                                    value={formData.interest || ""}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                        </Grid>
                        {errorDisplay && (
                            <Typography
                                variant="caption"
                                textAlign="right"
                                color="error.main"
                                width="100%"
                            >
                                {errorDisplay}
                            </Typography>
                        )}
                    </Grid>
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
            }
        />
    );
};

export default CreateNewProfiling;
