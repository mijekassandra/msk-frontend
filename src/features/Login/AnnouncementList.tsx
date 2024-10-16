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

const AnnouncementList = () => {
  return (
    <Stack gap={2}>
      <LogoHeader header="SK ANNOUNCEMENTS" />

      <Stack gap={5}>
        <Typography>hello</Typography>
      </Stack>

      {/* {allPublicationsError && <ErrorDisplay />}
      <LoadingDisplay open={allPublicationsLoading} /> */}
    </Stack>
  );
};

export default AnnouncementList;
