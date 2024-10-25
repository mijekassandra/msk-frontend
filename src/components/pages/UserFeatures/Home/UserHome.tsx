import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, TextField, Pagination } from "@mui/material";

import NoImage from "../../../../assets/no-image.png";

// import components
import LogoHeader from "../../../displays/LogoHeader";
import BlogCard from "../../../cards/BlogCard";
import LoadingDisplay from "../../../displays/LoadingDisplay";
import ErrorDisplay from "../../../displays/ErrorDisplay";
import EmptyDisplay from "../../../displays/EmptyDisplay";

// import api
import { useGetPublicationsQuery } from "../../../pages/Publication/api/publicationApi";

// file endpoint
const { VITE_FILE_ENDPOINT } = import.meta.env;
const ITEMS_PER_PAGE = 3; // Define how many items per page

const UserHome = () => {
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);

    const {
        data: allPublications = [],
        isError: allPublicationsError,
        isLoading: allPublicationsLoading,
        isFetching,
        refetch,
    } = useGetPublicationsQuery();

    const handleReadMore = (publication: any) => {
        navigate(`/home/${publication.id}`, {
            state: { publication },
        });
    };

    // Step 1: Filter publications for published status
    const publishedPublications = allPublications.filter(
        (publication) => publication.status === "published"
    );

    // Step 2: Sort the filtered publications by date (latest first)
    const sortedPublications = [...publishedPublications].sort(
        (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    // Step 3: Paginate the filtered and sorted publications
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedPublications = sortedPublications.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
    );

    // Calculate total number of pages based on the filtered and sorted publications
    const totalPages = Math.ceil(sortedPublications.length / ITEMS_PER_PAGE);

    // Handle MUI Pagination change
    const handlePageChange = (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setCurrentPage(value);
    };

    useEffect(() => {
        refetch();
    }, []);

    return (
        <Stack gap={3}>
            <LogoHeader header="SK PUBLICATION" />

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

            {!allPublicationsLoading &&
                !isFetching &&
                !allPublicationsError &&
                paginatedPublications.length === 0 && (
                    <EmptyDisplay label="No published content found" />
                )}

            {!allPublicationsLoading &&
                !isFetching &&
                !allPublicationsError &&
                paginatedPublications.length > 0 && (
                    <Stack
                        columnGap={6}
                        rowGap={4}
                        direction="row"
                        flexWrap="wrap"
                        justifyContent="start"
                    >
                        {allPublications.map((publication) => (
                            <BlogCard
                                key={publication.id}
                                bgColor="#e6e8fe"
                                cardImage={
                                    publication.attachment
                                        ? VITE_FILE_ENDPOINT +
                                          publication.attachment
                                        : NoImage
                                }
                                cardBarangay={publication.barangay}
                                cardTitle={publication.title}
                                cardContent={publication.content}
                                cardDate={publication.created_at}
                                onClick={() => handleReadMore(publication)}
                            />
                        ))}
                    </Stack>
                )}

            {allPublicationsError && <ErrorDisplay />}

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

export default UserHome;
