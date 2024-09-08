import { ReactNode, useEffect, useState } from "react";
import { Paper, Box, Typography, Stack, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
}

const Sidebar: React.FC<SidebarProps> = ({
    tabs,
    initialValue,
    height,
    onChange,
    disableNavigate,
}) => {
    const navigate = useNavigate();
    const [tabValue, setTabValue] = useState("");

    useEffect(() => {
        if (initialValue) {
            setTabValue(initialValue);
        }
    }, [initialValue]);

    const handleChange = (newValue: string) => {
        setTabValue(newValue);
        if (onChange) {
            onChange(newValue);
            !disableNavigate && navigate(newValue);
        }
    };

    useEffect(() => {
        setTabValue(initialValue);
    }, [initialValue]);

    const tabList = () => {
        return (
            <Stack spacing={0}>
                {tabs.map((tab) => (
                    <Box
                        key={tab.tab}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                            padding: "3px 5px ",
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
    };

    return (
        <Paper
            elevation={0}
            sx={{
                height: height ? height : "777.25px",
                borderRadius: "0px",
                background: "#030A59",
                paddingBlock: "20px",
                display: { md: "grid", xs: "none" },
                gap: "12px",
                alignContent: "flex-start",
            }}
        >
            {tabList()}
        </Paper>
    );
};

export default Sidebar;
