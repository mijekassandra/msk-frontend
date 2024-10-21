import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, Box, Typography, Stack, IconButton, Drawer } from "@mui/material";

// import components
import BarangaySeal from "./containers/BarangaySeal";

interface TabItemProps {
    tab: string;
    label: string;
    icon: React.ReactElement;
}

interface SidebarProps {
    tabs: TabItemProps[];
    initialValue: string;
    onChange?: (value: string) => void;
    disableNavigate?: true;
    height?: string;
    mobileView?: {
        isShow: boolean;
        action: () => void;
    };
}

const Sidebar: React.FC<SidebarProps> = ({
    tabs,
    initialValue,
    height,
    onChange,
    disableNavigate,
    mobileView,
}) => {
    const navigate = useNavigate();

    const [tabValue, setTabValue] = useState("");

    const handleChange = (newValue: string) => {
        setTabValue(newValue);
        if (onChange) {
            onChange(newValue);
            !disableNavigate && navigate(newValue);
        }
    };

    useEffect(() => {
        setTabValue(initialValue);
        console.log(tabValue);
    }, [initialValue]);

    const tabList = () => (
        <Stack spacing={0}>
            {tabs.map((tab) => (
                <Box
                    key={tab.tab}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        padding: "3px 5px",
                        backgroundColor: tabValue === tab.tab ? "white" : "transparent",
                        borderRadius: "4px",
                        transition: "background-color 0.3s",
                        "&:hover": {
                            backgroundColor:
                                tabValue === tab.tab ? "white" : "rgba(255, 255, 255, 0.5)",
                        },
                    }}
                    onClick={() => handleChange(tab.tab)}
                >
                    <IconButton
                        sx={{
                            color: tabValue === tab.tab ? "primary.main" : "white",
                        }}
                    >
                        {tab.icon}
                    </IconButton>
                    <Typography
                        variant="h5"
                        sx={{
                            marginLeft: "10px",
                            color: tabValue === tab.tab ? "#030A59" : "white",
                        }}
                    >
                        {tab.label}
                    </Typography>
                </Box>
            ))}
        </Stack>
    );

    return (
        <Paper
            elevation={0}
            sx={{
                height: height || "100vh",
                borderRadius: "0px",
                background: "#030A59",
                paddingBlock: "0 20px",
                display: { md: "grid", xs: "none" },
                gap: "12px",
                alignContent: "flex-start",
                width: "100%",
            }}
        >
            {mobileView?.isShow ? (
                <Drawer
                    open={mobileView?.isShow}
                    onClose={mobileView?.action}
                    sx={{
                        display: mobileView?.isShow ? "flex" : "none",
                    }}
                >
                    <Stack
                        spacing={2}
                        sx={{ width: "280px", background: "#030A59", height: "100%" }}
                    >
                        <BarangaySeal />
                        {tabList()}
                    </Stack>
                </Drawer>
            ) : (
                <>
                    <BarangaySeal />
                    {tabList()}
                </>
            )}
        </Paper>
    );
};

export default Sidebar;
