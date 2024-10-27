import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { Stack, TextField, Pagination, Button } from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";
import { formatDate } from "../../../../utils/dateUtil";
import NoImage from "../../../../assets/no-image.png";

// import components
import LogoHeader from "../../../displays/LogoHeader";
import ActivitiesCard from "../../../cards/ActivitiesCard";
import LoadingDisplay from "../../../displays/LoadingDisplay";
import ErrorDisplay from "../../../displays/ErrorDisplay";
import EmptyDisplay from "../../../displays/EmptyDisplay";

// import api
import { useGetActivtiesQuery } from "../../Activities/api/activityApi";

// file endpoint
const { VITE_FILE_ENDPOINT } = import.meta.env;
const ITEMS_PER_PAGE = 3; // Define how many items per page

const UserSKActivities = () => {
    const navigate = useNavigate();

    // logged in user role
    const userDetail = useSelector((state: RootState) => state.auth.user);

    const [currentPage, setCurrentPage] = useState(1);

    const {
        data: allActivities = [],
        isError: allActivitiesError,
        isLoading: allActivitiesLoading,
        isFetching,
        refetch,
    } = useGetActivtiesQuery();

    // Step 1: Filter actitivities for published status
    const publishedActivities = allActivities.filter(
        (activity) => activity.status === "published"
    );

    // Step 2: Sort the filtered actitivities by date (latest first)
    const sortedActivities = [...publishedActivities].sort(
        (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    // Step 3: Paginate the filtered and sorted actitivities
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedActivities = sortedActivities.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
    );

    // Calculate total number of pages based on the filtered and sorted publications
    const totalPages = Math.ceil(sortedActivities.length / ITEMS_PER_PAGE);

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

    useEffect(() => {
        refetch();
    }, []);

    return (
        <Stack gap={2}>
            <LogoHeader header="SK ACTIVITIES" />
            <Stack sx={{ alignItems: "flex-end" }}>
                <Button
                    onClick={() => handleNavigation("/home")}
                    sx={{ paddingInline: "20px" }}
                    startIcon={<ArrowBackIos />}
                >
                    BACK TO DASHBOARD
                </Button>
            </Stack>

            <Stack direction="row" justifyContent="flex-end" marginBlock={1}>
                <TextField
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="Search"
                    sx={{
                        width: 400,
                        minWidth: {
                            sm: 300,
                            xs: "100%",
                        },
                    }}
                />
            </Stack>

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
                        {allActivities.map((activity) => (
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
                            ></ActivitiesCard>
                        ))}
                    </Stack>
                )}

            {allActivitiesError && <ErrorDisplay />}
            {(allActivitiesLoading || isFetching) && (
                <LoadingDisplay open={true} />
            )}

            {/* Pagination controls */}
            {sortedActivities.length > 0 && (
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
