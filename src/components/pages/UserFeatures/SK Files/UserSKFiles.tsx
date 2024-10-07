import React from "react";
import { useNavigate } from "react-router-dom";
import { Stack, TextField } from "@mui/material";

// import components
import LogoHeader from "../../../displays/LogoHeader";
import LoadingDisplay from "../../../displays/LoadingDisplay";
import ErrorDisplay from "../../../displays/ErrorDisplay";
import FilePreview from "./FilePreview";

const UserSKFiles = () => {
    return (
        <Stack gap={2}>
            <LogoHeader header="SK FILES" />

            <Stack direction="row" justifyContent="flex-end" marginBlock={1}>
                <TextField
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="Search"
                    sx={{
                        width: 400,
                        minWidth: {
                            sm: 300,
                            xs: "100%",
                        },
                    }}
                />
            </Stack>
            <Stack> </Stack>
        </Stack>
    );
};

export default UserSKFiles;
