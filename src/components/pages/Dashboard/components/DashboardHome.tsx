import { useNavigate } from "react-router-dom";
import { Stack, Typography, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import {
    FeedOutlined,
    CampaignOutlined,
    EventNoteOutlined,
} from "@mui/icons-material";

// import components
import DashboardCard from "../../../cards/DashboardCard";
import MenuCard from "../../../cards/MenuCard";
import ChartsMainDash from "../../AdminFeatures/Analytics/ChartsMainDash";
import AnalyticsCard from "../../../cards/AnalyticsCard";
import MenuCardTwo from "../../../cards/MenuCardTwo";

const DashboardHome = () => {
    const navigate = useNavigate();

    // logged in user details
    const userDetail = useSelector((state: RootState) => state.auth.user);

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    return (
        <Stack rowGap={3}>
            <Typography variant="h2">DASHBOARD</Typography>
            <DashboardCard
                padding="15px 20px"
                content={
                    <Stack gap={2}>
                        <Typography
                            variant="h5"
                            fontWeight={600}
                            sx={{
                                width: "full-width",
                            }}
                        >
                            Menu
                        </Typography>
                        <Stack
                            sx={{
                                flexDirection: { sm: "column", md: "row" },
                                gap: 2,
                            }}
                        >
                            <Box flex={1}>
                                <MenuCardTwo
                                    cardTitle="PUBLICATIONS"
                                    subheader="Explore published content"
                                    icon={
                                        <FeedOutlined
                                            sx={{ fontSize: "22px" }}
                                        />
                                    }
                                    bgColor="primary.light"
                                    onClick={() =>
                                        handleNavigation(
                                            userDetail.role === "User"
                                                ? "/user-publications"
                                                : "/publication-list"
                                        )
                                    }
                                />
                            </Box>
                            <Box flex={1}>
                                <MenuCardTwo
                                    cardTitle="ANNOUNCEMENTS"
                                    subheader="Stay informed with the latest news"
                                    icon={
                                        <CampaignOutlined
                                            sx={{ fontSize: "22px" }}
                                        />
                                    }
                                    bgColor="secondary.light"
                                    onClick={() =>
                                        handleNavigation(
                                            userDetail.role === "User"
                                                ? "/user-announcements"
                                                : "/announcement-list"
                                        )
                                    }
                                />
                            </Box>
                            <Box flex={1}>
                                <MenuCardTwo
                                    cardTitle="ACTIVITIES"
                                    subheader="View upcoming activities"
                                    icon={
                                        <EventNoteOutlined
                                            sx={{ fontSize: "22px" }}
                                        />
                                    }
                                    bgColor="error.main"
                                    onClick={() =>
                                        handleNavigation(
                                            userDetail.role === "User"
                                                ? "/sk-activities"
                                                : "/activities-list"
                                        )
                                    }
                                />
                            </Box>
                        </Stack>

                        {/* <Grid item>
                                <MenuCard
                                    cardImage="src/assets/blogging.png"
                                    imgWidth="120px"
                                    content={
                                        <Typography
                                            variant="subtitle1"
                                            textAlign="center"
                                        >
                                            PUBLICATION
                                        </Typography>
                                    }
                                    onClick={() =>
                                        handleNavigation(
                                            userDetail.role === "User"
                                                ? "/user-publications"
                                                : "/publication-list"
                                        )
                                    }
                                />
                            </Grid>
                            <Grid item>
                                <MenuCard
                                    cardImage="src/assets/announcements.png"
                                    imgWidth="100px"
                                    content={
                                        <Typography
                                            variant="subtitle1"
                                            textAlign="center"
                                        >
                                            ANNOUNCEMENT
                                        </Typography>
                                    }
                                    onClick={() =>
                                        handleNavigation(
                                            userDetail.role === "User"
                                                ? "/user-announcements"
                                                : "/announcement-list"
                                        )
                                    }
                                />
                            </Grid>

                            <Grid item>
                                <MenuCard
                                    cardImage="src/assets/activities.png"
                                    imgWidth="100px"
                                    content={
                                        <Typography
                                            variant="subtitle1"
                                            textAlign="center"
                                        >
                                            ACTIVITIES
                                        </Typography>
                                    }
                                    onClick={() =>
                                        handleNavigation(
                                            userDetail.role === "User"
                                                ? "/sk-activities"
                                                : "/activities-list"
                                        )
                                    }
                                />
                            </Grid> */}
                        {userDetail.role !== "User" && (
                            <>
                                <Typography
                                    variant="h5"
                                    fontWeight={600}
                                    sx={{
                                        width: "full-width",
                                    }}
                                >
                                    Analytics
                                </Typography>
                                <Stack
                                    justifyContent="center"
                                    sx={{
                                        flexDirection: {
                                            sm: "column",
                                            md: "row",
                                        },
                                        gap: 2,
                                    }}
                                >
                                    <Stack
                                        gap={1.5}
                                        sx={{
                                            width: {
                                                xs: "100%",
                                            },
                                        }}
                                    >
                                        <Stack gap={1} direction="row">
                                            <AnalyticsCard
                                                cardTitle="Total KK Profile"
                                                yesCount={123}
                                                width="50%"
                                                color="#e79e8f"
                                            />
                                            <AnalyticsCard
                                                cardTitle="Total Active Voters"
                                                yesCount={58}
                                                noCount={14}
                                                width="50%"
                                                color="#dda85d"
                                            />
                                        </Stack>
                                        <ChartsMainDash />
                                    </Stack>
                                    <Stack
                                        gap={1.5}
                                        sx={{
                                            width: {
                                                xs: "100%",
                                            },
                                        }}
                                    >
                                        <Stack gap={1} direction="row">
                                            <AnalyticsCard
                                                cardTitle="Total KK Profile"
                                                yesCount={123}
                                                width="50%"
                                                color="#D26A53"
                                            />
                                            <AnalyticsCard
                                                cardTitle="Total Active Voters"
                                                yesCount={58}
                                                noCount={14}
                                                width="50%"
                                                color="#087BA7"
                                            />
                                        </Stack>
                                        <ChartsMainDash />
                                    </Stack>
                                </Stack>
                            </>
                        )}
                    </Stack>
                }
            />
        </Stack>
    );
};

export default DashboardHome;
