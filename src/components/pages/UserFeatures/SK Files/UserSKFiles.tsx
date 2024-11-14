import React, { useState } from "react";
import { Stack, Button, Divider, Typography, Pagination } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

// Import components
import LogoHeader from "../../../displays/LogoHeader";
import LoadingDisplay from "../../../displays/LoadingDisplay";
import ErrorDisplay from "../../../displays/ErrorDisplay";
import DisplayThumbnail from "./DisplayThumbnail";
import SearchInput from "../../../displays/SearchInput";

import { useGetSkFilesQuery } from "../../SK Files/api/skFileApi";

const { VITE_FILE_ENDPOINT } = import.meta.env;
const ITEMS_PER_PAGE = 5; // Define the number of items per page

const UserSKFiles = () => {
    const [tabMode, setTabMode] = useState<
        "administrative" | "financial" | "project"
    >("administrative");

    const {
        data: allSkFiles,
        isError: allSkFilesError,
        isLoading: allSkFilesLoading,
    } = useGetSkFilesQuery();

    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");

    const handleTabChange = (
        mode: "administrative" | "financial" | "project"
    ) => {
        setTabMode(mode);
        setCurrentPage(1); // Reset to the first page when changing tabs
    };

    //! Filter SK files based on search query only
    const filteredFiles =
        allSkFiles?.skFiles?.filter(
            (file) =>
                file.file_name.toLowerCase().includes(searchQuery.toLowerCase()) // Filter by search query only
        ) || [];

    //! Paginate the filtered files
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedFiles = filteredFiles.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
    );

    // Calculate total number of pages based on the filtered files
    const totalPages = Math.ceil(filteredFiles.length / ITEMS_PER_PAGE);

    //! Search function to update search query and reset pagination
    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setCurrentPage(1); // Reset to the first page on a new search
    };

    // Handle MUI Pagination change
    const handlePageChange = (
        event: React.ChangeEvent<unknown>,
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
                    placeholder="Search SK file "
                    onSearch={handleSearch}
                />
            </Stack>

            <Stack
                rowGap={2}
                sx={{
                    marginInline: 7,
                }}
            >
                {/* Tab buttons (no filtering applied) */}
                <Stack direction="row" justifyContent="space-between" gap={5}>
                    <Button
                        variant={
                            tabMode === "administrative" ? "outlined" : "text"
                        }
                        onClick={() => handleTabChange("administrative")}
                    >
                        ADMINISTRATIVE FILES
                    </Button>
                    <Button
                        variant={tabMode === "financial" ? "outlined" : "text"}
                        onClick={() => handleTabChange("financial")}
                    >
                        FINANCIAL FILES
                    </Button>
                    <Button
                        variant={tabMode === "project" ? "outlined" : "text"}
                        onClick={() => handleTabChange("project")}
                    >
                        PROJECT FILES
                    </Button>
                </Stack>

                <Divider sx={{ borderBottomWidth: 3.5 }} />

                {/* Display SK files */}
                <Stack
                    direction="row"
                    gap={1}
                    flexWrap="wrap"
                    justifyContent="space-around"
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
                        <Typography variant="body1" marginTop="10px">
                            No files found.
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
