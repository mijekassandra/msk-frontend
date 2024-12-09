import { useState, useEffect } from "react";
import { Stack, Typography, Grid, IconButton, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { ArrowBackIos, ArrowBack } from "@mui/icons-material";

// import components
import DashboardCard from "../../cards/DashboardCard";
import SKFileTable from "./components/SKFileTable";
import MenuCard from "../../cards/MenuCard";

const SKFiles = () => {
    // logged in user details
    const userDetail = useSelector((state: RootState) => state.auth.user);

    // Fetch adminMode and selectedBarangay from the Redux store
    const adminMode = useSelector((state: RootState) => state.admin.adminMode);
    const selectedBarangay = useSelector(
        (state: RootState) => state.admin.selectedBarangay
    );

    const [filteredFiles, setFilteredFiles] = useState("");

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

    const handleFilterSelect = (filter: string) => {
        setFilteredFiles(filter);
    };

    useEffect(() => {
        console.log("Filter selected: ", filteredFiles);
    }, [filteredFiles]);

    return (
        <Stack rowGap={3}>
            {filteredFiles === "" ? (
                <>
                    {getHeaderText() && (
                        <Typography variant="h2">{getHeaderText()}</Typography>
                    )}

                    <DashboardCard
                        padding="30px 20px"
                        content={
                            <Grid
                                container
                                spacing={3}
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Grid item>
                                    <MenuCard
                                        cardImage="/src/assets/resolution-and-ordinance.png"
                                        imgWidth="80px"
                                        content={
                                            <Typography
                                                variant="subtitle1"
                                                textAlign="center"
                                                sx={{ fontSize: "14px" }}
                                            >
                                                Resolution and Ordinance
                                            </Typography>
                                        }
                                        onClick={() =>
                                            handleFilterSelect(
                                                "resolution and ordinance"
                                            )
                                        }
                                    />
                                </Grid>
                                <Grid item>
                                    <MenuCard
                                        cardImage="/src/assets/financial-reports.png"
                                        imgWidth="85px"
                                        content={
                                            <Typography
                                                variant="subtitle1"
                                                textAlign="center"
                                            >
                                                Financial Reports
                                            </Typography>
                                        }
                                        onClick={() =>
                                            handleFilterSelect(
                                                "financial reports"
                                            )
                                        }
                                    />
                                </Grid>
                                <Grid item>
                                    <MenuCard
                                        cardImage="/src/assets/full-disclosure.png"
                                        imgWidth="85px"
                                        content={
                                            <Typography
                                                variant="subtitle1"
                                                textAlign="center"
                                            >
                                                Full Disclosure
                                            </Typography>
                                        }
                                        onClick={() =>
                                            handleFilterSelect(
                                                "full disclosure"
                                            )
                                        }
                                    />
                                </Grid>
                                <Grid item>
                                    <MenuCard
                                        cardImage="/src/assets/learning-materials.png"
                                        imgWidth="85px"
                                        content={
                                            <Typography
                                                variant="subtitle1"
                                                textAlign="center"
                                            >
                                                Learning Materials
                                            </Typography>
                                        }
                                        onClick={() =>
                                            handleFilterSelect(
                                                "learning materials"
                                            )
                                        }
                                    />
                                </Grid>
                            </Grid>
                        }
                    />
                </>
            ) : (
                <>
                    <Stack direction="row" gap={1}>
                        <IconButton
                            aria-label="back"
                            size="small"
                            onClick={() => setFilteredFiles("")}
                        >
                            <ArrowBack />
                        </IconButton>

                        <Typography variant="h2" textTransform="capitalize">
                            {filteredFiles} Files
                        </Typography>
                    </Stack>

                    <DashboardCard
                        padding="0px 0px 0px 0px"
                        content={<SKFileTable filteredFiles={filteredFiles} />}
                    ></DashboardCard>
                </>
            )}
        </Stack>
    );
};

export default SKFiles;
