import React from "react";
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Badge,
    Popover,
    Typography,
    Stack,
    Avatar,
    Divider,
} from "@mui/material";

// import icons
import {
    Menu,
    AccountCircle,
    Notifications,
    Person,
    AccountBox,
    Settings,
    Logout,
} from "@mui/icons-material/";

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
                                horizontal: "right",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                        >
                            <Stack direction="column" sx={{ width: "200px" }}>
                                <Stack direction="row" spacing={1} sx={{ padding: "10px" }}>
                                    <Avatar>
                                        <Person sx={{ fontSize: "30px" }} />
                                    </Avatar>
                                    <Stack>
                                        <Typography variant="h5">John Doe</Typography>
                                        <Typography variant="caption" color="gray">
                                            Super Admin
                                        </Typography>
                                    </Stack>
                                </Stack>
                                <Divider />
                                <Stack direction="column" paddingBlock={0.5}>
                                    <Stack
                                        direction="row"
                                        spacing={1.5}
                                        alignItems="center"
                                        sx={{
                                            padding: "7px 10px",
                                            cursor: "pointer",
                                            "&:hover": {
                                                backgroundColor: "#f0f0f0",
                                                borderRadius: "5px",
                                            },
                                        }}
                                    >
                                        <AccountBox fontSize="small" />
                                        <Typography>Manage Profile</Typography>
                                    </Stack>
                                    <Stack
                                        direction="row"
                                        spacing={1.5}
                                        alignItems="center"
                                        sx={{
                                            padding: "7px 10px",
                                            cursor: "pointer",
                                            "&:hover": {
                                                backgroundColor: "#f0f0f0",
                                                borderRadius: "5px",
                                            },
                                        }}
                                    >
                                        <Settings fontSize="small" />
                                        <Typography>Account Setting</Typography>
                                    </Stack>
                                    <Stack
                                        direction="row"
                                        spacing={1.5}
                                        alignItems="center"
                                        sx={{
                                            padding: "7px 10px",

                                            cursor: "pointer",
                                            "&:hover": {
                                                backgroundColor: "#f0f0f0",
                                                borderRadius: "5px",
                                            },
                                        }}
                                    >
                                        <Logout fontSize="small" />
                                        <Typography>Logout</Typography>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Popover>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default MiniAppbar;
