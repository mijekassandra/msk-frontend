import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import BackgroundImage from "../assets/login_bg.jpg";
import SKLogo from "../assets/Sangguniang_Kabataan_logo.jpg";

// import components
import PrimaryButton from "../components/buttons/PrimaryButton";
import BodyContainer from "../components/containers/BodyContainer";

const Login = () => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

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
                                        Municipal Sangguniang Kabataan Management System -
                                        Federation
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
                                    id="outlined-basic"
                                    label="username"
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Person />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    id="outlined-basic"
                                    label="password"
                                    variant="outlined"
                                    type={showPassword ? "text" : "password"}
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
                                                    onClick={() => setShowPassword((show) => !show)}
                                                    // onMouseDown={handleMouseDownPassword}
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
                            <Typography variant="body1" textAlign="center">
                                Forgot Password?
                            </Typography>

                            <Stack
                                sx={{
                                    marginTop: "25px",
                                }}
                            >
                                <PrimaryButton size="large" onClick={() => navigate("/dashboard")}>
                                    LOGIN
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
