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
import AnnouncementCard from "../../components/cards/AnnouncementCard.js";
import SearchInput from "../../components/displays/SearchInput.tsx";

// api
import { useGetAnnouncementsQuery } from "../../components/pages/Announcement/api/announcementApi.js";
import EmptyDisplay from "../../components/displays/EmptyDisplay.js";

// file endpoint
const { VITE_FILE_ENDPOINT } = import.meta.env;
const ITEMS_PER_PAGE = 3; // Define how many items per page

const AnnouncementList = () => {
    const navigate = useNavigate();

    // logged in user role
    const userDetail = useSelector((state: RootState) => state.auth.user);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");

    const {
        data: allAnnouncements = [],
        isError: allAnnouncementsError,
        isLoading: allAnnouncementsLoading,
        isFetching,
        refetch,
    } = useGetAnnouncementsQuery();

    // Step 1: Filter announcements for published status
    const publishedAnnouncements = allAnnouncements.filter(
        (announcement) => announcement.status === "published"
    );

    // Step 2: Sort the filtered announcements by date (latest first)
    const sortedAnnouncements = [...publishedAnnouncements].sort(
        (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    //! Filter announcements based on search query
    const filteredAnnouncements = sortedAnnouncements.filter((announcement) =>
        announcement.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Step 3: Paginate the filtered and sorted announcements
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedAnnouncements = filteredAnnouncements.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
    );

    // Calculate total number of pages based on the filtered and sorted announcements
    const totalPages = Math.ceil(filteredAnnouncements.length / ITEMS_PER_PAGE);

    // Handle MUI Pagination change
    const handlePageChange = (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setCurrentPage(value);
    };

    //! Search function to update search query and reset pagination
    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    const handleNavigation = (path: string) => {
        if (userDetail?.role === "User") {
            navigate("/dashboard");
        } else {
            navigate(path);
        }
    };

    useEffect(() => {
        refetch();
    }, []);

    return (
        <Stack gap={2}>
            <LogoHeader header="SK ANNOUNCEMENTS" />
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
                        placeholder="Search announcement title"
                        onSearch={handleSearch}
                    />
                </Stack>
            </Stack>

            {/* Show EmptyDisplay if there are no published announcements */}
            {!allAnnouncementsLoading &&
                !isFetching &&
                !allAnnouncementsError &&
                paginatedAnnouncements.length === 0 && (
                    <EmptyDisplay label="No announcement content found" />
                )}

            {/* Show paginated announcements if available */}
            {!allAnnouncementsLoading &&
                !isFetching &&
                !allAnnouncementsError &&
                paginatedAnnouncements.length > 0 && (
                    <Stack gap={5}>
                        {paginatedAnnouncements.map((announcement) => (
                            <AnnouncementCard
                                key={announcement.id}
                                barangay={
                                    announcement.type !== "Federation"
                                        ? announcement.barangay
                                        : "Federation"
                                }
                                date={formatDate(announcement.created_at)}
                                cardImage={
                                    announcement.attachment
                                        ? VITE_FILE_ENDPOINT +
                                          announcement.attachment
                                        : NoImage
                                }
                                title={announcement.title}
                                content={announcement.content}
                                type={announcement.type}
                            />
                        ))}
                    </Stack>
                )}

            {allAnnouncementsError && <ErrorDisplay />}
            {(allAnnouncementsLoading || isFetching) && (
                <LoadingDisplay open={true} />
            )}

            {/* Pagination controls */}
            {sortedAnnouncements.length > 0 && (
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

export default AnnouncementList;
