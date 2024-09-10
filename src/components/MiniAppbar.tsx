import React from "react";
import { AppBar, Box, Toolbar, IconButton, Badge } from "@mui/material";

import { Menu, AccountCircle, Notifications } from "@mui/icons-material/";

interface MiniAppbarProps {
    toggleSidebar: () => void;
}

const MiniAppbar: React.FC<MiniAppbarProps> = ({ toggleSidebar }) => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="static"
                sx={{
                    background: "#FBD11D",
                }}
            >
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <IconButton
                        size="large"
                        edge="start"
                        aria-label="menu"
                        sx={{ mr: 2, color: "primary.main" }}
                        onClick={toggleSidebar}
                    >
                        <Menu />
                    </IconButton>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        {" "}
                        <Badge badgeContent={5} color="error" overlap="circular">
                            <Notifications sx={{ color: "primary.main", fontSize: "28px" }} />
                        </Badge>
                        <AccountCircle sx={{ color: "primary.main", fontSize: "28px" }} />
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default MiniAppbar;
