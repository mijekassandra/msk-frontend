import React, { useState, useEffect } from "react";
import "../../../../index.css";
import {
    Divider,
    Stack,
    TextField,
    Typography,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
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
    onClose: () => void;
    // addYouthProfiling: any;
    editYouthProfiling: any;
}

const CreateNewProfiling: React.FC<CreateNewProfilingProps> = ({
    mode,
    initialData = {},
    onClose,
    // addYouthProfiling,
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
        date_of_birth: initialData.date_of_birth || null,
        civil_status: initialData.civil_status || "",
        gender: initialData.gender || "",
        religion: initialData.religion || "",
        contact_number: initialData.contact_number || "",
        email: initialData.email || "",
        voter_status: initialData.voter_status || "",
        address: initialData.address || "",
        purok: initialData.purok || "",
        educational_attainment: initialData.educational_attainment || "",
        educational_reason: initialData.educational_reason || "",
        disability: initialData.disability || "",
        medical_condition: initialData.medical_condition || "",
        youth_organization: initialData.youth_organization || "",
        occupation: initialData.occupation || "",
        agency: initialData.agency || "",
        skills: initialData.skills || "",
        interest: initialData.interest || "",
        isMember: initialData.youth_organization ? "yes" : "no",
        age: null,
    });

    // Handle unified input change for other textfield
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handler for date_of_birth field change
    const handleDateChange = (newDate: any) => {
        if (!newDate) {
            setFormData((prevData) => ({
                ...prevData,
                date_of_birth: null,
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
        try {
            if (mode === "create") {
                console.log("create");
            } else if (mode == "edit") {
                console.log("edit");
            }
        } catch (error) {
            console.log("Failed:", error);
        }
    };

    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            isMember: formData.youth_organization ? "yes" : "no",
        }));
    }, [formData.youth_organization]);

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
            content={
                <Stack spacing={2} height="auto">
                    <Typography variant="h5">Personal Information</Typography>
                    <Grid container rowGap={2}>
                        <Grid container item spacing={2} xs={12}>
                            <Grid item xs={12} sm={6} md={3}>
                                <TextField
                                    name="last_name"
                                    label="Last Name"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    disabled={mode === "view"}
                                    value={formData.last_name}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <TextField
                                    name="first_name"
                                    label="First Name"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    disabled={mode === "view"}
                                    value={formData.first_name}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <TextField
                                    name="middle_name"
                                    label="Middle Name"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    disabled={mode === "view"}
                                    value={formData.middle_name}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <TextField
                                    name="ext"
                                    label="Ext."
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    disabled={mode === "view"}
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
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    name="age"
                                    label="Age"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    value={formData.age} // Display the calculated age
                                    disabled={true}
                                />
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    select
                                    variant="outlined"
                                    name="gender"
                                    placeholder="Select Gender"
                                    value={formData.gender || ""}
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
                        </Grid>

                        <Grid container item spacing={2} xs={12}>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    select
                                    variant="outlined"
                                    name="civil_status"
                                    value={formData.civil_status || ""}
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

                            <Grid item xs={12} sm={4}>
                                <TextField
                                    name="religion"
                                    label="Religion"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    disabled={mode === "view"}
                                    value={formData.religion || ""}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    name="purok"
                                    label="Purok"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    disabled={mode === "view"}
                                    onChange={handleInputChange}
                                    value={formData.purok || ""}
                                />
                            </Grid>
                        </Grid>

                        <Grid container item spacing={2} xs={12}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="contact_number"
                                    label="Contact No."
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    disabled={mode === "view"}
                                    value={formData.contact_number || ""}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="email_address"
                                    label="Email Address"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    disabled={mode === "view"}
                                    value={formData.email || ""}
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
                                    name="educational_attainment"
                                    value={
                                        formData.educational_attainment || ""
                                    }
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
                                    variant="outlined"
                                    name="occupation"
                                    value={formData.occupation || ""}
                                    disabled={mode === "view"}
                                    onChange={handleInputChange}
                                    label="Working"
                                >
                                    <MenuItem value="" disabled>
                                        Working?
                                    </MenuItem>
                                    <MenuItem value="yes">Yes</MenuItem>
                                    <MenuItem value="no">No</MenuItem>
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

                    <Grid container rowGap={2}>
                        <Grid container item spacing={2} xs={12}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    select
                                    variant="outlined"
                                    name="disability"
                                    disabled={mode === "view"}
                                    value={formData.disability || ""}
                                    onChange={handleInputChange}
                                    label="Do you have disability/ies?"
                                >
                                    <MenuItem value="" disabled>
                                        Do you have disability/ies?
                                    </MenuItem>
                                    <MenuItem value="yes">Yes</MenuItem>
                                    <MenuItem value="no">No</MenuItem>
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
                                    value={formData.medical_condition || ""}
                                    onChange={handleInputChange}
                                    label="Do you have medical condition?"
                                >
                                    <MenuItem value="" disabled>
                                        Do you have medical condition?
                                    </MenuItem>
                                    <MenuItem value="yes">Yes</MenuItem>
                                    <MenuItem value="no">No</MenuItem>
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
                                    value={formData.isMember}
                                    onChange={handleInputChange}
                                    label="Are you a member of any youth organization"
                                >
                                    <MenuItem value="" disabled>
                                        Are you a member of any youth
                                        organization
                                    </MenuItem>
                                    <MenuItem value="yes">Yes</MenuItem>
                                    <MenuItem value="no">No</MenuItem>
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
                                    value={formData.skills}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <TextField
                                    name="interests"
                                    label="Interest"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    disabled={mode === "view"}
                                    value={formData.interest}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Stack>
            }
        />
    );
};

export default CreateNewProfiling;
