import React from "react";
import {
  Stack,
  Card,
  CardMedia,
  CardHeader,
  TextField,
  Typography,
} from "@mui/material";

// import images
import BackgroundImage from "./assets/sample-bg.jpg";
import SKLogo from "./assets/Sangguniang_Kabataan_logo.jpg";

// import components
import PrimaryButton from "./components/buttons/PrimaryButton";
import BodyContainer from "./components/containers/BodyContainer";

const Login = () => {
  return (
    <BodyContainer
      background={BackgroundImage}
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
              maxWidth: "450px",
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
                  gap: "15px",
                  marginBottom: "10px",
                }}
              >
                <TextField
                  id="outlined-basic"
                  label="Username"
                  variant="outlined"
                />
                <TextField
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
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
                <PrimaryButton size="large">LOGIN</PrimaryButton>
              </Stack>
            </Stack>
          </Card>
        </Stack>
      }
    ></BodyContainer>
  );
};

export default Login;
