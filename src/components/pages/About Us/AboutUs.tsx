import { Stack, Typography } from "@mui/material";

import SKCouncil from "/src/assets/federation-aboutus.jpeg";
import OrganizationalCover from "/src/assets/organizational-chart.png";

// import components
const AboutUs = () => {
    return (
        <Stack rowGap={5} padding="5px 10px">
            <img
                src={SKCouncil}
                style={{
                    borderRadius: "8px",
                    height: "250px",
                    objectFit: "cover",
                    textAlign: "center",
                }}
            />
            <Stack spacing={1}>
                <Typography variant="h2" textAlign="center" fontWeight={500}>
                    ABOUT US
                </Typography>
                <Typography
                    variant="subtitle1"
                    textAlign="justify"
                    sx={{ textIndent: "5em" }}
                >
                    The Sangguniang Kabataan (SK) Council of Barangay Gaston is
                    a youth council dedicated to the development and empowerment
                    of the youth within Barangay Gaston. The council aims to
                    implement various programs and projects that address the
                    needs and interests of young individuals in the community.
                    Through active engagement, the SK Council fosters a sense of
                    responsibility, leadership, and community involvement among
                    the youth.
                </Typography>
            </Stack>
            <Stack spacing={1}>
                <Typography variant="h2" textAlign="center" fontWeight={500}>
                    ORGANIZATIONAL CHART
                </Typography>
                <img
                    src={OrganizationalCover}
                    style={{
                        borderRadius: "8px",
                        objectFit: "cover",
                        textAlign: "center",
                    }}
                />
            </Stack>
        </Stack>
    );
};

export default AboutUs;
