import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { Stack, Typography } from "@mui/material";

// import components
import PublicationCard from "../../../cards/PublicationCard";

const PublicationDetails = () => {
  const { id } = useParams(); // Get the publication ID from the URL
  const location = useLocation();
  const { publication } = location.state || {}; // Get publication data from the navigation state

  return (
    <Stack spacing={2} padding={3}>
      {publication ? (
        <PublicationCard
          barangay=""
          barangayLogo=""
          date={publication.date}
          cardImage=""
          title={publication.publication_title}
          content={publication.publication_content}
          views={24}
          comments={5}
          rating={5}
        ></PublicationCard>
      ) : (
        <Typography variant="h6">Loading publication details...</Typography>
      )}
    </Stack>
  );
};

export default PublicationDetails;
