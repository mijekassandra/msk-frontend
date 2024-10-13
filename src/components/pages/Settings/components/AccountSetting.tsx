import React, { useState } from "react";
import { Stack, Typography, Grid, TextField } from "@mui/material";
import Swal from "sweetalert2"; // Assuming you have Swal imported

// import components
import DashboardCard from "../../../cards/DashboardCard";
import TwoChoice from "../../../buttons/TwoChoice";
import LoadingDisplay from "../../../displays/LoadingDisplay";

import { useChangePasswordMutation } from "./api/userProfileApi";

const AccountSetting = () => {
  // State for passwords
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // State for errors
  const [fieldError, setFieldError] = useState(false);

  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const [errorDisplay, setErrorDisplay] = useState("");

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      // If any field is empty, set fieldError to true
      setFieldError(true);
      return;
    }

    try {
      await changePassword({
        oldPassword,
        newPassword,
        confirmPassword,
      }).unwrap();

      Swal.fire({
        title: "Success!",
        text: "Password successfully updated.",
        icon: "success",
        confirmButtonText: "OK",
      });

      // Reset fields and error state
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setErrorDisplay("");
      setFieldError(false);
    } catch (error) {
      const typedError = error as {
        data: { status: string; message: string; error?: any };
      };
      console.error("Error changing password:", typedError.data.message);
      setErrorDisplay(typedError.data.message);
    }
  };

  return (
    <Stack rowGap={3}>
      <Typography variant="h2">Account Setting</Typography>
      <DashboardCard
        content={
          <Grid
            container
            gap={2}
            sx={{ padding: "20px" }}
            alignContent="center"
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
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                error={fieldError && !oldPassword} // Set error if field is empty
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
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                error={fieldError && !newPassword} // Set error if field is empty
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
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={fieldError && !confirmPassword} // Set error if field is empty
              />
              {errorDisplay && (
                <Typography
                  variant="caption"
                  textAlign="right"
                  color="error.main"
                >
                  {errorDisplay}
                </Typography>
              )}
            </Grid>
            <Grid item sm={12}>
              <TwoChoice
                rightText="Update"
                size="medium"
                justifyContent="flex-start"
                rightOnClick={handleChangePassword}
              />
            </Grid>
          </Grid>
        }
      />
      <LoadingDisplay open={isLoading} />
    </Stack>
  );
};

export default AccountSetting;
