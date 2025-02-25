import React, { MouseEvent, useState } from "react";
import { Stack, Grid, Typography, Rating } from "@mui/material";
import { CalendarMonth, LocationOn, FormatQuote } from "@mui/icons-material/";
import { Barangays } from "../../mockData/Barangay";
import DefaultLogo from "/src/assets/SKFed.png";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import ModalImage from "../modals/ModalImage";
import PrimaryButton from "../buttons/PrimaryButton";

// api service
import { useGetAllFeedbacksByActivityIdQuery } from "../pages/Activities/api/activityCommentApi";

interface ActivitiesCardProps {
  barangay: string | null;
  date: string;
  cardImage: string;
  title: string;
  location?: string;
  mode?: string;
  selectedBarangay?: string | null;
  type?: string | null;
  date_of_activity: string;
  content?: string;
  activityID: number;
  attendanceData?: any[];

  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  onFeedbackClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  onCommentsClick?: (event: MouseEvent<HTMLDivElement>) => void;
}

const ActivitiesCard: React.FC<ActivitiesCardProps> = ({
  barangay,
  date,
  cardImage,
  title,
  location,
  date_of_activity,
  type,
  selectedBarangay,
  content,
  mode,
  activityID,
  onFeedbackClick,
  onCommentsClick,
  attendanceData = [],
}) => {
  // Fetch adminMode and selectedBarangay from the Redux store
  const adminMode = useSelector((state: RootState) => state.admin.adminMode);

  // logged in user role
  const userDetail = useSelector((state: RootState) => state.auth.user);

  // find the image for seal
  const matchingBarangay = !adminMode
    ? Barangays.find((b) => b.barangayName === barangay)
    : Barangays.find((b) => b.barangayName === selectedBarangay);

  //! Feedbacks
  const { data: feedbacks = [] } =
    useGetAllFeedbacksByActivityIdQuery(activityID);

  // Calculate feedback count based on fetched data
  const feedbackCount = Array.isArray(feedbacks) ? feedbacks.length : 0;

  const averageRating =
    Array.isArray(feedbacks) && feedbacks.length > 0
      ? feedbacks.reduce(
          (sum: number, feedback: any) => sum + feedback.rating,
          0
        ) / feedbacks.length
      : 0;

  //! Filter for which user can give feedback based on attendance

  // 🛠️ Check if the logged-in user attended the activity
  const userAttended = attendanceData.some(
    (attendee: any) => Number(attendee.account_id) === Number(userDetail.id)
  );

  //! Modal image
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Grid
      container
      gap={{ xs: 2, md: 4 }}
      justifyContent="space-between"
      sx={{
        borderRadius: "4px",
        border: "1px solid #CCCCCC",
        padding: "20px 30px 40px 30px",
        overflowY: "auto",
        maxHeight: "70vh",
        background: "#f9f9f9",
      }}
    >
      <Grid
        container
        item
        xs={12}
        sx={{
          xs: {
            gap: 2,
          },
        }}
      >
        <Grid item xs={12} md={6}>
          <Stack direction="row" gap={1.5}>
            <img
              src={
                type === "Federation"
                  ? DefaultLogo
                  : matchingBarangay?.logo
                  ? `${matchingBarangay.logo}`
                  : DefaultLogo
              }
              height="40px"
            />
            <Stack>
              <Typography variant="subtitle1">{barangay}</Typography>
              <Typography variant="body1" color={"gray"}>
                {date}
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6} sx={{ alignContent: "center" }}>
          <Typography
            variant="h3"
            fontWeight={600}
            textAlign={"center"}
            textTransform="uppercase"
          >
            {title}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        item
        md={5.5}
        sm={12}
        xs={12}
        sx={{
          display: "grid",
          alignContent: "flex-start",
          gap: "20px",
        }}
      >
        <Stack gap={2}>
          <img
            src={cardImage}
            height="200px"
            style={{
              borderRadius: "16px",
              objectFit: "cover",
              width: "100%",
              cursor: "pointer",
            }}
            onClick={handleOpen}
          />
          <ModalImage
            image={cardImage}
            altText="Card Image"
            open={open}
            onClose={handleClose}
          />
          {mode !== "view" ? (
            <Stack
              direction="column"
              gap={2}
              alignItems="center"
              justifyContent={"center"}
            >
              {userAttended && (
                <PrimaryButton
                  size="medium"
                  color="info"
                  width="200px"
                  onClick={onFeedbackClick}
                >
                  Provide Feedback
                </PrimaryButton>
              )}

              <Stack
                direction="row"
                alignItems="center"
                gap={6}
                justifyContent={"space-around"}
              >
                <Typography
                  variant="h5"
                  onClick={onCommentsClick}
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  {feedbackCount} {feedbackCount > 1 ? "comments" : "comment"}
                </Typography>

                <Rating name="read-only" readOnly value={averageRating} />
              </Stack>
            </Stack>
          ) : null}
        </Stack>
      </Grid>
      <Grid
        item
        sx={{
          display: "grid",
          alignContent: "flex-start",
          gap: 2,
        }}
        md={5.5}
        sm={12}
        xs={12}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <CalendarMonth />
          <Typography variant="h5" fontWeight={400} fontFamily="Poppins">
            {date_of_activity}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="start" spacing={1}>
          <LocationOn />
          <Typography variant="h5" fontWeight={400} fontFamily="Poppins">
            {location}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="start" spacing={1}>
          <FormatQuote />
          <Typography
            variant="h5"
            fontWeight={400}
            fontFamily="Poppins"
            whiteSpace="pre-line"
          >
            {content}
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default ActivitiesCard;
