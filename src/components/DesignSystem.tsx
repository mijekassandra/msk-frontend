import { Stack, Box, Typography } from "@mui/material";

// import icons
import { DeleteForever, Send } from "@mui/icons-material";

// import images
import FolderFile from "../assets/folder_files.png";
import SampleImage from "../assets/sample.png";
import SampleBarangay from "../assets/gaston.jpg";

//import Components
import PrimaryButton from "./buttons/PrimaryButton";
import SecondaryButton from "./buttons/SecondaryButton";
import TertiaryButton from "./buttons/TertiaryButton";
import TwoChoice from "./buttons/TwoChoice";
import MenuCard from "./cards/MenuCard";
import DashboardCard from "./cards/DashboardCard";
import BlogCard from "./cards/BlogCard";
import PublicationCard from "./cards/PublicationCard";
import AnnouncementCard from "./cards/AnnouncementCard";
import ActivitiesCard from "./cards/ActivitiesCard";

const designSystem = () => {
  return (
    <Stack sx={{ padding: "30px" }}>
      <Box>
        <Typography variant="h1">Typography:</Typography>
        <br />
        <Typography variant="h1">This is h1</Typography>
        <Typography variant="h2">This is h2</Typography>
        <Typography variant="h3">This is h3</Typography>
        <Typography variant="h4">This is h4</Typography>
        <Typography variant="subtitle1">This is subtitle1</Typography>
        <Typography variant="subtitle2">This is subtitle2</Typography>
        <Typography variant="body1">This is body1</Typography>
        <Typography variant="body2">This is body2</Typography>
        <Typography variant="caption">This is caption</Typography>
      </Box>
      <br />
      <Stack sx={{ gap: 1 }}>
        <Typography variant="h1">Buttons:</Typography>
        <br />
        <PrimaryButton size="medium">PRIMARY BUTTON</PrimaryButton>
        <SecondaryButton size="medium">SECONDARY BUTTON</SecondaryButton>
        <TertiaryButton variant="outlined" size="large" color="primary">
          TERTIARY BUTTON
        </TertiaryButton>
        <TertiaryButton variant="text" color="primary" size="large">
          TERTIARY BUTTON TEXT ONLY
        </TertiaryButton>
        <TwoChoice leftText="Cancel" rightText="Confirm" size="medium" />

        <PrimaryButton size="medium" startIcon={<DeleteForever />}>
          BUTTON ICON
        </PrimaryButton>
        <SecondaryButton size="medium" endIcon={<Send />}>
          BUTTON ICON
        </SecondaryButton>
      </Stack>
      <br />

      <Stack>
        <Typography variant="h1">Cards:</Typography>
        <br />

        {/* <LoginCard content={<Typography>Login Here</Typography>} /> */}
        <Typography variant="h4">Menu Card:</Typography>
        <MenuCard
          cardImage={FolderFile}
          content={
            <Typography variant="h3" textAlign="center">
              FILES
            </Typography>
          }
        />
        <Typography variant="h4">Dashboard Card:</Typography>
        <DashboardCard
          content={
            <Typography variant="h3" textAlign="center">
              Insert content here
            </Typography>
          }
        />
        <Typography variant="h4">Blog Card:</Typography>
        <BlogCard
          bgColor="#e6e8fe"
          cardImage={SampleImage}
          cardTitle="Sample Title"
        ></BlogCard>

        <Box
          sx={{
            padding: "20px",
          }}
        >
          <Typography variant="h4">Publication Card:</Typography>
          <br />
          <PublicationCard
            barangay="SK Gaston"
            barangayLogo={SampleBarangay}
            date="June 11, 2024"
            cardImage={SampleImage}
            title="KABATAAN KONTRA DROGA AT TERORISMO"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec viverra nec justo et pulvinar. Sed egestas accumsan turpis. Morbi mauris ligula, porta eu egestas a, feugiat eu augue. Nunc nibh massa, malesuada et fermentum eget, rutrum a est. Sed ac convallis nisl. Vivamus nec ligula purus. Proin fringilla purus id risus viverra molestie. Fusce vestibulum consectetur vulputate. Donec id ex hendrerit, condimentum ipsum viverra, tincidunt quam. Proin mollis tincidunt massa vel posuere. Sed ultrices lectus a consectetur facilisis."
            views={24}
            comments={5}
            rating={5}
          ></PublicationCard>
          <Typography variant="h4">Announcement Card:</Typography>
          <br />
          <AnnouncementCard
            barangay="SK Gaston"
            barangayLogo={SampleBarangay}
            date="June 11, 2024"
            cardImage={SampleImage}
            title="KABATAAN KONTRA DROGA AT TERORISMO"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec viverra nec justo et pulvinar. Sed egestas accumsan turpis. Morbi mauris ligula, porta eu egestas a, feugiat eu augue. Nunc nibh massa, malesuada et fermentum eget, rutrum a est. Sed ac convallis nisl. Vivamus nec ligula purus. Proin fringilla purus id risus viverra molestie. Fusce vestibulum consectetur vulputate. Donec id ex hendrerit, condimentum ipsum viverra, tincidunt quam. Proin mollis tincidunt massa vel posuere. Sed ultrices lectus a consectetur facilisis."
          ></AnnouncementCard>
          <Typography variant="h4">Activities Card:</Typography>
          <br />
          <ActivitiesCard
            barangay="SK Gaston"
            barangayLogo={SampleBarangay}
            date="May 24, 204"
            cardImage={SampleImage}
            title="SPORTSFEST 2024"
            location="Brgy. Gaston, Lagonglong Mis. Or"
          ></ActivitiesCard>
        </Box>
      </Stack>
      <Stack direction="row" spacing={2}>
        <PrimaryButton size="medium">Form Variant 1</PrimaryButton>
        <SecondaryButton size="medium">Form Variant 2</SecondaryButton>
        <PrimaryButton size="medium" variant="outlined">
          Form Variant 3
        </PrimaryButton>
      </Stack>
    </Stack>
  );
};

export default designSystem;
