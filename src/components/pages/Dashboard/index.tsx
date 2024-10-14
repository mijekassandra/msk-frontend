import React, { useState, useEffect } from "react";
import { Stack, Grid } from "@mui/material";
import { useLocation, useNavigate, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

import {
    AdminPanelSettingsOutlined,
    ArticleOutlined,
    CampaignOutlined,
    ContactPageOutlined,
    EventOutlined,
    FolderOutlined,
    GroupOutlined,
    HomeOutlined,
    InfoOutlined,
} from "@mui/icons-material";

// Import components
import BodyContainer from "../../containers/BodyContainer";
import Sidebar from "../../Sidebar";
import MiniAppbar from "../../MiniAppbar";
import DashboardHome from "./components/DashboardHome";
import SKSystem from "../SK System/SKSystem";
import SKFiles from "../SK Files/SKFiles";
import Announcement from "../Announcement/Announcement";
import Publication from "../Publication/Publication";
import Activities from "../Activities/Activities";
import Admin from "../Admin/Admin";
import AboutUs from "../About Us/AboutUs";
import ManageProfile from "../Settings/components/ManageProfile";
import AccountSetting from "../Settings/components/AccountSetting";
import Profiling from "../AdminFeatures/Profiling/Profiling";
import UserHome from "../UserFeatures/Home/UserHome";
import PublicationDetails from "../UserFeatures/Home/PublicationDetails"; // Import the component
import DashboardBody from "../../containers/DashboardBody";
import UserAnnouncement from "../UserFeatures/Announcement/UserAnnouncement";
import UserSKActivities from "../UserFeatures/SK Activities/UserSKActivities";
import UserSKFiles from "../UserFeatures/SK Files/UserSKFiles";

const dashboardTabs = [
    // TODO users first
    { tab: "/home", label: "HOME", icon: <HomeOutlined /> },

    // TODO super admin and admin, for admin view, just filter out to from what barangay the logged in role is
    { tab: "/dashboard", label: "DASHBOARD", icon: <HomeOutlined /> },
    { tab: "/sk-system", label: "SK SYSTEM", icon: <GroupOutlined /> },
    { tab: "/sk-files", label: "SK FILES", icon: <FolderOutlined /> },
    { tab: "/announcement", label: "ANNOUNCEMENT", icon: <CampaignOutlined /> },
    { tab: "/publication", label: "PUBLICATION", icon: <ArticleOutlined /> },
    { tab: "/activities", label: "ACTIVITIES", icon: <EventOutlined /> },

    // TODO super admin only
    { tab: "/admin", label: "ADMIN", icon: <AdminPanelSettingsOutlined /> },

    // TODO admin only
    { tab: "/users", label: "USERS", icon: <AdminPanelSettingsOutlined /> },
    { tab: "/profiling", label: "PROFILING", icon: <ContactPageOutlined /> },

    // TODO users only
    {
        tab: "/user-announcements",
        label: "ANNOUNCEMENTS",
        icon: <CampaignOutlined />,
    },
    { tab: "/user-sk-files", label: "SK FILES", icon: <FolderOutlined /> },
    { tab: "/sk-activities", label: "ACTIVITIES", icon: <EventOutlined /> },

    // TODO all users
    { tab: "/about-us", label: "ABOUT US", icon: <InfoOutlined /> },
];

const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentTab = location.pathname;

    // logged in user details
    const userDetail = useSelector((state: RootState) => state.auth.user);

    // predefine selected tab
    const [selectedTab, setSelectedTab] = useState(currentTab ? currentTab : "/dashboard");
    const [collapsedSidebar, setCollapsedSidebar] = useState(true);
    const [showDrawer, setShowDrawer] = useState(false);

    const handleTabChange = (newValue: string) => {
        navigate(newValue);
    };

    const toggleSidebar = () => {
        const isMobileView = window.innerWidth <= 899;

        if (isMobileView) {
            setShowDrawer(!showDrawer);
        } else {
            setCollapsedSidebar(!collapsedSidebar);
        }
    };

    useEffect(() => {
        if (currentTab !== selectedTab) {
            setSelectedTab(currentTab);
        }
    }, [currentTab, selectedTab]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 899 && showDrawer) {
                setShowDrawer(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [showDrawer]);

    const visibleTabs = dashboardTabs.filter((tab) => {
        if (userDetail?.role === "Super Admin" || userDetail?.role === "Federation") {
            // Super Admin and Federation see the same tabs
            return (
                tab.tab === "/dashboard" ||
                tab.tab === "/sk-system" ||
                tab.tab === "/sk-files" ||
                tab.tab === "/announcement" ||
                tab.tab === "/publication" ||
                tab.tab === "/activities" ||
                tab.tab === "/admin" ||
                tab.tab === "/about-us"
            );
        }

        if (userDetail?.role === "Chairperson") {
            // Chairperson sees SK files, announcement, publication, activities, profiling
            return (
                tab.tab === "/dashboard" ||
                tab.tab === "/sk-files" ||
                tab.tab === "/announcement" ||
                tab.tab === "/publication" ||
                tab.tab === "/activities" ||
                tab.tab === "/profiling" ||
                tab.tab === "/users" ||
                tab.tab === "/about-us"
            );
        }

        if (userDetail?.role === "User") {
            // Users see home, user announcements, user SK files, and SK activities
            return (
                tab.tab === "/home" ||
                tab.tab === "/user-announcements" ||
                tab.tab === "/user-sk-files" ||
                tab.tab === "/sk-activities" ||
                tab.tab === "/about-us"
            );
        }

        return false; // default showing nothing if no valid role is found
    });

    return (
        <BodyContainer
            content={
                <Stack direction="row" sx={{ height: "100%" }}>
                    <Grid container sx={{ height: "100%" }}>
                        <Grid
                            item
                            md={2.5}
                            sm={4}
                            xs={12}
                            sx={{
                                display: collapsedSidebar ? "flex" : "none",
                                "@media (min-width: 769px) and (max-width: 899px)": {
                                    display: "flex",
                                },
                            }}
                        >
                            {/* <Collapse in={collapsedSidebar} orientation="horizontal"> */}
                            <Sidebar
                                tabs={visibleTabs}
                                initialValue={selectedTab}
                                onChange={handleTabChange}
                                mobileView={{
                                    isShow: showDrawer,
                                    action: toggleSidebar,
                                }}
                            />
                            {/* </Collapse> */}
                        </Grid>
                        <Grid
                            item
                            md={collapsedSidebar ? 9.5 : 12}
                            xs={12}
                            sx={{ height: "100%", overflow: "auto" }}
                        >
                            <MiniAppbar toggleSidebar={toggleSidebar} />
                            <DashboardBody
                                content={
                                    <Routes>
                                        {(userDetail.role === "Super Admin" ||
                                            userDetail.role === "Federation") && (
                                            <>
                                                <Route path="/sk-system" element={<SKSystem />} />
                                                <Route path="/admin" element={<Admin />} />
                                            </>
                                        )}

                                        {(userDetail.role === "Super Admin" ||
                                            userDetail.role === "Federation" ||
                                            userDetail.role === "Chairperson") && (
                                            <>
                                                <Route
                                                    path="/dashboard"
                                                    element={<DashboardHome />}
                                                />

                                                <Route path="/sk-files" element={<SKFiles />} />
                                                <Route
                                                    path="/announcement"
                                                    element={<Announcement />}
                                                />
                                                <Route
                                                    path="/publication"
                                                    element={<Publication />}
                                                />
                                                <Route
                                                    path="/activities"
                                                    element={<Activities />}
                                                />
                                            </>
                                        )}
                                        {userDetail.role === "Chairperson" && (
                                            <>
                                                <Route path="/users" element={<Admin />} />
                                                <Route path="/profiling" element={<Profiling />} />
                                            </>
                                        )}

                                        {userDetail.role === "User" && (
                                            <>
                                                <Route path="/home" element={<UserHome />} />
                                                <Route
                                                    path="/home/:id"
                                                    element={<PublicationDetails />}
                                                />
                                                <Route
                                                    path="/user-announcements"
                                                    element={<UserAnnouncement />}
                                                />
                                                <Route
                                                    path="/user-sk-files"
                                                    element={<UserSKFiles />}
                                                />
                                                <Route
                                                    path="/sk-activities"
                                                    element={<UserSKActivities />}
                                                />
                                            </>
                                        )}
                                        {/* Routes for all users */}
                                        <Route path="/about-us" element={<AboutUs />} />
                                        <Route path="/manage-profile" element={<ManageProfile />} />
                                        <Route
                                            path="/account-settings"
                                            element={<AccountSetting />}
                                        />
                                    </Routes>
                                }
                            />
                        </Grid>
                    </Grid>
                </Stack>
            }
        ></BodyContainer>
    );
};

export default Dashboard;
