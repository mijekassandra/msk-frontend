import React from "react";
import { Stack, Typography } from "@mui/material";

// import components
import DashboardCard from "../../cards/DashboardCard";
import AdminTable from "./components/AdminTable";

const Admin = () => {
    return (
        <Stack rowGap={3}>
            <Typography variant="h2">ADMIN INFORMATION</Typography>
            <DashboardCard padding="10px 0px 0px 0px" content={<AdminTable />}></DashboardCard>
        </Stack>
    );
};

export default Admin;
