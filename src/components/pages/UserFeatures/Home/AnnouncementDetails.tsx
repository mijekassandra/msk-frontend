import { useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Stack, Typography, Button, CircularProgress } from "@mui/material";
import { formatDate } from "../../../../utils/dateUtil";
import NoImage from "../../../../assets/no-image.png";
import { ArrowBackIos } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store.ts";

// file endpoint
const { VITE_FILE_ENDPOINT } = import.meta.env;

//import components
import AnnouncementCard from "../../../cards/AnnouncementCard";

const AnnouncementDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get the publication ID from the URL
    const location = useLocation();
    const { announcement } = location.state || {}; // Get publication data from the navigation state

    const userDetail = useSelector((state: RootState) => state.auth.user);

    const handleNavigation = (path: string) => {
        navigate(path);
    };

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
                {announcement ? (
                    <AnnouncementCard
                        key={announcement.id}
                        barangay={
                            announcement.type !== "Federation"
                                ? announcement.barangay
                                : "Federation"
                        }
                        date={formatDate(announcement.created_at)}
                        cardImage={
                            announcement.attachment
                                ? VITE_FILE_ENDPOINT + announcement.attachment
                                : NoImage
                        }
                        title={announcement.title}
                        content={announcement.content}
                        type={announcement.type}
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
                            Announcement not Found
                        </Typography>
                        <Typography variant="subtitle1" align="center">
                            This Announcement post is no longer available. It
                            may have been removed or archived.
                        </Typography>
                    </Stack>
                )}
            </Stack>
        </Stack>
    );
};

export default AnnouncementDetails;
