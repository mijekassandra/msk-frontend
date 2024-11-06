import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { Stack, Button, Pagination } from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";
import { formatDate } from "../../../../utils/dateUtil";
import NoImage from "../../../../assets/no-image.png";

// import components
import LogoHeader from "../../../displays/LogoHeader";
import ActivitiesCard from "../../../cards/ActivitiesCard";
import LoadingDisplay from "../../../displays/LoadingDisplay";
import ErrorDisplay from "../../../displays/ErrorDisplay";
import EmptyDisplay from "../../../displays/EmptyDisplay";
import SearchInput from "../../../displays/SearchInput";

// import api
import { useGetActivtiesQuery } from "../../Activities/api/activityApi";

// file endpoint
const { VITE_FILE_ENDPOINT } = import.meta.env;
const ITEMS_PER_PAGE = 3;

const UserSKActivities = () => {
    const navigate = useNavigate();

    // Get user details from Redux state
    const userDetail = useSelector((state: RootState) => state.auth.user);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");

    const {
        data: allActivities = [],
        isError: allActivitiesError,
        isLoading: allActivitiesLoading,
        isFetching,
        refetch,
    } = useGetActivtiesQuery();

    // Step 1: Filter activities for published status
    const publishedActivities = allActivities.filter(
        (activity) => activity.status === "published"
    );

    // Step 2: Sort the filtered activities by date (latest first)
    const sortedActivities = [...publishedActivities].sort(
        (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    // Filter activities based on search query
    const filteredActivities = sortedActivities.filter((activity) =>
        activity.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Step 3: Paginate the filtered and sorted activities
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedActivities = filteredActivities.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
    );

    // Calculate total number of pages based on the filtered and sorted activities
    const totalPages = Math.ceil(filteredActivities.length / ITEMS_PER_PAGE);

    // Handle pagination change
    const handlePageChange = (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setCurrentPage(value);
    };

    // Search function to update search query and reset pagination
    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setCurrentPage(1); // Reset to first page on new search
    };

    // Navigation handler based on user role
    const handleNavigation = (path: string) => {
        if (userDetail?.role === "User") {
            navigate("/home");
        } else {
            navigate(path);
        }
    };

    // Refetch data on mount
    useEffect(() => {
        refetch();
    }, []);

    return (
        <Stack gap={2}>
            <LogoHeader header="SK ACTIVITIES" />

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
                        placeholder="Search activity title"
                        onSearch={handleSearch}
                    />
                </Stack>
            </Stack>

            {/* Conditional displays for activities */}
            {!allActivitiesLoading &&
                !isFetching &&
                !allActivitiesError &&
                paginatedActivities.length === 0 && (
                    <EmptyDisplay label="No activity content found" />
                )}

            {!allActivitiesLoading &&
                !isFetching &&
                !allActivitiesError &&
                paginatedActivities.length > 0 && (
                    <Stack
                        gap={2}
                        direction="row"
                        flexWrap="wrap"
                        justifyContent="space-evenly"
                    >
                        {paginatedActivities.map((activity) => (
                            <ActivitiesCard
                                key={activity.id}
                                barangay={
                                    activity.type !== "Federation"
                                        ? activity.barangay
                                        : "Federation"
                                }
                                date={formatDate(activity.created_at)}
                                cardImage={
                                    activity.attachment
                                        ? VITE_FILE_ENDPOINT +
                                          activity.attachment
                                        : NoImage
                                }
                                title={activity.title}
                                location="Brgy. Gaston, Lagonglong Mis. Or"
                                date_of_activity={formatDate(
                                    activity.date_of_activity
                                )}
                            />
                        ))}
                    </Stack>
                )}

            {allActivitiesError && <ErrorDisplay />}
            {(allActivitiesLoading || isFetching) && (
                <LoadingDisplay open={true} />
            )}

            {/* Pagination controls */}
            {filteredActivities.length > 0 && (
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

export default UserSKActivities;
