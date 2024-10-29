import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../store";

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

// import components
import LoadingDisplay from "./displays/LoadingDisplay";

// import apiSlices
import { logoutSuccess } from "../../slice/authSlice";
import { useLogoutMutation } from "../../slice/apiSlice";
import { userApi } from "./pages/Admin/api/userApi";
import { resetAdminState } from "../../slice/adminSlice";

interface MiniAppbarProps {
    toggleSidebar: () => void;
}

const { VITE_FILE_ENDPOINT } = import.meta.env;

const MiniAppbar: React.FC<MiniAppbarProps> = ({ toggleSidebar }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [logout, { isLoading }] = useLogoutMutation();

    // authenticiation
    const userDetail = useSelector((state: RootState) => state.auth.user);

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
        null
    );

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    // Handle navigation for "Manage Profile" and "Account Setting"
    const handleNavigation = (path: string) => {
        navigate(path);
        handleClose();
    };

    // Handle Logout
    const handleLogout = async () => {
        try {
            await logout().unwrap(); // Perform the logout request
            dispatch(logoutSuccess()); // Clear the token from Redux state
            dispatch(userApi.util.resetApiState()); // Clear all RTK Query caches to remove stale data
            dispatch(resetAdminState()); // Clear Admin state

            // redirect back 2 logout
            navigate("/");
            handleClose();
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

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
                        <Badge
                            badgeContent={5}
                            color="error"
                            overlap="circular"
                        >
                            <Notifications
                                sx={{ color: "primary.main", fontSize: "28px" }}
                            />
                        </Badge>
                        <IconButton onClick={handleClick}>
                            <AccountCircle
                                sx={{ color: "primary.main", fontSize: "28px" }}
                            />
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
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    sx={{ padding: "10px" }}
                                >
                                    <Avatar
                                        src={
                                            userDetail?.profile_img
                                                ? `${VITE_FILE_ENDPOINT}${userDetail.profile_img}`
                                                : undefined
                                        }
                                        sx={{ width: 40, height: 40 }}
                                    >
                                        {!userDetail?.profile_img && (
                                            <Person sx={{ fontSize: "30px" }} />
                                        )}
                                    </Avatar>
                                    <Stack>
                                        <Typography variant="h5">
                                            {userDetail?.first_name ||
                                            userDetail?.last_name
                                                ? `${userDetail.first_name} ${userDetail.last_name}`
                                                : "User"}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            color="gray"
                                        >
                                            {userDetail?.role}
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
                                        onClick={() =>
                                            handleNavigation("/manage-profile")
                                        }
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
                                        onClick={() =>
                                            handleNavigation(
                                                "/account-settings"
                                            )
                                        }
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
                                        onClick={() => handleLogout()}
                                    >
                                        <Logout fontSize="small" />
                                        <Typography>Logout</Typography>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Popover>
                    </Box>
                </Toolbar>

                <LoadingDisplay open={isLoading} />
            </AppBar>
        </Box>
    );
};

export default MiniAppbar;
