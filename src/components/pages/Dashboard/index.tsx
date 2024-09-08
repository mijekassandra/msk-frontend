import React, { useState, useEffect } from "react";
import { Stack, Grid, Box } from "@mui/material";
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
import BarangaySeal from "../../containers/BarangaySeal";
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

    const [selectedTab, setSelectedTab] = useState(currentTab || "/dashboard");

    const handleTabChange = (newValue: string) => {
        setSelectedTab(newValue);
        navigate(newValue);
    };

    useEffect(() => {
        if (currentTab !== selectedTab) {
            setSelectedTab(currentTab);
        }
    }, [currentTab, selectedTab]);

    return (
        <BodyContainer
            content={
                <Stack direction="row">
                    <Grid container>
                        <Grid item md={3}>
                            <BarangaySeal />
                            <Sidebar
                                tabs={dashboardTabs}
                                initialValue={selectedTab}
                                onChange={handleTabChange}
                            />
                        </Grid>
                        <Grid item md={9} xs={12}>
                            <MiniAppbar />
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
