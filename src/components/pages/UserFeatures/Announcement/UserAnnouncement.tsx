import React from "react";
import { useNavigate } from "react-router-dom";
import { Stack, TextField } from "@mui/material";

// import components
import LogoHeader from "../../../displays/LogoHeader";
import AnnouncementCard from "../../../cards/AnnouncementCard";
import LoadingDisplay from "../../../displays/LoadingDisplay";
import ErrorDisplay from "../../../displays/ErrorDisplay";

// import api
import { useGetAnnouncementsQuery } from "../../Announcement/api/announcementApi";

const UserAnnouncement = () => {
  const {
    data: allAnnouncements = [],
    isError: allAnnouncementsError,
    isLoading: allAnnouncementsLoading,
  } = useGetAnnouncementsQuery();

  return (
    <Stack gap={2}>
      <LogoHeader header="ANNOUNCEMENT" />

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

      {!allAnnouncementsLoading && !allAnnouncementsError && (
        <Stack gap={4} direction="column" justifyContent="center">
          {allAnnouncements
            .filter(
              (announcement) => announcement.announcement_status === "Published"
            ) // Filter published announcements
            .map((announcement) => (
              <AnnouncementCard
                key={announcement.id}
                barangay="SK Gaston"
                barangayLogo=""
                date={announcement.date}
                cardImage=""
                title={announcement.announcement_title}
                content={announcement.announcement_content}
              />
            ))}
        </Stack>
      )}

      {allAnnouncementsError && <ErrorDisplay />}

      <LoadingDisplay open={allAnnouncementsLoading} />
    </Stack>
  );
};

export default UserAnnouncement;
