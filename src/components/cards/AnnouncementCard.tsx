import React from "react";
import { Box, Grid, Typography } from "@mui/material";

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
      rowSpacing={{ xs: 2 }}
      columnSpacing={4}
      sx={{
        borderRadius: "4px",
        border: "1px solid black",
        padding: "20px 30px 40px 0px",
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
        <Box>
          <Typography variant="subtitle1">{barangay}</Typography>
          <Typography variant="body1" color={"gray"}>
            {date}
          </Typography>
        </Box>
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <img
            src={cardImage}
            height="200px"
            width="100%"
            style={{ borderRadius: "16px" }}
          />
        </Box>
      </Grid>
      <Grid
        item
        sx={{
          display: "grid",
          alignContent: "flex-start",
          gap: "32px",
        }}
        md={8}
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
