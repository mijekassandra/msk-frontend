import React, { useState, useEffect } from "react";
import { Stack, Grid, Collapse } from "@mui/material";
import { useLocation, useNavigate, Routes, Route } from "react-router-dom";

import {
  AdminPanelSettingsOutlined,
  ArticleOutlined,
  CampaignOutlined,
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

const dashboardTabs = [
  { tab: "/dashboard", label: "DASHBOARD", icon: <HomeOutlined /> },
  { tab: "/sk-system", label: "SK SYSTEM", icon: <GroupOutlined /> },
  { tab: "/sk-files", label: "SK FILES", icon: <FolderOutlined /> },
  { tab: "/announcement", label: "ANNOUNCEMENT", icon: <CampaignOutlined /> },
  { tab: "/publication", label: "PUBLICATION", icon: <ArticleOutlined /> },
  { tab: "/activities", label: "ACTIVITIES", icon: <EventOutlined /> },
  { tab: "/admin", label: "ADMIN", icon: <AdminPanelSettingsOutlined /> },
  { tab: "/about-us", label: "ABOUT US", icon: <InfoOutlined /> },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTab = location.pathname;

  const [selectedTab, setSelectedTab] = useState(
    currentTab ? currentTab : "/dashboard"
  );
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

  return (
    <BodyContainer
      content={
        <Stack direction="row" sx={{ height: "100%" }}>
          <Grid container sx={{ height: "100%" }}>
            <Grid
              item
              md={3}
              sm={4}
              xs={12}
              sx={{
                display: collapsedSidebar ? "flex" : "none",
                "@media (min-width: 769px) and (max-width: 899px)": {
                  display: "flex", // Ensure sidebar shows in this range
                },
              }}
            >
              <Collapse in={collapsedSidebar} orientation="horizontal">
                <Sidebar
                  tabs={dashboardTabs}
                  initialValue={selectedTab}
                  onChange={handleTabChange}
                  mobileView={{
                    isShow: showDrawer,
                    action: toggleSidebar,
                  }}
                />
              </Collapse>
            </Grid>
            <Grid
              item
              md={collapsedSidebar ? 9 : 12}
              xs={12}
              sx={{ height: "100%", overflow: "auto" }}
            >
              <MiniAppbar toggleSidebar={toggleSidebar} />
              <DashboardBody
                content={
                  <Routes>
                    <Route path="/dashboard" element={<DashboardHome />} />
                    <Route path="/sk-system" element={<SKSystem />} />
                    <Route path="/sk-files" element={<SKFiles />} />
                    <Route path="/announcement" element={<Announcement />} />
                    <Route path="/publication" element={<Publication />} />
                    <Route path="/activities" element={<Activities />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/manage-profile" element={<ManageProfile />} />
                    <Route
                      path="/account-settings"
                      element={<AccountSetting />}
                    />
                    {/* admin components */}
                    <Route path="/profiling" element={<Profiling />} />
                    <Route path="/home" element={<UserHome />} />
                    {/* user components */}
                    <Route path="/home/:id" element={<PublicationDetails />} />
                    <Route
                      path="/user-announcements"
                      element={<UserAnnouncement />}
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
