import { Stack, Typography } from "@mui/material";

// import components
import DashboardCard from "../../../cards/DashboardCard";
import UserTable from "./components/UserTable";

const User = () => {
    return (
        <Stack rowGap={3}>
            <Typography variant="h2">USERS INFORMATION</Typography>
            <DashboardCard padding="0px 0px 0px 0px" content={<UserTable />}></DashboardCard>
        </Stack>
    );
};

export default User;
