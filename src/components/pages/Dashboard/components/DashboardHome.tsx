import { useEffect } from "react";
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
import ChartsMainDash from "../../AdminFeatures/Analytics/ChartsMainDash";
import AnalyticsCard from "../../../cards/AnalyticsCard";
import MenuCardTwo from "../../../cards/MenuCardTwo";

// import api slices
import { useGetAnalyticsQuery } from "../components/analyticsApi";

const DashboardHome = () => {
    const navigate = useNavigate();

    // logged in user details
    const userDetail = useSelector((state: RootState) => state.auth.user);

    const { data: analytics, refetch } = useGetAnalyticsQuery();

    const handleNavigation = (path: string) => {
        navigate(path);
    };
    useEffect(() => {
        refetch();
    }, []);

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

                        {userDetail.role !== "User" && analytics && (
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
                                                cardTitle={
                                                    userDetail.role ===
                                                    "Federation"
                                                        ? `Federation Total KK Profile`
                                                        : `${userDetail.barangay} Total KK Profile `
                                                }
                                                yesCount={
                                                    analytics["Population"]
                                                }
                                                width="50%"
                                                color="#e79e8f"
                                            />
                                            <AnalyticsCard
                                                cardTitle="Working Individuals"
                                                yesCount={
                                                    analytics[
                                                        "Working Individuals"
                                                    ]
                                                }
                                                totalValue={
                                                    analytics["Population"]
                                                }
                                                width="50%"
                                                color="#dda85d"
                                            />
                                        </Stack>
                                        <ChartsMainDash
                                            chartTitle="Voter Status"
                                            data={[
                                                {
                                                    id: 0,
                                                    value: analytics[
                                                        "Active Voters"
                                                    ],
                                                    label: "Active",
                                                },
                                                {
                                                    id: 1,
                                                    value: analytics[
                                                        "Inactive Voters"
                                                    ],
                                                    label: "Inactive",
                                                },
                                            ]}
                                        />
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
                                                cardTitle="Has Medical Condition"
                                                yesCount={
                                                    analytics[
                                                        "Has Medical Condition"
                                                    ]
                                                }
                                                totalValue={
                                                    analytics["Population"]
                                                }
                                                width="50%"
                                                color="#087BA7"
                                            />
                                            <AnalyticsCard
                                                cardTitle="No Disability"
                                                yesCount={
                                                    analytics["No Disability"]
                                                }
                                                totalValue={
                                                    analytics["Population"]
                                                }
                                                width="50%"
                                                color="#D26A53"
                                            />
                                        </Stack>
                                        <ChartsMainDash
                                            chartTitle="Educational Status"
                                            data={[
                                                {
                                                    id: 0,
                                                    value: analytics[
                                                        "In School Youth"
                                                    ],
                                                    label: "In School Youth",
                                                },
                                                {
                                                    id: 1,
                                                    value: analytics[
                                                        "Out of School Youth"
                                                    ],
                                                    label: "Out of School ",
                                                },
                                            ]}
                                        />
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
