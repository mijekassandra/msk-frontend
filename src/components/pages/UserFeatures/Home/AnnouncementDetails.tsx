import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Stack, Typography, CircularProgress, IconButton } from "@mui/material";
import { formatDate } from "../../../../utils/dateUtil";
import NoImage from "/src/assets/no-image.png";
import { ArrowBack } from "@mui/icons-material";
import Void from "/src/assets/void.png";

// file endpoint
const { VITE_FILE_ENDPOINT } = import.meta.env;

// import components
import AnnouncementCard from "../../../cards/AnnouncementCard";

// import api
import { useGetAnnouncementByIDQuery } from "../../Announcement/api/announcementApi.tsx";

const AnnouncementDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();
    const { announcement: stateAnnouncement } = location.state || {};

    //! Fetch announcement data dynamically if not provided via location.state
    const { data: fetchedAnnouncement, isLoading } =
        useGetAnnouncementByIDQuery(id, {
            skip: !!stateAnnouncement, // Skip fetching if exists
        });

    const announcement = stateAnnouncement || fetchedAnnouncement;

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    return (
        <Stack gap={2}>
            <Stack direction="row" gap={1}>
                <IconButton
                    aria-label="back"
                    size="small"
                    onClick={() => handleNavigation("/dashboard")}
                >
                    <ArrowBack />
                </IconButton>

                <Typography variant="h2" textTransform="capitalize">
                    Announcement
                </Typography>
            </Stack>

            <Stack>
                {/* Show Loading Spinner */}
                {isLoading ? (
                    <Stack
                        justifyContent="center"
                        alignItems="center"
                        height="300px"
                        gap={2}
                    >
                        <CircularProgress />
                        <Typography variant="subtitle1">
                            Loading Activity Details...
                        </Typography>
                    </Stack>
                ) : announcement && announcement.status === "published" ? (
                    // Render Announcement Card
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
                        <img src={Void} width="150px" alt="No comment" />
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
