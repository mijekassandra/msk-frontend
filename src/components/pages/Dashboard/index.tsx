import React, { useState, useEffect } from "react";
import { Stack, Grid, Fab } from "@mui/material";
import { useLocation, useNavigate, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { resetAdminState } from "../../../../slice/adminSlice";

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
    ArrowBackIos,
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
import PublicationList from "../../../features/Login/PublicationList";
import AnnouncementList from "../../../features/Login/AnnouncementList";
import ActivitiesList from "../../../features/Login/ActivitiesList";

const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentTab = location.pathname;

    const dispatch = useDispatch();

    // Fetch adminMode and selectedBarangay from the Redux store
    const adminMode = useSelector((state: RootState) => state.admin.adminMode);
    const selectedBarangay = useSelector((state: RootState) => state.admin.selectedBarangay);

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

    const getDashboardTabs = (adminMode, selectedBarangay, userRole) => {
        if (userRole === "Super Admin" || userRole === "Federation") {
            if (adminMode && selectedBarangay) {
                // Generate barangay-specific view tabs
                return [
                    {
                        tab: `/view/${selectedBarangay}/sk-files`,
                        label: "SK FILES",
                        icon: <FolderOutlined />,
                    },
                    {
                        tab: `/view/${selectedBarangay}/announcement`,
                        label: "ANNOUNCEMENT",
                        icon: <CampaignOutlined />,
                    },
                    {
                        tab: `/view/${selectedBarangay}/publication`,
                        label: "PUBLICATION",
                        icon: <ArticleOutlined />,
                    },
                    {
                        tab: `/view/${selectedBarangay}/activities`,
                        label: "ACTIVITIES",
                        icon: <EventOutlined />,
                    },
                    {
                        tab: `/view/${selectedBarangay}/users`,
                        label: "USERS",
                        icon: <AdminPanelSettingsOutlined />,
                    },
                    {
                        tab: `/view/${selectedBarangay}/profiling`,
                        label: "PROFILING",
                        icon: <ContactPageOutlined />,
                    },
                ];
            }

            // Default Super Admin view
            return [
                { tab: "/dashboard", label: "DASHBOARD", icon: <HomeOutlined /> },
                { tab: "/sk-system", label: "SK SYSTEM", icon: <GroupOutlined /> },
                { tab: "/sk-files", label: "SK FILES", icon: <FolderOutlined /> },
                { tab: "/announcement", label: "ANNOUNCEMENT", icon: <CampaignOutlined /> },
                { tab: "/publication", label: "PUBLICATION", icon: <ArticleOutlined /> },
                { tab: "/activities", label: "ACTIVITIES", icon: <EventOutlined /> },
                { tab: "/admin", label: "ADMIN", icon: <AdminPanelSettingsOutlined /> },
                { tab: "/about-us", label: "ABOUT US", icon: <InfoOutlined /> },
            ];
        }

        if (userRole === "Chairperson") {
            // Chairperson's tabs
            return [
                { tab: "/dashboard", label: "DASHBOARD", icon: <HomeOutlined /> },
                { tab: "/sk-files", label: "SK FILES", icon: <FolderOutlined /> },
                { tab: "/announcement", label: "ANNOUNCEMENT", icon: <CampaignOutlined /> },
                { tab: "/publication", label: "PUBLICATION", icon: <ArticleOutlined /> },
                { tab: "/activities", label: "ACTIVITIES", icon: <EventOutlined /> },
                { tab: "/profiling", label: "PROFILING", icon: <ContactPageOutlined /> },
                { tab: "/users", label: "USERS", icon: <AdminPanelSettingsOutlined /> },
                { tab: "/about-us", label: "ABOUT US", icon: <InfoOutlined /> },
            ];
        }

        if (userRole === "User") {
            // User-specific tabs
            return [
                { tab: "/home", label: "HOME", icon: <HomeOutlined /> },
                { tab: "/user-announcements", label: "ANNOUNCEMENTS", icon: <CampaignOutlined /> },
                { tab: "/user-sk-files", label: "SK FILES", icon: <FolderOutlined /> },
                { tab: "/sk-activities", label: "ACTIVITIES", icon: <EventOutlined /> },
                { tab: "/about-us", label: "ABOUT US", icon: <InfoOutlined /> },
            ];
        }

        return []; // Return an empty array if no valid role is found
    };

    const visibleTabs = getDashboardTabs(adminMode, selectedBarangay, userDetail?.role);

    const handleBackToDashboard = () => {
        dispatch(resetAdminState()); // Reset admin mode and selected barangay
        navigate("/sk-system");
    };

    return (
        <BodyContainer
            content={
                <Stack direction="row" sx={{ height: "100%" }}>
                    {adminMode && (
                        <Fab
                            size="small"
                            variant="extended"
                            aria-label="back-to-dashboard"
                            onClick={handleBackToDashboard}
                            sx={{
                                color: "primary.light",
                                position: "fixed",
                                bottom: "40px",
                                left: "50%",
                                transform: "translateX(-50%)",
                                zIndex: 1000,
                                padding: "7px 20px",
                                fontSize: "14px",
                            }}
                        >
                            <ArrowBackIos sx={{ fontSize: "16px" }} />
                            Back to Super Admin View
                        </Fab>
                    )}

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
                                        {(userDetail?.role === "Super Admin" ||
                                            userDetail?.role === "Federation") && (
                                            <>
                                                <Route path="/sk-system" element={<SKSystem />} />
                                                <Route path="/admin" element={<Admin />} />
                                            </>
                                        )}

                                        {(userDetail?.role === "Super Admin" ||
                                            userDetail?.role === "Federation" ||
                                            userDetail?.role === "Chairperson") && (
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
                                                <Route
                                                    path="/publication-list"
                                                    element={<PublicationList />}
                                                />
                                                <Route
                                                    path="/announcement-list"
                                                    element={<AnnouncementList />}
                                                />
                                                <Route
                                                    path="/activities-list"
                                                    element={<ActivitiesList />}
                                                />
                                            </>
                                        )}
                                        {userDetail?.role === "Chairperson" && (
                                            <>
                                                <Route path="/users" element={<Admin />} />
                                                <Route path="/profiling" element={<Profiling />} />
                                            </>
                                        )}

                                        {userDetail?.role === "User" && (
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

                                        {/* Admin Mode routes for Super Admin viewing barangay-specific views */}
                                        {(userDetail?.role === "Super Admin" ||
                                            userDetail?.role === "Federation") &&
                                            adminMode &&
                                            selectedBarangay && (
                                                <>
                                                    <Route
                                                        path="/view/:barangayName/sk-files"
                                                        element={<SKFiles readOnly />}
                                                    />
                                                    <Route
                                                        path="/view/:barangayName/announcement"
                                                        element={<Announcement readOnly />}
                                                    />
                                                    <Route
                                                        path="/view/:barangayName/publication"
                                                        element={<Publication readOnly />}
                                                    />
                                                    <Route
                                                        path="/view/:barangayName/activities"
                                                        element={<Activities readOnly />}
                                                    />
                                                    <Route
                                                        path="/view/:barangayName/users"
                                                        element={<Admin readOnly />}
                                                    />
                                                    <Route
                                                        path="/view/:barangayName/profiling"
                                                        element={<Profiling readOnly />}
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
