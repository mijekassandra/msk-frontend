import React, { useState, useEffect } from "react";
import { Stack, Grid, Collapse } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

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

//import components
import BodyContainer from "../../containers/BodyContainer";
import Sidebar from "../../Sidebar";
import MiniAppbar from "../../MiniAppbar";
import DashboardBody from "../../containers/DashboardBody";
import DashboardHome from "./components/DashboardHome";
import SKSystem from "../SK System/SKSystem";
import SKFiles from "../SK Files/SKFiles";
import Announcement from "../Announcement/Announcement";
import Publication from "../Publication/Publication";
import Activities from "../Activities/Activities";
import Admin from "../Admin/Admin";
import AboutUs from "../About Us/AboutUs";

const dashboardTabs = [
    {
        tab: "/dashboard",
        label: "DASHBOARD",
        icon: <HomeOutlined />,
    },
    {
        tab: "/sk-system",
        label: "SK SYSTEM",
        icon: <GroupOutlined />,
    },
    {
        tab: "/sk-files",
        label: "SK FILES",
        icon: <FolderOutlined />,
    },
    {
        tab: "/announcement",
        label: "ANNOUNCEMENT",
        icon: <CampaignOutlined />,
    },
    {
        tab: "/publication",
        label: "PUBLICATION",
        icon: <ArticleOutlined />,
    },
    {
        tab: "/activities",
        label: "ACTIVITIES",
        icon: <EventOutlined />,
    },
    {
        tab: "/admin",
        label: "ADMIN",
        icon: <AdminPanelSettingsOutlined />,
    },
    {
        tab: "/about-us",
        label: "ABOUT US",
        icon: <InfoOutlined />,
    },
];

const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const currentTab = location.pathname;

    const [selectedTab, setSelectedTab] = useState(currentTab ? currentTab : "/dashboard");
    const [collapsedSidebar, setCollapsedSidebar] = useState(true);
    const [showDrawer, setShowDrawer] = useState(false);

    const handleTabChange = (newValue: string) => {
        setSelectedTab(newValue);
        navigate(newValue);
    };

    const toggleSidebar = () => {
        const isMobileView = window.innerWidth <= 899;

        if (isMobileView) {
            setShowDrawer(!showDrawer);
            console.log("im here sa drawer");
        } else {
            setCollapsedSidebar(!collapsedSidebar);
            console.log("im here sa collapsed");
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
                <Stack direction="row">
                    <Grid container>
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
                                    initialValue={"selectedTab"}
                                    onChange={handleTabChange}
                                    mobileView={{
                                        isShow: showDrawer,
                                        action: toggleSidebar,
                                    }}
                                />
                            </Collapse>
                        </Grid>
                        <Grid item md={collapsedSidebar ? 9 : 12} xs={12}>
                            <MiniAppbar toggleSidebar={toggleSidebar} />
                            <DashboardBody
                                content={
                                    <>
                                        {selectedTab === "/dashboard" && <DashboardHome />}
                                        {selectedTab === "/sk-system" && <SKSystem />}
                                        {selectedTab === "/sk-files" && <SKFiles />}
                                        {selectedTab === "/announcement" && <Announcement />}
                                        {selectedTab === "/publication" && <Publication />}
                                        {selectedTab === "/activities" && <Activities />}
                                        {selectedTab === "/admin" && <Admin />}
                                        {selectedTab === "/about-us" && <AboutUs />}
                                    </>
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
