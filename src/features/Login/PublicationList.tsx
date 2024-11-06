import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Button, Pagination } from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../../store.js";
import { formatDate } from "../../utils/dateUtil.ts";
import NoImage from "../../assets/no-image.png";

// import components
import LogoHeader from "../../components/displays/LogoHeader";
import LoadingDisplay from "../../components/displays/LoadingDisplay";
import ErrorDisplay from "../../components/displays/ErrorDisplay";
import FeedbackForm from "../../components/pages/UserFeatures/Home/FeedbackForm";
import CommentsList from "../../components/pages/UserFeatures/Home/CommentsList";
import PublicationCard from "../../components/cards/PublicationCard";
import EmptyDisplay from "../../components/displays/EmptyDisplay.js";
import SearchInput from "../../components/displays/SearchInput.tsx";

// api
import { useGetPublicationsQuery } from "../../components/pages/Publication/api/publicationApi";

// file endpoint
const { VITE_FILE_ENDPOINT } = import.meta.env;
const ITEMS_PER_PAGE = 3; // Define how many items per page

const PublicationList = () => {
    const navigate = useNavigate();

    // State to handle active modal
    const [activeModal, setActiveModal] = useState<null | {
        name: string;
        data?: any;
    }>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");

    const {
        data: allPublications = [],
        isError: allPublicationsError,
        isLoading: allPublicationsLoading,
        isFetching,
        refetch,
    } = useGetPublicationsQuery();

    // Step 1: Filter publications for published status
    const publishedPublications = allPublications.filter(
        (publication) => publication.status === "published"
    );

    // Step 2: Sort the filtered publications by date (latest first)
    const sortedPublications = [...publishedPublications].sort(
        (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    //! Filter publications based on search query
    const filteredPublications = sortedPublications.filter((publication) =>
        publication.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Step 3: Paginate the filtered and sorted publications
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedPublications = filteredPublications.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
    );

    // Calculate total number of pages based on the filtered and sorted publications
    const totalPages = Math.ceil(filteredPublications.length / ITEMS_PER_PAGE);

    const openModal = (modalName: string, data?: any) => {
        setActiveModal({ name: modalName, data });
    };

    const closeModal = () => {
        setActiveModal(null); // Close the active modal
    };

    // Handle MUI Pagination change
    const handlePageChange = (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setCurrentPage(value);
    };

    const handleFeedbackClick = (publicationID: number) => {
        openModal("feedbackForm", { publicationID });
    };

    const handleCommentsClick = (publicationID: number) => {
        openModal("commentForm", { publicationID });
    };

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    //! Search function to update search query and reset pagination
    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setCurrentPage(1); // Reset to first page on new search
    };

    useEffect(() => {
        refetch();
    }, []);

    return (
        <Stack gap={2}>
            <LogoHeader header="SK PUBLICATION" />
            <Stack
                direction="row"
                sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
                <Button
                    onClick={() => handleNavigation("/dashboard")}
                    sx={{ paddingInline: "20px" }}
                    startIcon={<ArrowBackIos />}
                >
                    BACK TO DASHBOARD
                </Button>
                <Stack
                    direction="row"
                    justifyContent="flex-end"
                    marginBlock={1}
                    marginLeft={1}
                >
                    <SearchInput
                        placeholder="Search publication title"
                        onSearch={handleSearch}
                    />
                </Stack>
            </Stack>

            {/* Show EmptyDisplay if there are no publications */}
            {!allPublicationsLoading &&
                !isFetching &&
                !allPublicationsError &&
                paginatedPublications.length === 0 && (
                    <EmptyDisplay label="No published content found" />
                )}

            {/* Show paginated publications if available */}
            {!allPublicationsLoading &&
                !isFetching &&
                !allPublicationsError &&
                paginatedPublications.length > 0 && (
                    <Stack gap={5}>
                        {paginatedPublications.map((publication) => (
                            <PublicationCard
                                key={publication.id}
                                barangay={
                                    publication.type !== "Federation"
                                        ? publication.barangay
                                        : "Federation"
                                }
                                date={formatDate(publication.created_at)}
                                cardImage={
                                    publication.attachment
                                        ? VITE_FILE_ENDPOINT +
                                          publication.attachment
                                        : NoImage
                                }
                                title={publication.title}
                                content={publication.content}
                                type={publication.type}
                                views={24}
                                comments={5}
                                rating={publication.totalRating}
                                publicationID={publication.id}
                                onFeedbackClick={() =>
                                    handleFeedbackClick(publication.id)
                                }
                                onCommentsClick={() =>
                                    handleCommentsClick(publication.id)
                                }
                            />
                        ))}
                    </Stack>
                )}

            {/* Feedback Form Modal */}
            {activeModal?.name === "feedbackForm" && (
                <FeedbackForm
                    onClose={closeModal}
                    publicationID={activeModal.data.publicationID}
                />
            )}

            {/* Comments List Modal */}
            {activeModal?.name === "commentForm" && (
                <CommentsList
                    onClose={closeModal}
                    publicationID={activeModal.data.publicationID}
                />
            )}

            {allPublicationsError && <ErrorDisplay />}
            {(allPublicationsLoading || isFetching) && (
                <LoadingDisplay open={true} />
            )}

            {/* Pagination controls */}
            {sortedPublications.length > 0 && (
                <Stack
                    direction="row"
                    justifyContent="center"
                    sx={{ marginTop: "20px" }}
                >
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
            )}
        </Stack>
    );
};

export default PublicationList;
