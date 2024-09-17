import React from "react";
import { Stack, Typography } from "@mui/material";

// import components
import DashboardCard from "../../cards/DashboardCard";
import ActivitiesTable from "./components/ActivitiesTable";

const Activities = () => {
    return (
        <Stack rowGap={3}>
            <Typography variant="h2">FEDERATION ACTIVITIES</Typography>
            <DashboardCard padding="0px 0px 0px 0px" content={<ActivitiesTable />} />
        </Stack>
    );
};

export default Activities;
