import React from "react";
import { Stack, Typography } from "@mui/material";

// import components
import DashboardCard from "../../cards/DashboardCard";
import AnnouncementTable from "./components/AnnouncementTable";

const Announcement = () => {
    return (
        <Stack rowGap={3}>
            <Typography variant="h2">FEDERATION PUBLICATION</Typography>
            <DashboardCard
                padding="10px 0px 0px 0px"
                content={<AnnouncementTable />}
            ></DashboardCard>
        </Stack>
    );
};

export default Announcement;
