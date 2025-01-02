import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Pagination } from "@mui/material";
import NoImage from "/src/assets/no-image.png";

// import components
import LogoHeader from "../../../displays/LogoHeader";
import BlogCard from "../../../cards/BlogCard";
import LoadingDisplay from "../../../displays/LoadingDisplay";
import ErrorDisplay from "../../../displays/ErrorDisplay";
import EmptyDisplay from "../../../displays/EmptyDisplay";
import SearchInput from "../../../displays/SearchInput";

// import api
import { useGetPublicationsQuery } from "../../../pages/Publication/api/publicationApi";

// file endpoint
const { VITE_FILE_ENDPOINT } = import.meta.env;
const ITEMS_PER_PAGE = 3;

const UserHome = () => {
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");

    const {
        data: allPublications = [],
        isError: allPublicationsError,
        isLoading: allPublicationsLoading,
        isFetching,
        refetch,
    } = useGetPublicationsQuery();

    const handleReadMore = (publication: any) => {
        navigate(`/user-publications/${publication.id}`, {
            state: { publication },
        });
    };

    // Filter for published publications
    const publishedPublications = allPublications.filter(
        (publication) => publication.status === "published"
    );

    // Sort publications by date (latest first)
    const sortedPublications = [...publishedPublications].sort(
        (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    //! Filter publications based on search query
    const filteredPublications = sortedPublications.filter((publication) =>
        publication.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Calculate pagination based on filtered publications
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedPublications = filteredPublications.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
    );

    // Calculate total pages based on filtered publications
    const totalPages = Math.ceil(filteredPublications.length / ITEMS_PER_PAGE);

    // Handle page change for pagination
    const handlePageChange = (
        _event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setCurrentPage(value);
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
        <Stack gap={3}>
            <LogoHeader header="SK PUBLICATION" />

            {/* Search Input */}
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

            {/* Display for filtered and paginated publications */}
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
                        justifyContent={{
                            md: "center",
                            xs: "center",
                        }}
                    >
                        {paginatedPublications.map((publication) => (
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

            {/* Error and Loading Displays */}
            {allPublicationsError && <ErrorDisplay />}
            {(allPublicationsLoading || isFetching) && (
                <LoadingDisplay open={true} />
            )}

            {/* Pagination controls */}
            {filteredPublications.length > 0 && (
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
