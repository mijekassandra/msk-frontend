import React, { useState } from "react";
import {
  Stack,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Avatar,
  Button,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// import components
import DashboardCard from "../../../cards/DashboardCard";
import TwoChoice from "../../../buttons/TwoChoice";

// api service
import {
  useGetUserProfileQuery,
  useUpdateProfileMutation,
} from "./api/accountApi";

const ManageProfile = () => {
  const { data, error, isLoading } = useGetUserProfileQuery();
  const { updateProfile, isLoading: updateProfileLoading } =
    useUpdateProfileMutation();

  const [formData, setFormData] = useState({
    gender: "",
    skills: "",
    interest: "",
    firstName: "",
    lastName: "",
    middleName: "",
    address: "",
    contactNo: "",
    email: "",
    birthdate: null,
    civilStatus: "",
    religion: "",
    voterStatus: "",
    educationalAttainment: "",
  });

  // Handle unified input change
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle date change
  const handleDateChange = (date: any) => {
    setFormData((prevData) => ({
      ...prevData,
      birthdate: date,
    }));
  };

  // update the profile button
  const handleProfileUpdate = async (formData) => {
    try {
      const response = await updateProfile(formData).unwrap();
      console.log("Profile updated successfully", response);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <Stack rowGap={3}>
      <Typography variant="h2">Manage Profile</Typography>
      <DashboardCard
        content={
          <Stack sx={{ padding: "20px" }} gap={6}>
            <Grid container gap={1}>
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
                    name="firstName"
                    value={formData.firstName}
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
                    name="lastName"
                    value={formData.lastName}
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
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
              <Grid container item sm={12} gap={2}>
                <Grid item sm={3} xs={12}>
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
                <Grid item sm={3} xs={12}>
                  <Typography variant="body1">Contact No.</Typography>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Contact No."
                    variant="outlined"
                    margin="dense"
                    name="contactNo"
                    value={formData.contactNo}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item sm={3} xs={12}>
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
                </Grid>
              </Grid>
              <Grid container item sm={12} gap={2}>
                <Grid item sm={2.2} xs={12}>
                  <Typography variant="body1">Birthdate</Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      slotProps={{ textField: { size: "small" } }}
                      value={formData.birthdate}
                      onChange={handleDateChange}
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
                    value={formData.gender}
                    onChange={handleInputChange}
                  >
                    <MenuItem value="" disabled>
                      Select Gender
                    </MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="noPreference">No Preference</MenuItem>
                  </TextField>
                </Grid>
                <Grid item sm={2.2} xs={12}>
                  <Typography variant="body1">Civil Status</Typography>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Civil Status"
                    variant="outlined"
                    margin="dense"
                    name="civilStatus"
                    value={formData.civilStatus}
                    onChange={handleInputChange}
                  />
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
                  <Typography variant="body1">Voter Status</Typography>
                  <TextField
                    fullWidth
                    size="small"
                    select
                    variant="outlined"
                    margin="dense"
                    name="voterStatus"
                    value={formData.voterStatus}
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
                  <Typography variant="body1">
                    Educational Attainment
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Educational Attainment"
                    variant="outlined"
                    margin="dense"
                  />
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
                    value={formData.interest}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Stack>
              <TwoChoice leftText="Cancel" rightText="Update" size="medium" />
            </Stack>
          </Stack>
        }
      ></DashboardCard>
    </Stack>
  );
};

export default ManageProfile;
