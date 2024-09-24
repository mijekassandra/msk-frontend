import React from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const {
    data: allPublications = [],
    isError: allPublicationsError,
    // isSuccess: allPublicationsSuccess,
    isLoading: allPublicationsLoading,
    // isFetching: allPublicationsFetching,
  } = useGetPublicationsQuery();

  const handleReadMore = (publication: any) => {
    navigate(`/home/${publication.id}`, {
      state: { publication },
    });
  };

  return (
    <Stack>
      <LogoHeader header="SK PUBLICATION" />

      {!allPublicationsLoading && !allPublicationsError && (
        <Stack
          gap={2}
          direction="row"
          flexWrap="wrap"
          justifyContent="space-evenly"
        >
          {allPublications.map((publication) => (
            <BlogCard
              key={publication.id}
              bgColor="#e6e8fe"
              cardImage={SampleImage}
              cardTitle={publication.publication_title}
              onClick={() => handleReadMore(publication)}
            />
          ))}
        </Stack>
      )}

      {allPublicationsError && <ErrorDisplay />}

      <LoadingDisplay open={allPublicationsLoading} />
    </Stack>
  );
};

export default UserHome;
