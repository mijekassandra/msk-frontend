import React from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Typography } from "@mui/material";

import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import { formatDate } from "../../utils/dateUtil.js";

// import components
import LogoHeader from "../../components/displays/LogoHeader";
import LoadingDisplay from "../../components/displays/LoadingDisplay";
import ErrorDisplay from "../../components/displays/ErrorDisplay";
import ActivitiesCard from "../../components/cards/ActivitiesCard.js";

const ActivitiesList = () => {
  return (
    <Stack gap={2}>
      <LogoHeader header="SK ACTIVITIES" />

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
