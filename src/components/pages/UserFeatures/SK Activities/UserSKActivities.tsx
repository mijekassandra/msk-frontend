import React from "react";
import { useNavigate } from "react-router-dom";
import { Stack, TextField } from "@mui/material";

// import components
import LogoHeader from "../../../displays/LogoHeader";
import ActivitiesCard from "../../../cards/ActivitiesCard";
import LoadingDisplay from "../../../displays/LoadingDisplay";
import ErrorDisplay from "../../../displays/ErrorDisplay";

// import api
import { useGetActivtiesQuery } from "../../Activities/api/activityApi";

const UserSKActivities = () => {
  const {
    data: allActivities = [],
    isError: allActivitiesError,
    isLoading: allActivitiesLoading,
  } = useGetActivtiesQuery();

  return (
    <Stack gap={2}>
      <LogoHeader header="SK ACTIVITIES" />

      <Stack direction="row" justifyContent="flex-end" marginBlock={1}>
        <TextField
          id="outlined-basic"
          variant="outlined"
          placeholder="Search"
          sx={{
            width: 400,
            minWidth: {
              sm: 300,
              xs: "100%",
            },
          }}
        />
      </Stack>

      {!allActivitiesLoading && !allActivitiesError && (
        <Stack
          gap={2}
          direction="row"
          flexWrap="wrap"
          justifyContent="space-evenly"
        >
          {allActivities.map((activity) => (
            <ActivitiesCard
              barangay="SK Gaston"
              barangayLogo=""
              date={activity.date}
              cardImage=""
              title={activity.activity_title}
              location="Brgy. Gaston, Lagonglong Mis. Or"
            ></ActivitiesCard>
          ))}
        </Stack>
      )}
    </Stack>
  );
};

export default UserSKActivities;
