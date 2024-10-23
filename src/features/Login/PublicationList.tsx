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
import FeedbackForm from "../../components/pages/UserFeatures/Home/FeedbackForm";
import CommentsList from "../../components/pages/UserFeatures/Home/CommentsList";
import PublicationCard from "../../components/cards/PublicationCard";

// api
import { useGetPublicationsQuery } from "../../components/pages/Publication/api/publicationApi";

// file endpoint
const { VITE_FILE_ENDPOINT } = import.meta.env;
const ITEMS_PER_PAGE = 3; // Define how many items per page

const PublicationList = () => {
  const navigate = useNavigate();

  // logged in user role
  const userDetail = useSelector((state: RootState) => state.auth.user);

  const [activeModal, setActiveModal] = useState<null | {
    name: string;
    data?: any;
  }>(null); // State to handle active modal
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: allPublications = [],
    isError: allPublicationsError,
    isLoading: allPublicationsLoading,
  } = useGetPublicationsQuery();

  // latest first
  const sortedPublications = [...allPublications].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  // Paginate publications
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPublications = sortedPublications.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const openModal = (modalName: string, data?: any) => {
    setActiveModal({ name: modalName, data });
  };

  const closeModal = () => {
    setActiveModal(null); // Close the active modal
  };

  // Handle Feedback click
  const handleFeedbackClick = () => {
    openModal("feedbackForm");
  };

  // Handle Comments click
  const handleCommentsClick = () => {
    openModal("commentForm", { comments: publication.comments });
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(sortedPublications.length / ITEMS_PER_PAGE);

  // Handle MUI Pagination change
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  return (
    <Stack gap={2}>
      <LogoHeader header="SK PUBLICATION" />
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
        {paginatedPublications.map((publication) => (
          <PublicationCard
            key={publication.id}
            barangay=""
            barangayLogo=""
            date={formatDate(publication.created_at)}
            cardImage={VITE_FILE_ENDPOINT + publication.attachment}
            title={publication.title}
            content={publication.content}
            views={24}
            comments={5}
            rating={5}
            // onFeedbackClick={handleFeedbackClick}
            // onCommentsClick={handleCommentsClick}
          ></PublicationCard>
        ))}
      </Stack>
      {allPublicationsError && <ErrorDisplay />}
      <LoadingDisplay open={allPublicationsLoading} />

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

export default PublicationList;
