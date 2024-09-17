import React from "react";
import { Stack, Typography } from "@mui/material";

// import components
import DashboardCard from "../../cards/DashboardCard";
import PublicationTable from "./components/PublicationTable";

const Publication = () => {
    return (
        <Stack rowGap={3}>
            <Typography variant="h2">FEDERATION PUBLICATION</Typography>
            <DashboardCard padding="0px 0px 0px 0px" content={<PublicationTable />}></DashboardCard>
        </Stack>
    );
};

export default Publication;
