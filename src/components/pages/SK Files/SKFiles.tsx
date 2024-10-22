import { Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

// import components
import DashboardCard from "../../cards/DashboardCard";
import SKFileTable from "./components/SKFileTable";

const SKFiles = () => {
    // logged in user details
    const userDetail = useSelector((state: RootState) => state.auth.user);

    // Fetch adminMode and selectedBarangay from the Redux store
    const adminMode = useSelector((state: RootState) => state.admin.adminMode);
    const selectedBarangay = useSelector((state: RootState) => state.admin.selectedBarangay);

    const getHeaderText = () => {
        const userRole = userDetail?.role;

        if (userRole === "Chairperson") {
            return `SK ${userDetail?.barangay} Files`;
        }

        if (
            (userRole === "Super Admin" || userRole === "Federation") &&
            !adminMode &&
            !selectedBarangay
        ) {
            return "FEDERATION FILES";
        }

        if (
            (userRole === "Super Admin" || userRole === "Federation") &&
            adminMode &&
            selectedBarangay
        ) {
            return `SK ${selectedBarangay} Files`;
        }

        return "";
    };

    return (
        <Stack rowGap={3}>
            {getHeaderText() && <Typography variant="h2">{getHeaderText()}</Typography>}
            <DashboardCard padding="0px 0px 0px 0px" content={<SKFileTable />}></DashboardCard>
        </Stack>
    );
};

export default SKFiles;
