import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
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

const PublicationList = () => {
  // logged in user role
  const userDetail = useSelector((state: RootState) => state.auth.user);

  const [activeModal, setActiveModal] = useState<null | {
    name: string;
    data?: any;
  }>(null); // State to handle active modal

  const {
    data: allPublications = [],
    isError: allPublicationsError,
    isSuccess: allPublicationsSuccess,
    isLoading: allPublicationsLoading,
  } = useGetPublicationsQuery();

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

  return (
    <Stack gap={2}>
      <LogoHeader header="SK PUBLICATION" />

      <Stack gap={5}>
        {allPublications.map((publication) => (
          <PublicationCard
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
    </Stack>
  );
};

export default PublicationList;
