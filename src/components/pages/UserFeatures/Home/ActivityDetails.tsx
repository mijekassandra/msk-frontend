import { useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Stack, Typography, Button, CircularProgress } from "@mui/material";
import { formatDate } from "../../../../utils/dateUtil.ts";
import NoImage from "../../../../assets/no-image.png";
import { ArrowBackIos } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store.ts";

//import component
import ActivitiesCard from "../../../cards/ActivitiesCard.tsx";

// file endpoint
const { VITE_FILE_ENDPOINT } = import.meta.env;

const ActivityDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get the publication ID from the URL
    const location = useLocation();
    const { activity } = location.state || {}; // Get publication data from the navigation state

    const userDetail = useSelector((state: RootState) => state.auth.user);

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    console.log("activity", activity);

    return (
        <Stack gap={2}>
            <Stack sx={{ alignItems: "flex-end" }}>
                <Button
                    onClick={() =>
                        userDetail.role === "Federation" ||
                        userDetail.role === "Chairperson"
                            ? handleNavigation("/dashboard")
                            : userDetail.role === "User"
                            ? handleNavigation("/home")
                            : null
                    }
                    sx={{ paddingInline: "20px" }}
                    startIcon={<ArrowBackIos />}
                >
                    BACK TO DASHBOARD
                </Button>
            </Stack>

            <Stack>
                {activity ? (
                    <ActivitiesCard
                        key={activity.id}
                        barangay={
                            activity.type !== "Federation"
                                ? activity.barangay
                                : "Federation"
                        }
                        date={formatDate(activity.created_at)}
                        cardImage={
                            activity.attachment
                                ? VITE_FILE_ENDPOINT + activity.attachment
                                : NoImage
                        }
                        title={activity.title}
                        content={activity.content}
                        type={activity.type}
                        location={activity.location}
                        date_of_activity={formatDate(activity.date_of_activity)}
                    />
                ) : (
                    <Stack
                        justifyContent="center"
                        alignItems="center"
                        height="300px"
                        gap={1}
                    >
                        <img
                            src="\src\assets\void.png"
                            width="150px"
                            alt="No comment"
                        />
                        <Typography
                            variant="h4"
                            fontWeight={500}
                            align="center"
                        >
                            Activity not Found
                        </Typography>
                        <Typography variant="subtitle1" align="center">
                            This activity post is no longer available. It may
                            have been removed or archived.
                        </Typography>
                    </Stack>
                )}
            </Stack>
        </Stack>
    );
};

export default ActivityDetails;
