import { Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

// import components
import DashboardCard from "../../cards/DashboardCard";
import PublicationTable from "./components/PublicationTable";

const Publication = () => {
    // logged in user details
    const userDetail = useSelector((state: RootState) => state.auth.user);

    // Fetch adminMode and selectedBarangay from the Redux store
    const adminMode = useSelector((state: RootState) => state.admin.adminMode);
    const selectedBarangay = useSelector((state: RootState) => state.admin.selectedBarangay);

    const getHeaderText = () => {
        const userRole = userDetail?.role;

        if (userRole === "Chairperson") {
            return `SK ${userDetail?.barangay} Publication`;
        }

        if (
            (userRole === "Super Admin" || userRole === "Federation") &&
            !adminMode &&
            !selectedBarangay
        ) {
            return "FEDERATION PUBLICATION";
        }

        if (
            (userRole === "Super Admin" || userRole === "Federation") &&
            adminMode &&
            selectedBarangay
        ) {
            return `SK ${selectedBarangay} Publication`;
        }

        return "";
    };

    return (
        <Stack rowGap={3}>
            {getHeaderText() && <Typography variant="h2">{getHeaderText()}</Typography>}

            <DashboardCard padding="0px 0px 0px 0px" content={<PublicationTable />}></DashboardCard>
        </Stack>
    );
};

export default Publication;
