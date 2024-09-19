import React from "react";
import { Stack, Typography } from "@mui/material";

import SampleImage from "../../../../assets/sample.png";

// import components
import LogoHeader from "../../../displays/LogoHeader";
import BlogCard from "../../../cards/BlogCard";
import LoadingDisplay from "../../../displays/LoadingDisplay";
import ErrorDisplay from "../../../displays/ErrorDisplay";

// import api
import { useGetPublicationsQuery } from "../../../pages/Publication/api/publicationApi";

const UserHome = () => {
    const {
        data: allPublications = [],
        isError: allPublicationsError,
        isSuccess: allPublicationsSuccess,
        isLoading: allPublicationsLoading,
        isFetching: allPublicationsFetching,
    } = useGetPublicationsQuery();

    return (
        <Stack>
            <LogoHeader header="SK PUBLICATION" />

            {/* Display Error State */}
            {allPublicationsError && <ErrorDisplay />}

            {/* Map through publications and display BlogCard */}
            {!allPublicationsLoading && !allPublicationsError && (
                <Stack gap={2} direction="row" flexWrap="wrap" justifyContent="space-evenly">
                    {allPublications.map((publication) => (
                        <BlogCard
                            key={publication.id}
                            bgColor="#e6e8fe"
                            cardImage={SampleImage}
                            cardTitle={publication.publication_title}
                        />
                    ))}
                </Stack>
            )}

            <LoadingDisplay open={allPublicationsLoading} />
        </Stack>
    );
};

export default UserHome;
