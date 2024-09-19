import React from "react";
import { Stack, Typography } from "@mui/material";

// import components
import DashboardCard from "../../../cards/DashboardCard";
import ProfilingTable from "./ProfilingTable";

const Profiling = () => {
    return (
        <Stack rowGap={3}>
            <Typography variant="h2">PROFILING</Typography>
            <DashboardCard padding="0px 0px 0px 0px" content={<ProfilingTable />} />
        </Stack>
    );
};

export default Profiling;
