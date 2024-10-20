import React from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Typography } from "@mui/material";

import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import { formatDate } from "../../utils/dateUtil.js";

// import components
import LogoHeader from "../../components/displays/LogoHeader";
import LoadingDisplay from "../../components/displays/LoadingDisplay";
import ErrorDisplay from "../../components/displays/ErrorDisplay";
import AnnouncementCard from "../../components/cards/AnnouncementCard.js";

const AnnouncementList = () => {
  return (
    <Stack gap={2}>
      <LogoHeader header="SK ANNOUNCEMENTS" />

      <Stack gap={5}>
        <AnnouncementCard
          barangay="SK Gaston"
          barangayLogo=""
          date="June 11, 2024"
          cardImage=""
          title="KABATAAN KONTRA DROGA AT TERORISMO"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec viverra nec justo et pulvinar. Sed egestas accumsan turpis. Morbi mauris ligula, porta eu egestas a, feugiat eu augue. Nunc nibh massa, malesuada et fermentum eget, rutrum a est. Sed ac convallis nisl. Vivamus nec ligula purus. Proin fringilla purus id risus viverra molestie. Fusce vestibulum consectetur vulputate. Donec id ex hendrerit, condimentum ipsum viverra, tincidunt quam. Proin mollis tincidunt massa vel posuere. Sed ultrices lectus a consectetur facilisis."
        />
      </Stack>

      {/* {allPublicationsError && <ErrorDisplay />}
      <LoadingDisplay open={allPublicationsLoading} /> */}
    </Stack>
  );
};

export default AnnouncementList;
