import React, { MouseEvent } from "react";
import { Box, Grid, Typography, Rating } from "@mui/material";

// import components
import PrimaryButton from "../buttons/PrimaryButton";

interface PublicationCardProps {
  barangay: string;
  barangayLogo: string;
  date: string;
  cardImage: string;
  title: string;
  content: string;
  views: number;
  comments: number;
  rating: number;

  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const PublicationCard: React.FC<PublicationCardProps> = ({
  barangay,
  barangayLogo,
  date,
  cardImage,
  title,
  content,
  views,
  comments,
  rating,
  onClick,
}) => {
  return (
    <Grid
      container
      rowSpacing={{ lg: 2 }}
      columnSpacing={4}
      sx={{
        borderRadius: "2px",
        border: "1px solid black",
        padding: "30px 40px 30px 0px",
      }}
    >
      <Grid
        item
        md={4}
        sm={5}
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
        </Box>
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
          <Box>
            <PrimaryButton size="medium" color="info" onClick={onClick}>
              Provide Feedback
            </PrimaryButton>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        sx={{
          display: "grid",
          alignContent: "space-between",
          gap: "32px",
        }}
        md={8}
        sm={7}
        xs={12}
      >
        <Typography variant="h4" fontWeight={600} textAlign={"center"}>
          {title}
        </Typography>
        <Typography variant="subtitle1" fontFamily="Poppins">
          {content}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "32px",
          }}
        >
          <Typography variant="subtitle1">{views} views</Typography>
          <Typography variant="subtitle1">{comments} comments </Typography>
          <Rating name="read-only" value={rating} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default PublicationCard;
