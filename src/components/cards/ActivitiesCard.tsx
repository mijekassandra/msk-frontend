import React, { MouseEvent } from "react";
import { Stack, Grid, Typography } from "@mui/material";
import { CalendarMonth, LocationOn } from "@mui/icons-material/";

// import components
import TertiaryButton from "../buttons/TertiaryButton";

interface ActivitiesCardProps {
  barangay: string;
  barangayLogo: string;
  date: string;
  cardImage: string;
  title: string;
  location: string;

  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const ActivitiesCard: React.FC<ActivitiesCardProps> = ({
  barangay,
  barangayLogo,
  date,
  cardImage,
  title,
  location,
  onClick,
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
        <Typography variant="h3" fontWeight={600} textAlign={"center"}>
          {title}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          <CalendarMonth />
          <Typography variant="subtitle1" fontFamily="Poppins">
            {date}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <LocationOn />
          <Typography variant="subtitle1" fontFamily="Poppins">
            {location}
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="flex-end" marginRight="20px">
          <TertiaryButton
            variant="text"
            color="primary"
            size="large"
            onClick={onClick}
          >
            VIEW
          </TertiaryButton>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default ActivitiesCard;
