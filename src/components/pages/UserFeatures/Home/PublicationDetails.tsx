import React, { useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Stack, Typography, Button } from "@mui/material";
import { formatDate } from "../../../../utils/dateUtil.ts";
import NoImage from "../../../../assets/no-image.png";

// import components
import PublicationCard from "../../../cards/PublicationCard";
import FeedbackForm from "./FeedbackForm";
import CommentsList from "./CommentsList";
import { ArrowBackIos } from "@mui/icons-material";

// file endpoint
const { VITE_FILE_ENDPOINT } = import.meta.env;

const PublicationDetails = () => {
    const navigate = useNavigate();
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

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    return (
        <Stack gap={2}>
            <Stack sx={{ alignItems: "flex-end" }}>
                <Button
                    onClick={() => handleNavigation("/home")}
                    sx={{ paddingInline: "20px" }}
                    startIcon={<ArrowBackIos />}
                >
                    BACK TO DASHBOARD
                </Button>
            </Stack>

            <Stack>
                {publication ? (
                    <PublicationCard
                        barangay={
                            publication.type !== "Federation"
                                ? publication.barangay
                                : "Federation"
                        }
                        date={formatDate(publication.created_at)}
                        cardImage={
                            publication.attachment
                                ? VITE_FILE_ENDPOINT + publication.attachment
                                : NoImage
                        }
                        title={publication.title}
                        content={publication.content}
                        type={publication.type}
                        views={24}
                        comments={5}
                        rating={5}
                        onFeedbackClick={handleFeedbackClick}
                        onCommentsClick={handleCommentsClick}
                        publicationID={publication.id}
                    ></PublicationCard>
                ) : (
                    <Typography variant="h6">
                        Loading publication details...
                    </Typography>
                )}
            </Stack>

            {/* Feedback Form Modal */}
            {activeModal?.name === "feedbackForm" && (
                <FeedbackForm
                    onClose={closeModal}
                    publicationID={publication.id}
                />
            )}

            {/* Comments List Modal */}
            {activeModal?.name === "commentForm" && (
                <CommentsList
                    onClose={closeModal}
                    publicationID={publication.id}
                />
            )}
        </Stack>
    );
};

export default PublicationDetails;
