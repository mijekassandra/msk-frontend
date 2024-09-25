import React from "react";
import { Grid, Stack, Typography } from "@mui/material";

interface AnnouncementCardProps {
  barangay: string;
  barangayLogo: string;
  date: string;
  cardImage: string;
  title: string;
  content: string;
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({
  barangay,
  barangayLogo,
  date,
  cardImage,
  title,
  content,
}) => {
  return (
    <Grid
      container
      gap={{ xs: 2, md: 4 }}
      justifyContent="space-between"
      sx={{
        borderRadius: "4px",
        border: "1px solid #CCCCCC",
        padding: "20px 30px 40px 30px",
      }}
    >
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <img src={barangayLogo} height="40px" />
        <Stack>
          <Typography variant="subtitle1">{barangay}</Typography>
          <Typography variant="body1" color={"gray"}>
            {date}
          </Typography>
        </Stack>
      </Grid>
      <Grid
        item
        md={4}
        xs={12}
        sx={{
          display: "grid",
          alignContent: "flex-start",
          gap: "20px",
        }}
      >
        <Stack>
          <img
            src={cardImage}
            height="200px"
            width="100%"
            style={{ borderRadius: "16px" }}
          />
        </Stack>
      </Grid>
      <Grid
        item
        sx={{
          display: "grid",
          alignContent: "flex-start",
          gap: "32px",
        }}
        md={7}
        xs={12}
      >
        <Typography variant="h4" fontWeight={600} textAlign={"center"}>
          {title}
        </Typography>
        <Typography variant="subtitle1" fontFamily="Poppins">
          {content}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default AnnouncementCard;
