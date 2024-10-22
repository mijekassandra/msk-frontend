import { Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

// import components
import DashboardCard from "../../cards/DashboardCard";
import AdminTable from "./components/AdminTable";

const Admin = () => {
    // logged in user details
    const userDetail = useSelector((state: RootState) => state.auth.user);

    // Fetch adminMode and selectedBarangay from the Redux store
    const adminMode = useSelector((state: RootState) => state.admin.adminMode);
    const selectedBarangay = useSelector((state: RootState) => state.admin.selectedBarangay);

    const getHeaderText = () => {
        const userRole = userDetail?.role;

        if (userRole === "Chairperson") {
            return `USERS INFORMATION`;
        }

        if (
            (userRole === "Super Admin" || userRole === "Federation") &&
            !adminMode &&
            !selectedBarangay
        ) {
            return "ADMIN INFORMATION";
        }

        if (
            (userRole === "Super Admin" || userRole === "Federation") &&
            adminMode &&
            selectedBarangay
        ) {
            return `USERS INFORMATION`;
        }

        return "";
    };

    return (
        <Stack rowGap={3}>
            {getHeaderText() && <Typography variant="h2">{getHeaderText()}</Typography>}
            <DashboardCard padding="0px 0px 0px 0px" content={<AdminTable />}></DashboardCard>
        </Stack>
    );
};

export default Admin;
