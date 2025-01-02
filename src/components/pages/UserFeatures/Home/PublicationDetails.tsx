import { useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Stack, Typography, CircularProgress, IconButton } from "@mui/material";
import { formatDate } from "../../../../utils/dateUtil.ts";
import NoImage from "/src/assets/no-image.png";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store.ts";
import Void from "/src/assets/void.png";

// import components
import PublicationCard from "../../../cards/PublicationCard";
import FeedbackForm from "./FeedbackForm";
import CommentsList from "./CommentsList";
import { ArrowBack } from "@mui/icons-material";

// file endpoint
const { VITE_FILE_ENDPOINT } = import.meta.env;

// import api
import { useGetPublicationByIDQuery } from "../../Publication/api/publicationApi.tsx";

const PublicationDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();
    const { publication: statePublication } = location.state || {};
    const [activeModal, setActiveModal] = useState<null | {
        name: string;
        data?: any;
    }>(null); // State to handle active modal

    const userDetail = useSelector((state: RootState) => state.auth.user);

    //! Fetch publication data dynamically if not provided via location.state
    const { data: fetchedPublication, isLoading } = useGetPublicationByIDQuery(
        id,
        {
            skip: !!statePublication, // Skip fetching if statePublication exists
        }
    );

    const publication = statePublication || fetchedPublication;

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
            <Stack direction="row" gap={1}>
                <IconButton
                    aria-label="back"
                    size="small"
                    onClick={() =>
                        userDetail.role === "User"
                            ? handleNavigation("/user-publications")
                            : handleNavigation("/dashboard")
                    }
                >
                    <ArrowBack />
                </IconButton>

                <Typography variant="h2" textTransform="capitalize">
                    Publication
                </Typography>
            </Stack>

            <Stack>
                {/* Show Loading Spinner */}
                {isLoading ? (
                    <Stack
                        justifyContent="center"
                        alignItems="center"
                        height="300px"
                        gap={2}
                    >
                        <CircularProgress />
                        <Typography variant="subtitle1">
                            Loading Activity Details...
                        </Typography>
                    </Stack>
                ) : publication && publication.status === "published" ? (
                    // Render Publication Card
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
                    <Stack
                        justifyContent="center"
                        alignItems="center"
                        height="300px"
                        gap={1}
                    >
                        <img src={Void} width="150px" alt="void" />
                        <Typography
                            variant="h4"
                            fontWeight={500}
                            align="center"
                        >
                            Publication not Found
                        </Typography>
                        <Typography variant="subtitle1" align="center">
                            This Publication post is no longer available. It may
                            have been removed or archived.
                        </Typography>
                    </Stack>
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
