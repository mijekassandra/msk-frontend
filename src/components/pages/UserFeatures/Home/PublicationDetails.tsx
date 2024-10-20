import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import { formatDate } from "../../../../utils/dateUtil.js";

// import components
import PublicationCard from "../../../cards/PublicationCard";
import FeedbackForm from "./FeedbackForm";
import CommentsList from "./CommentsList";

// file endpoint
const { VITE_FILE_ENDPOINT } = import.meta.env;

const PublicationDetails = () => {
  const { id } = useParams(); // Get the publication ID from the URL
  const location = useLocation();
  const { publication } = location.state || {}; // Get publication data from the navigation state
  const [activeModal, setActiveModal] = useState<null | {
    name: string;
    data?: any;
  }>(null); // State to handle active modal

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
    <>
      <Stack spacing={2} padding={3}>
        {publication ? (
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
            onFeedbackClick={handleFeedbackClick}
            onCommentsClick={handleCommentsClick}
          ></PublicationCard>
        ) : (
          <Typography variant="h6">Loading publication details...</Typography>
        )}
      </Stack>

      {/* Feedback Form Modal */}
      {activeModal?.name === "feedbackForm" && (
        <FeedbackForm onClose={closeModal} />
      )}

      {/* Comments List Modal */}
      {activeModal?.name === "commentForm" && (
        <CommentsList onClose={closeModal} />
      )}
    </>
  );
};

export default PublicationDetails;
