import React, { useState, useEffect } from "react";
import { Stack, Typography, Grid, TextField, MenuItem, Avatar, Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";

// import components
import DashboardCard from "../../../cards/DashboardCard";
import TwoChoice from "../../../buttons/TwoChoice";
import LoadingDisplay from "../../../displays/LoadingDisplay";

// api service
import { useGetUserProfileQuery, useUpdateProfileMutation } from "./api/userProfileApi";

const ManageProfile = () => {
    // get and update profile
    const { data: userProfile, isLoading: userProfileLoading } = useGetUserProfileQuery();
    const [updateProfile, { isLoading: updateProfileLoading }] = useUpdateProfileMutation();

    // Combine the loading states
    const isLoading = userProfileLoading || updateProfileLoading;

    // logged in user details
    const userDetail = useSelector((state: RootState) => state.auth);

    const [formData, setFormData] = useState({
        first_name: "",
        middle_name: "",
        last_name: "",
        gender: "",
        address: "",
        contact_number: "",
        email: "",
        date_of_birth: null,
        civil_status: "",
        religion: "",
        voter_status: "",
        educational_attainment: "",
        skills: "",
        interest: "",
    });

    // Handle unified input change for other textfield
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // specific for Date Change
    const handleDateChange = (newDate) => {
        setFormData({
            ...formData,
            // Format the date to "YYYY-MM-DD" (Year-Month-Day) and exclude time
            date_of_birth: newDate ? dayjs(newDate).format("YYYY-MM-DD") : null,
        });
    };

    // update the profile button
    const handleProfileUpdate = async (formData) => {
        const formDataToSend = new FormData();

        // Ensure date_of_birth remains in correct format
        const formDataToSendCopy = {
            ...formData,
            date_of_birth: formData.date_of_birth
                ? dayjs(formData.date_of_birth).format("YYYY-MM-DD")
                : null,
        };

        // Append all form fields
        for (const [key, value] of Object.entries(formData)) {
            formDataToSend.append(key, value);
        }

        try {
            const response = await updateProfile(formDataToSend).unwrap();

            Swal.fire({
                title: "Success!",
                text: "The profile has been updated successfully.",
                icon: "success",
                confirmButtonText: "OK",
                customClass: {
                    title: "my-swal-title",
                    htmlContainer: "my-swal-text",
                    popup: "my-swal-popup",
                    confirmButton: "my-swal-button",
                },
            });

            console.log("Profile updated successfully", response);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        handleProfileUpdate(formData);
    };

    useEffect(() => {
        if (userProfile) {
            setFormData({
                first_name: userProfile.data.first_name || "",
                middle_name: userProfile.data.middle_name || "",
                last_name: userProfile.data.last_name || "",
                gender: userProfile.data.gender || "",
                address: userProfile.data.address || "",
                contact_number: userProfile.data.contact_number || "",
                email: userProfile.data.email || "",
                date_of_birth: userProfile.data.date_of_birth || null,
                civil_status: userProfile.data.civil_status || "",
                religion: userProfile.data.religion || "",
                voter_status: userProfile.data.voter_status || "",
                educational_attainment: userProfile.data.educational_attainment || "",
                skills: userProfile.data.skills || "",
                interest: userProfile.data.interest || "",
            });
        }
    }, [userProfile]); // refetch when updated the profile

    useEffect(() => {
        console.log("Updated user detail: ", userDetail);
    }, [userDetail]);

    return (
        <Stack rowGap={3}>
            <Typography variant="h2">Manage Profile</Typography>
            <DashboardCard
                content={
                    <Stack sx={{ padding: "20px" }} gap={6}>
                        <Grid container gap={2}>
                            <Grid item xs={12}>
                                <Stack direction="row" alignItems="center" spacing={2}>
                                    <Avatar
                                        alt="Profile Avatar"
                                        // src={avatar} // Set avatar image
                                        sx={{ width: 80, height: 80 }}
                                    />
                                    <Stack spacing={1}>
                                        <Button
                                            size="small"
                                            variant="contained"
                                            component="label"
                                            sx={{
                                                fontSize: "12px",
                                                backgroundColor: "#333",
                                                color: "#fff",
                                                borderRadius: 1,
                                                "&:hover": {
                                                    backgroundColor: "#555",
                                                },
                                            }}
                                        >
                                            Change Avatar
                                            <input
                                                type="file"
                                                accept="image/*"
                                                hidden
                                                // onChange={handleAvatarChange}
                                            />
                                        </Button>
                                        <Typography variant="caption" color="textSecondary">
                                            JPG or PNG. 5MB max.
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </Grid>
                            <Grid container item sm={12} gap={2}>
                                <Grid item sm={3} xs={12}>
                                    <Typography variant="body1">First name</Typography>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        placeholder="First Name"
                                        variant="outlined"
                                        margin="dense"
                                        name="first_name"
                                        value={formData.first_name}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item sm={3} xs={12}>
                                    <Typography variant="body1">Last name</Typography>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        placeholder="Last Name"
                                        variant="outlined"
                                        margin="dense"
                                        name="last_name"
                                        value={formData.last_name}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item sm={3} xs={12}>
                                    <Typography variant="body1">Middle name</Typography>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        placeholder="Middle Name"
                                        variant="outlined"
                                        margin="dense"
                                        name="middle_name"
                                        value={formData.middle_name}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container item sm={12} gap={2}>
                                <Grid item sm={2.2} xs={12}>
                                    <Typography variant="body1">Birthdate</Typography>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            slotProps={{
                                                textField: {
                                                    size: "small",
                                                    inputProps: {
                                                        "aria-hidden": false,
                                                    },
                                                },
                                            }}
                                            value={
                                                formData.date_of_birth
                                                    ? dayjs(formData.date_of_birth)
                                                    : null
                                            }
                                            onChange={(newDate) => {
                                                handleDateChange(
                                                    newDate
                                                        ? dayjs(newDate).format("YYYY-MM-DD")
                                                        : null
                                                );
                                            }}
                                            sx={{
                                                marginTop: "8px",
                                                width: "100%",
                                            }}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item sm={2.2} xs={12}>
                                    <Typography variant="body1">Gender</Typography>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        select
                                        variant="outlined"
                                        margin="dense"
                                        name="gender"
                                        placeholder="Select Gender"
                                        value={formData.gender}
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="" disabled>
                                            Select Gender
                                        </MenuItem>
                                        <MenuItem value="Female">Female</MenuItem>
                                        <MenuItem value="Male">Male</MenuItem>
                                        <MenuItem value="No Preference">No Preference</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item sm={2.2} xs={12}>
                                    <Typography variant="body1">Civil Status</Typography>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        select
                                        variant="outlined"
                                        margin="dense"
                                        name="civil_status"
                                        value={formData.civil_status}
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="" disabled>
                                            Select Civil Status
                                        </MenuItem>
                                        <MenuItem value="Single">Single</MenuItem>
                                        <MenuItem value="Married">Married</MenuItem>
                                        <MenuItem value="Separated">Separated</MenuItem>
                                        <MenuItem value="Divorced">Divorced</MenuItem>
                                        <MenuItem value="Widowed">Widowed</MenuItem>
                                    </TextField>
                                </Grid>

                                <Grid item sm={2.2} xs={12}>
                                    <Typography variant="body1">Religion</Typography>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        placeholder="Religion"
                                        variant="outlined"
                                        margin="dense"
                                        name="religion"
                                        value={formData.religion}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container item sm={12} gap={2}>
                                <Grid item sm={4.6} xs={12}>
                                    <Typography variant="body1">Address</Typography>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        placeholder="Address"
                                        variant="outlined"
                                        margin="dense"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item sm={4.6} xs={12}>
                                    <Typography variant="body1">Contact No.</Typography>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        placeholder="Contact No."
                                        variant="outlined"
                                        margin="dense"
                                        name="contact_number"
                                        value={formData.contact_number}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                {/* <Grid item sm={3} xs={12}>
                  <Typography variant="body1">Email Address</Typography>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Email Address"
                    variant="outlined"
                    margin="dense"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </Grid> */}
                            </Grid>

                            <Grid container item sm={12} gap={2}>
                                <Grid item sm={4.6} xs={12}>
                                    <Typography variant="body1">Voter Status</Typography>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        select
                                        variant="outlined"
                                        margin="dense"
                                        name="voter_status"
                                        value={formData.voter_status}
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="" disabled>
                                            Select Status
                                        </MenuItem>
                                        <MenuItem value="active">Active</MenuItem>
                                        <MenuItem value="inactive">Inactive</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item sm={4.6} xs={12}>
                                    <Typography variant="body1">Educational Attainment</Typography>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        select
                                        variant="outlined"
                                        margin="dense"
                                        name="educational_attainment"
                                        value={formData.educational_attainment}
                                        onChange={handleInputChange}
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
                                        <MenuItem value="College Level">College Level</MenuItem>
                                        <MenuItem value="College Graduate">
                                            College Graduate
                                        </MenuItem>
                                        <MenuItem value="Masters Degree">Masters Degree</MenuItem>
                                        <MenuItem value="Doctorate Degree">
                                            Doctorate Degree
                                        </MenuItem>
                                    </TextField>
                                </Grid>
                            </Grid>

                            <Grid container item sm={12} gap={2}>
                                <Grid item sm={4.6} xs={12}>
                                    <Typography variant="body1">Skills</Typography>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        placeholder="Type your skills separated by commas (,) "
                                        variant="outlined"
                                        margin="dense"
                                        name="skills"
                                        multiline
                                        value={formData.skills}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item sm={4.6} xs={12}>
                                    <Typography variant="body1">Interest</Typography>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        placeholder="Type your interest separated by commas (,) "
                                        variant="outlined"
                                        margin="dense"
                                        name="interest"
                                        multiline
                                        value={formData.interest}
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Stack>
                            <TwoChoice
                                rightText="Update"
                                size="medium"
                                rightOnClick={handleSubmit}
                            />
                        </Stack>
                    </Stack>
                }
            ></DashboardCard>

            <LoadingDisplay open={isLoading} />
        </Stack>
    );
};

export default ManageProfile;
