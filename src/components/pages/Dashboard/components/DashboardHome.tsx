import React from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Typography, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

// import components
import DashboardCard from "../../../cards/DashboardCard";
import MenuCard from "../../../cards/MenuCard";

const DashboardHome = () => {
    const navigate = useNavigate();

    // logged in user details
    const userDetail = useSelector((state: RootState) => state.auth.user);

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    return (
        <Stack rowGap={3}>
            <Typography variant="h2">DASHBOARD</Typography>
            <DashboardCard
                padding="30px 20px"
                content={
                    <Typography variant="h3" textAlign="center">
                        <Grid container spacing={3} justifyContent="center" alignItems="center">
                            <Grid item>
                                <MenuCard
                                    cardImage="src/assets/blogging.png"
                                    imgWidth="130px"
                                    content={
                                        <Typography variant="subtitle1" textAlign="center">
                                            PUBLICATION
                                        </Typography>
                                    }
                                    onClick={() => handleNavigation("/publication")}
                                />
                            </Grid>
                            <Grid item>
                                <MenuCard
                                    cardImage="src/assets/announcements.png"
                                    imgWidth="110px"
                                    content={
                                        <Typography variant="subtitle1" textAlign="center">
                                            ANNOUNCEMENT
                                        </Typography>
                                    }
                                    onClick={() => handleNavigation("/announcement")}
                                />
                            </Grid>
                            {/* <Grid item>
                <MenuCard
                  cardImage="src/assets/folder_files.png"
                  imgWidth="120px"
                  content={
                    <Typography variant="subtitle1" textAlign="center">
                      FILES
                    </Typography>
                  }
                  onClick={() => handleNavigation("/sk-files")}
                />
              </Grid> */}
                            <Grid item>
                                <MenuCard
                                    cardImage="src/assets/activities.png"
                                    imgWidth="120px"
                                    content={
                                        <Typography variant="subtitle1" textAlign="center">
                                            ACTIVITIES
                                        </Typography>
                                    }
                                    onClick={() => handleNavigation("/activities")}
                                />
                            </Grid>

                            {/* {userDetail.role === "Super Admin" ||
              userDetail.role === "Federation" ? (
                <Grid item>
                  <MenuCard
                    cardImage="src/assets/profile.png"
                    imgWidth="110px"
                    content={
                      <Typography
                        variant="h5"
                        lineHeight="18px"
                        textAlign="center"
                        fontWeight="400"
                      >
                        SK BARANGAY SYSTEM
                      </Typography>
                    }
                    onClick={() => handleNavigation("/sk-system")}
                  />
                </Grid>
              ) : null} */}

                            {/* {userDetail.role === "Chairperson" ? (
                <Grid item>
                  <MenuCard
                    cardImage="src/assets/kk-profiling.png"
                    imgWidth="110px"
                    content={
                      <Typography
                        variant="h5"
                        lineHeight="18px"
                        textAlign="center"
                        fontWeight="400"
                      >
                        KK PROFILING
                      </Typography>
                    }
                    onClick={() => handleNavigation("/profiling")}
                  />
                </Grid>
              ) : null} */}
                        </Grid>
                    </Typography>
                }
            />
        </Stack>
    );
};

export default DashboardHome;
