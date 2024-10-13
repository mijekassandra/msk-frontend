import React from "react";
import { useNavigate } from "react-router-dom";
import { Stack, TextField } from "@mui/material";

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
    <Stack gap={2}>
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
              cardTitle={publication.title}
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
