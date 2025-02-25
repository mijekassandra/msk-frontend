import { useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Stack, Typography, CircularProgress, IconButton } from "@mui/material";
import { formatDate } from "../../../../utils/dateUtil.ts";
import NoImage from "/src/assets/no-image.png";
import { ArrowBack } from "@mui/icons-material";
import Void from "/src/assets/void.png";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store.ts";

//import component
import ActivitiesCard from "../../../cards/ActivitiesCard.tsx";
import FeedbackActivity from "./FeedbackActivity.tsx";
import ActivityCommentList from "./ActivityCommentList.tsx";

// file endpoint
const { VITE_FILE_ENDPOINT } = import.meta.env;

// import api
import { useGetActivityByIDQuery } from "../../Activities/api/activityApi.tsx";

const ActivityDetails = () => {
  // logged in user role
  const userDetail = useSelector((state: RootState) => state.auth.user);

  const navigate = useNavigate();
  const { id } = useParams(); // Get the publication ID from the URL
  const location = useLocation();
  const { activity: stateActivity } = location.state || {};
  const [activeModal, setActiveModal] = useState<null | {
    name: string;
    data?: any;
  }>(null); // State to handle active modal

  //! Fetch publication data dynamically if not provided via location.state
  const { data: fetchedActivity, isLoading } = useGetActivityByIDQuery(id, {
    skip: !!stateActivity, // Skip fetching if stateActivity exists
  });

  const activity = stateActivity || fetchedActivity;

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const openModal = (modalName: string, data?: any) => {
    setActiveModal({ name: modalName, data });
  };

  const closeModal = () => {
    setActiveModal(null); // Close the active modal
  };

  // Handle Feedback click
  const handleFeedbackClick = () => {
    openModal("feedbackForm");
  };

  // Handle Comments click
  const handleCommentsClick = () => {
    openModal("commentForm", { comments: activity.comments });
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
              activity.type !== "Federation" ? activity.barangay : "Federation"
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
            // comments={5}
            // rating={5}
            onFeedbackClick={handleFeedbackClick}
            onCommentsClick={handleCommentsClick}
            activityID={activity.id}
          />
        ) : (
          /* Show Not Found/Error Message */
          <Stack
            justifyContent="center"
            alignItems="center"
            height="300px"
            gap={1}
          >
            <img src={Void} width="150px" alt="No comment" />
            <Typography variant="h4" fontWeight={500} align="center">
              Activity not Found
            </Typography>
            <Typography variant="subtitle1" align="center">
              This activity post is no longer available. It may have been
              removed or archived.
            </Typography>
          </Stack>
        )}
      </Stack>

      {/* Feedback Form Modal */}
      {activeModal?.name === "feedbackForm" && (
        <FeedbackActivity
          onClose={closeModal}
          activityID={activity.id}
          userDetail={userDetail}
        />
      )}

      {/* Comments List Modal */}
      {activeModal?.name === "commentForm" && (
        <ActivityCommentList onClose={closeModal} activityID={activity.id} />
      )}
    </Stack>
  );
};

export default ActivityDetails;
