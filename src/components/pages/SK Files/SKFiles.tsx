import React from "react";
import { Stack, Typography } from "@mui/material";

// import components
import DashboardCard from "../../cards/DashboardCard";
import SKFileTable from "./components/SKFileTable";

const SKFiles = () => {
    return (
        <Stack rowGap={3}>
            <Typography variant="h2">FEDERATION FILES</Typography>
            <DashboardCard padding="10px 0px 0px 0px" content={<SKFileTable />}></DashboardCard>
        </Stack>
    );
};

export default SKFiles;
