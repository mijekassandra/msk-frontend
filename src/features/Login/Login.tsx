import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../slice/authSlice";
import { userProfile } from "../../components/pages/Settings/components/api/userProfileApi";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

import {
    Stack,
    Card,
    CardMedia,
    CardHeader,
    TextField,
    Typography,
    InputAdornment,
    IconButton,
} from "@mui/material";
import { Person, Lock, Visibility, VisibilityOff } from "@mui/icons-material";

// import images
import BackgroundImage from "../../assets/login_bg.jpg";
import SKLogo from "../../assets/Sangguniang_Kabataan_logo.jpg";

// import components
import PrimaryButton from "../../components/buttons/PrimaryButton";
import BodyContainer from "../../components/containers/BodyContainer";

// import apiSlices
import { useLoginMutation } from "../../../slice/apiSlice";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [login, { isLoading }] = useLoginMutation(); // Use RTK Query mutation

    // logged in user details
    const userDetail = useSelector((state: RootState) => state.auth.user);

    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [errorDisplay, setErrorDisplay] = useState("");

    const handleLogin = async () => {
        if (!username || !password) {
            setUsernameError(!username);
            setPasswordError(!password);
            return;
        }

        try {
            const response = await login({ username, password }).unwrap();

            // Dispatch the loginSuccess action with the appropriate payload
            dispatch(
                loginSuccess({
                    token: response.token,
                    data: response.data,
                    message: response.message,
                })
            );

            // Invalidate the "User" tag to refetch or clear cached user-related data
            dispatch(userProfile.util.invalidateTags(["UserProfile"]));

            // Delay navigation to ensure that userDetail is updated
            setTimeout(() => {
                const role = response.data?.role || userDetail?.role; // Ensure role is available

                if (
                    role === "Super Admin" ||
                    role === "Federation" ||
                    role === "Chairperson"
                ) {
                    navigate("/dashboard");
                } else {
                    navigate("/home");
                }
            }, 100); // Small delay to ensure state update
        } catch (error) {
            const typedError = error as {
                data: { status: string; message: string; error?: any };
            };

            const errorMessage =
                typedError?.data?.message || "An unexpected error occurred";
            setErrorDisplay(errorMessage);

            // Clear error message after 5 seconds
            setTimeout(() => {
                setErrorDisplay("");
            }, 5000);
        }
    };

    // useEffect(() => {
    //     console.log("Updated user detail: ", userDetail);
    // }, [userDetail]);

    return (
        <BodyContainer
            background={BackgroundImage}
            flexDirection="flex"
            justifyContent="center"
            alignItems="center"
            content={
                <Stack
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Card
                        sx={{
                            maxWidth: {
                                sm: "450px",
                                xs: "300px",
                            },
                            padding: "15px 25px 30px 25px",
                            borderRadius: "8px",
                        }}
                    >
                        <Stack
                            sx={{
                                display: "flex",
                            }}
                        >
                            <CardMedia
                                component="img"
                                image={SKLogo}
                                sx={{
                                    width: "110px",
                                    margin: "0 auto",
                                }}
                            />
                            <CardHeader
                                title={
                                    <Typography variant="h4" textAlign="center">
                                        Municipal Sangguniang Kabataan
                                        Management System - Federation
                                    </Typography>
                                }
                            />
                            <Stack
                                sx={{
                                    display: "flex",
                                    gap: "20px",
                                    marginBottom: "10px",
                                }}
                            >
                                <TextField
                                    label="username"
                                    variant="outlined"
                                    value={username}
                                    onChange={(e) => {
                                        setUsernameError(false);
                                        setUsername(e.target.value);
                                    }}
                                    error={usernameError}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Person />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    label="password"
                                    variant="outlined"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => {
                                        setPasswordError(false);
                                        setPassword(e.target.value);
                                    }}
                                    error={passwordError}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Lock />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() =>
                                                        setShowPassword(
                                                            (show) => !show
                                                        )
                                                    }
                                                    edge="end"
                                                >
                                                    {showPassword ? (
                                                        <VisibilityOff />
                                                    ) : (
                                                        <Visibility />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Stack>

                            {errorDisplay && (
                                <Typography
                                    variant="caption"
                                    textAlign="right"
                                    color="error.main"
                                >
                                    {errorDisplay}
                                </Typography>
                            )}
                            <Typography variant="body1" textAlign="center">
                                Forgot Password?
                            </Typography>
                            <Stack sx={{ marginTop: "25px" }}>
                                <PrimaryButton
                                    size="large"
                                    onClick={handleLogin}
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Logging in..." : "LOGIN"}
                                </PrimaryButton>
                            </Stack>
                        </Stack>
                    </Card>
                </Stack>
            }
        ></BodyContainer>
    );
};

export default Login;
