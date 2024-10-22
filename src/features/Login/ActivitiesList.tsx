import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Button } from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../../store.js";
import { formatDate } from "../../utils/dateUtil.js";

// import components
import LogoHeader from "../../components/displays/LogoHeader";
import LoadingDisplay from "../../components/displays/LoadingDisplay";
import ErrorDisplay from "../../components/displays/ErrorDisplay";
import ActivitiesCard from "../../components/cards/ActivitiesCard.js";

// file endpoint
const { VITE_FILE_ENDPOINT } = import.meta.env;

const ActivitiesList = () => {
    const navigate = useNavigate();

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    return (
        <Stack gap={2}>
            <LogoHeader header="SK ACTIVITIES" />
            <Stack sx={{ alignItems: "flex-end" }}>
                <Button
                    onClick={() => handleNavigation("/dashboard")}
                    sx={{ paddingInline: "20px" }}
                    startIcon={<ArrowBackIos />}
                >
                    BACK TO DASHBOARD
                </Button>
            </Stack>

            <Stack gap={5}>
                <ActivitiesCard
                    barangay="SK Gaston"
                    barangayLogo=""
                    date="May 24, 204"
                    cardImage=""
                    title="SPORTSFEST 2024"
                    location="Brgy. Gaston, Lagonglong Mis. Or"
                />
            </Stack>

            {/* {allPublicationsError && <ErrorDisplay />}
      <LoadingDisplay open={allPublicationsLoading} /> */}
        </Stack>
    );
};

export default ActivitiesList;
