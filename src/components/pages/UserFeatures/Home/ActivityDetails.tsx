import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Stack, Typography, CircularProgress, IconButton } from "@mui/material";
import { formatDate } from "../../../../utils/dateUtil.ts";
import NoImage from "/src/assets/no-image.png";
import { ArrowBack } from "@mui/icons-material";

//import component
import ActivitiesCard from "../../../cards/ActivitiesCard.tsx";

// file endpoint
const { VITE_FILE_ENDPOINT } = import.meta.env;

// import api
import { useGetActivityByIDQuery } from "../../Activities/api/activityApi.tsx";

const ActivityDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get the publication ID from the URL
    const location = useLocation();
    const { activity: stateActivity } = location.state || {}; // Get publication data from the navigation state

    //! Fetch publication data dynamically if not provided via location.state
    const { data: fetchedActivity, isLoading } = useGetActivityByIDQuery(id, {
        skip: !!stateActivity, // Skip fetching if stateActivity exists
    });

    const activity = stateActivity || fetchedActivity;

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
                    Activity
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
                ) : activity && activity.status === "published" ? (
                    /* Render Activity Card */
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
                    /* Show Not Found/Error Message */
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
