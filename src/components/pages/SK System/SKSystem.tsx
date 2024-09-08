import React from "react";
import { Stack, Typography, Grid } from "@mui/material";

// import components
import DashboardCard from "../../cards/DashboardCard";
import BarangayLogo from "./components/BarangayLogo";

const SKSystem = () => {
    return (
        <Stack rowGap={3}>
            <Typography variant="h2">SK SYSTEM</Typography>
            <DashboardCard padding="30px 20px" content={<BarangayLogo />}></DashboardCard>
        </Stack>
    );
};

export default SKSystem;
