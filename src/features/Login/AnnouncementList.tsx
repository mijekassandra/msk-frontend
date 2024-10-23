import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Button, Pagination } from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../../store.js";
import { formatDate } from "../../utils/dateUtil.js";

// import components
import LogoHeader from "../../components/displays/LogoHeader";
import LoadingDisplay from "../../components/displays/LoadingDisplay";
import ErrorDisplay from "../../components/displays/ErrorDisplay";
import AnnouncementCard from "../../components/cards/AnnouncementCard.js";

// api
import { useGetAnnouncementsQuery } from "../../components/pages/Announcement/api/announcementApi.js";

// file endpoint
const { VITE_FILE_ENDPOINT } = import.meta.env;
const ITEMS_PER_PAGE = 3; // Define how many items per page

const AnnouncementList = () => {
  const navigate = useNavigate();

  // logged in user role
  const userDetail = useSelector((state: RootState) => state.auth.user);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: allAnnouncements = [],
    isError: allAnnouncementsError,
    isLoading: allAnnouncementsLoading,
  } = useGetAnnouncementsQuery();

  // latest first
  const sortedAnnouncements = [...allAnnouncements].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  // Paginate publications
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedAnnouncements = sortedAnnouncements.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Calculate total number of pages
  const totalPages = Math.ceil(sortedAnnouncements.length / ITEMS_PER_PAGE);

  // Handle MUI Pagination change
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Stack gap={2}>
      <LogoHeader header="SK ANNOUNCEMENTS" />
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
        {paginatedAnnouncements.map((announcement) => (
          <AnnouncementCard
            key={announcement.id}
            barangay={announcement.barangay}
            barangayLogo=""
            date={formatDate(announcement.created_at)}
            cardImage={VITE_FILE_ENDPOINT + announcement.attachment}
            title={announcement.title}
            content={announcement.content}
          />
        ))}
      </Stack>

      {allAnnouncementsError && <ErrorDisplay />}
      <LoadingDisplay open={allAnnouncementsLoading} />

      {/* Pagination */}
      <Stack direction="row" justifyContent="center" sx={{ marginTop: "20px" }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          size="large"
          variant="outlined"
          shape="rounded"
        />
      </Stack>
    </Stack>
  );
};

export default AnnouncementList;
