import React from "react";
import { AppBar, Box, Toolbar, IconButton, Badge, Popover, Typography, Stack } from "@mui/material";

// import icons
import { Menu, AccountCircle, Notifications } from "@mui/icons-material/";

interface MiniAppbarProps {
    toggleSidebar: () => void;
}

const MiniAppbar: React.FC<MiniAppbarProps> = ({ toggleSidebar }) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

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
                        <IconButton onClick={handleClick}>
                            <AccountCircle sx={{ color: "primary.main", fontSize: "28px" }} />
                        </IconButton>
                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                        >
                            <Stack direction="row"></Stack>
                        </Popover>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default MiniAppbar;
