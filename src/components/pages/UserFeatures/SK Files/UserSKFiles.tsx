import React, { useState } from "react";
import { Stack, Button, Divider, Typography, Pagination } from "@mui/material";

// Import components
import LogoHeader from "../../../displays/LogoHeader";
import LoadingDisplay from "../../../displays/LoadingDisplay";
import ErrorDisplay from "../../../displays/ErrorDisplay";
import DisplayThumbnail from "./DisplayThumbnail";
import SearchInput from "../../../displays/SearchInput";

import { useGetSkFilesQuery } from "../../SK Files/api/skFileApi";

const { VITE_FILE_ENDPOINT } = import.meta.env;
const ITEMS_PER_PAGE = 5;

const UserSKFiles = () => {
    const {
        data: allSkFiles,
        isError: allSkFilesError,
        isLoading: allSkFilesLoading,
    } = useGetSkFilesQuery();

    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [fileTypeFilter, setFileTypeFilter] =
        useState<string>("full disclosure");

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    const handleFileTypeFilter = (type: string) => {
        setFileTypeFilter(type);
        setCurrentPage(1);
    };

    // Filter SK files based on search query and selected file type
    const filteredFiles =
        allSkFiles?.skFiles?.filter((file: any) => {
            const matchesSearchQuery = file.file_name
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
            const matchesFileType = fileTypeFilter
                ? file.file_type === fileTypeFilter
                : true; // Only filter by type if a filter is applied
            return matchesSearchQuery && matchesFileType;
        }) || [];

    // Paginate the filtered files
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedFiles = filteredFiles.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
    );

    // Calculate total number of pages based on the filtered files
    const totalPages = Math.ceil(filteredFiles.length / ITEMS_PER_PAGE);

    // Handle MUI Pagination change
    const handlePageChange = (
        _event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setCurrentPage(value);
    };

    return (
        <Stack gap={2}>
            <LogoHeader header="SK FILES" />

            <Stack
                direction="row"
                justifyContent="flex-end"
                marginBlock={1}
                marginLeft={1}
            >
                <SearchInput
                    placeholder="Search SK file"
                    onSearch={handleSearch}
                />
            </Stack>

            <Stack
                rowGap={2}
                sx={{
                    marginInline: 6,
                }}
            >
                {/* Filter buttons */}
                <Stack direction="row" justifyContent="center" gap={5}>
                    <Button
                        variant={
                            fileTypeFilter === "full disclosure"
                                ? "outlined"
                                : "text"
                        }
                        onClick={() => handleFileTypeFilter("full disclosure")}
                    >
                        FULL DISCLOSURE
                    </Button>
                    <Button
                        variant={
                            fileTypeFilter === "learning materials"
                                ? "outlined"
                                : "text"
                        }
                        onClick={() =>
                            handleFileTypeFilter("learning materials")
                        }
                    >
                        LEARNING MATERIALS
                    </Button>
                </Stack>

                <Divider sx={{ borderBottomWidth: 3.5 }} />

                {/* Display SK files */}
                <Stack
                    direction="row"
                    rowGap={4}
                    columnGap={2}
                    flexWrap="wrap"
                    sx={{
                        justifyContent: {
                            xs: "start",
                            sm: "start",
                            lg: "center",
                        },
                    }}
                >
                    {allSkFilesLoading && <LoadingDisplay open={true} />}
                    {allSkFilesError && <ErrorDisplay />}
                    {paginatedFiles.length > 0 ? (
                        paginatedFiles.map((file: any) => (
                            <DisplayThumbnail
                                key={file.id}
                                fileUrl={VITE_FILE_ENDPOINT + file.attachment}
                                file_name={file.file_name
                                    .split(".")
                                    .slice(0, -1)
                                    .join(".")}
                            />
                        ))
                    ) : (
                        <Typography
                            variant="body1"
                            marginTop="10px"
                            textAlign="center"
                            width="100%"
                        >
                            No files found
                        </Typography>
                    )}
                </Stack>

                {/* Pagination controls */}
                {filteredFiles.length > ITEMS_PER_PAGE && (
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
        </Stack>
    );
};

export default UserSKFiles;
