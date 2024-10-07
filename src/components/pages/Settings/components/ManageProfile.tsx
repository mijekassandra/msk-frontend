import React, { useState } from "react";
import { Stack, Typography, Grid, TextField, MenuItem, Avatar, Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// import components
import DashboardCard from "../../../cards/DashboardCard";
import TwoChoice from "../../../buttons/TwoChoice";

const ManageProfile = () => {
    const [sex, setSex] = useState("");

    const handleChange = (event: any) => {
        setSex(event.target.value);
    };

    return (
        <Stack rowGap={3}>
            <Typography variant="h2">Manage Profile</Typography>
            <DashboardCard
                content={
                    <Stack sx={{ padding: "20px" }} gap={6}>
                        <Grid container gap={3}>
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
                                    />
                                </Grid>
                            </Grid>
                            <Grid container item sm={12} gap={2}>
                                <Grid item sm={2} xs={12}>
                                    <Typography variant="body1">Birthdate</Typography>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            slotProps={{ textField: { size: "small" } }}
                                            sx={{
                                                marginTop: "8px",
                                                width: "100%",
                                            }}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item sm={1.5} xs={12}>
                                    <Typography variant="body1">Age</Typography>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        placeholder="Age"
                                        variant="outlined"
                                        margin="dense"
                                    />
                                </Grid>
                                <Grid item sm={2} xs={12}>
                                    <Typography variant="body1">Sex</Typography>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        select
                                        variant="outlined"
                                        margin="dense"
                                        label={!sex ? "Sex" : ""} // Show the label only if `sex` is not selected
                                        value={sex}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="" disabled>
                                            Select Sex
                                        </MenuItem>
                                        <MenuItem value="female">Female</MenuItem>
                                        <MenuItem value="male">Male</MenuItem>
                                        <MenuItem value="male">Prefer not to say</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item sm={2} xs={12}>
                                    <Typography variant="body1">Civil Status</Typography>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        placeholder="Civil Status"
                                        variant="outlined"
                                        margin="dense"
                                    />
                                </Grid>

                                <Grid item sm={2} xs={12}>
                                    <Typography variant="body1">Religion</Typography>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        placeholder="Religion"
                                        variant="outlined"
                                        margin="dense"
                                    />
                                </Grid>
                            </Grid>
                            <Grid container item sm={12} gap={2}>
                                <Grid item sm={3} xs={12}>
                                    <Typography variant="body1">Contact No.</Typography>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        placeholder="Contact No."
                                        variant="outlined"
                                        margin="dense"
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
