import React from "react";
import { Stack, Typography } from "@mui/material";

// import components
const AboutUs = () => {
    return (
        <Stack rowGap={5} padding="5px 10px">
            <img
                src="src/assets/sample.png"
                style={{
                    borderRadius: "8px",
                    height: "230px",
                    // objectFit: "cover",
                }}
            />
            <Stack spacing={1}>
                <Typography variant="h2" textAlign="center">
                    ABOUT US
                </Typography>
                <Typography variant="subtitle1" textAlign="justify" sx={{ textIndent: "5em" }}>
                    The Sangguniang Kabataan (SK) Council of Barangay Gaston is a youth council
                    dedicated to the development and empowerment of the youth within Barangay
                    Gaston. The council aims to implement various programs and projects that address
                    the needs and interests of young individuals in the community. Through active
                    engagement, the SK Council fosters a sense of responsibility, leadership, and
                    community involvement among the youth.
                </Typography>
            </Stack>
            <Stack spacing={1}>
                <Typography variant="h2" textAlign="center">
                    MISSION
                </Typography>
                <Typography variant="subtitle1" textAlign="justify" sx={{ textIndent: "5em" }}>
                    Nunc in leo id nisl porta ultrices. Vivamus consectetur, magna id varius
                    dapibus, nunc tortor lobortis purus, et maximus ex erat ac turpis. Suspendisse
                    quam libero, dictum non imperdiet et, ultricies eget metus. Donec vulputate ante
                    enim, nec tempus quam porta sit amet. Etiam ultricies eu urna scelerisque
                    pulvinar. In convallis magna nunc, sed finibus justo eleifend quis.
                </Typography>
            </Stack>
            <Stack spacing={1}>
                <Typography variant="h2" textAlign="center">
                    VISION
                </Typography>
                <Typography variant="subtitle1" textAlign="justify" sx={{ textIndent: "5em" }}>
                    Phasellus lobortis ultricies velit ut egestas. Sed tincidunt urna et risus
                    lacinia, et finibus leo mattis. Donec luctus sollicitudin dapibus. Pellentesque
                    at urna ultricies neque fringilla molestie. Donec fermentum nisl nec nulla
                    tincidunt placerat. Phasellus in aliquet justo, vel vulputate lorem. Phasellus
                    eros purus, blandit sagittis augue eu, varius aliquet sapien.
                </Typography>
            </Stack>
        </Stack>
    );
};

export default AboutUs;
