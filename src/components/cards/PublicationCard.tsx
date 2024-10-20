import React, { MouseEvent } from "react";
import { Stack, Grid, Typography, Rating } from "@mui/material";

// import components
import PrimaryButton from "../buttons/PrimaryButton";

interface PublicationCardProps {
  barangay: string;
  barangayLogo: string;
  date: string;
  cardImage: File | null;
  title: string;
  content: string;
  views: number;
  comments: number;
  rating: number;

  onFeedbackClick?: (event: MouseEvent<HTMLButtonElement>) => void; // Separate handler for feedback
  onCommentsClick?: (event: MouseEvent<HTMLDivElement>) => void; // Separate handler for comments
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
  onFeedbackClick,
  onCommentsClick,
}) => {
  return (
    <Grid
      container
      gap={{ xs: 2, md: 4 }}
      justifyContent="space-between"
      sx={{
        borderRadius: "2px",
        border: "1px solid #CCCCCC",
        padding: "20px 30px 40px 30px",
      }}
    >
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
        <Grid
          item
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
        <Stack
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
          <Stack>
            <PrimaryButton size="medium" color="info" onClick={onFeedbackClick}>
              Provide Feedback
            </PrimaryButton>
          </Stack>
        </Stack>
      </Grid>
      <Grid
        item
        sx={{
          display: "grid",
          alignContent: "space-between",
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
        <Stack
          direction="row"
          alignItems="center"
          justifyContent={{
            md: "flex-end",
            xs: "space-between",
          }}
          gap={{
            md: 6,
            xs: 1,
          }}
          flex="flex-wrap"
        >
          <Typography variant="subtitle1">{views} views</Typography>
          <Typography
            variant="subtitle1"
            onClick={onCommentsClick}
            sx={{ cursor: "pointer" }}
          >
            {comments} comments{" "}
          </Typography>
          <Rating name="read-only" value={rating} />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default PublicationCard;
