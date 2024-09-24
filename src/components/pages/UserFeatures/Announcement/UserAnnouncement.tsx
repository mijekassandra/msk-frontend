import React from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Typography } from "@mui/material";

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
    isSuccess: allAnnouncementsSuccess,
    isLoading: allAnnouncementsLoading,
    isFetching: allAnouncementsFetching,
  } = useGetAnnouncementsQuery();

  return (
    <Stack gap={2}>
      <LogoHeader header="ANNOUNCEMENT" />

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
