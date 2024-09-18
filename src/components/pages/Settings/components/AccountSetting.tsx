import React from "react";
import { Stack, Typography, Grid, TextField } from "@mui/material";

// import components
import DashboardCard from "../../../cards/DashboardCard";
import TwoChoice from "../../../buttons/TwoChoice";

const AccountSetting = () => {
    return (
        <Stack rowGap={3}>
            <Typography variant="h2">Account Setting</Typography>
            <DashboardCard
                content={
                    <Grid
                        container
                        sm={12}
                        gap={2}
                        sx={{ padding: "20px" }}
                        alignContent="center"
                        // justifyContent="center"
                    >
                        <Grid item sm={6} xs={12}>
                            <Typography variant="body1">Current Password</Typography>
                            <TextField
                                fullWidth
                                size="small"
                                placeholder="Current Password"
                                variant="outlined"
                                margin="dense"
                                type="password"
                            />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <Typography variant="body1">New Password</Typography>
                            <TextField
                                fullWidth
                                size="small"
                                placeholder="New Password"
                                variant="outlined"
                                margin="dense"
                                type="password"
                            />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <Typography variant="body1">Confirm Password</Typography>
                            <TextField
                                fullWidth
                                size="small"
                                placeholder="Confirm Password"
                                variant="outlined"
                                margin="dense"
                                type="password"
                            />
                        </Grid>
                        <Grid item sm={12}>
                            <TwoChoice
                                leftText="Cancel"
                                rightText="Update"
                                size="medium"
                                justifyContent="flex-start"
                            />
                        </Grid>
                    </Grid>
                }
            />
        </Stack>
    );
};

export default AccountSetting;
