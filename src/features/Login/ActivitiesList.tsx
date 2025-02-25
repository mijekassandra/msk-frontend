import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Button, Pagination } from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";
import { formatDate } from "../../utils/dateUtil.ts";
import NoImage from "/src/assets/no-image.png";
import { useSelector } from "react-redux";
import { RootState } from "../../store.ts";

// import components
import LogoHeader from "../../components/displays/LogoHeader";
import LoadingDisplay from "../../components/displays/LoadingDisplay";
import ErrorDisplay from "../../components/displays/ErrorDisplay";
import ActivitiesCard from "../../components/cards/ActivitiesCard.js";
import EmptyDisplay from "../../components/displays/EmptyDisplay.js";
import SearchInput from "../../components/displays/SearchInput.tsx";
import FeedbackActivity from "../../components/pages/UserFeatures/Home/FeedbackActivity.tsx";
import ActivityCommentList from "../../components/pages/UserFeatures/Home/ActivityCommentList.tsx";

// api
import { useGetActivtiesQuery } from "../../components/pages/Activities/api/activityApi.tsx";
import { useGetAllAttendanceQuery } from "../../components/pages/Settings/components/api/attendanceApi.tsx";

// file endpoint
const { VITE_FILE_ENDPOINT } = import.meta.env;
const ITEMS_PER_PAGE = 3;

const ActivitiesList = () => {
  const navigate = useNavigate();

  // logged in user role
  const userDetail = useSelector((state: RootState) => state.auth.user);

  // State to handle active modal
  const [activeModal, setActiveModal] = useState<null | {
    name: string;
    data?: any;
  }>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: allActivities = [],
    isError: allActivitiesError,
    isLoading: allActivitiesLoading,
    isFetching,
    refetch,
  } = useGetActivtiesQuery();

  const { data: allAttendance = [] } = useGetAllAttendanceQuery();

  // Step 1: Filter publications for published status
  const publishedActivities = allActivities.filter(
    (activity) => activity.status === "published"
  );

  // Step 2: Sort the filtered publications by date (latest first)
  const sortedActivities = [...publishedActivities].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  //! Filter activities based on search query
  const filteredActivities = sortedActivities.filter((activity) =>
    activity.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Step 3: Paginate the filtered and sorted publications
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedActivities = filteredActivities.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Calculate total number of pages based on the filtered and sorted publications
  const totalPages = Math.ceil(filteredActivities.length / ITEMS_PER_PAGE);

  const openModal = (modalName: string, data?: any) => {
    setActiveModal({ name: modalName, data });
  };

  const closeModal = () => {
    setActiveModal(null); // Close the active modal
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const handleFeedbackClick = (activityID: number) => {
    openModal("feedbackForm", { activityID });
  };

  const handleCommentsClick = (activityID: number) => {
    openModal("commentForm", { activityID });
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  //! Search function to update search query and reset pagination
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page on new search
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <Stack gap={2}>
      <LogoHeader header="SK ACTIVITIES" />
      <Stack
        direction="row"
        sx={{ alignItems: "center", justifyContent: "space-between" }}
      >
        <Button
          onClick={() => handleNavigation("/dashboard")}
          sx={{ paddingInline: "20px" }}
          startIcon={<ArrowBackIos />}
        >
          BACK TO DASHBOARD
        </Button>
        <Stack
          direction="row"
          justifyContent="flex-end"
          marginBlock={1}
          marginLeft={1}
        >
          <SearchInput
            placeholder="Search activity title"
            onSearch={handleSearch}
          />
        </Stack>
      </Stack>

      {/* Show EmptyDisplay if there are no activities */}
      {!allActivitiesLoading &&
        !isFetching &&
        !allActivitiesError &&
        paginatedActivities.length === 0 && (
          <EmptyDisplay label="No activity content found" />
        )}
      {!allActivitiesLoading &&
        !isFetching &&
        !allActivitiesError &&
        paginatedActivities.length > 0 && (
          <Stack gap={5}>
            {paginatedActivities.map((activity) => {
              const filteredAttendance = allAttendance.filter(
                (attendee: any) =>
                  Number(attendee.activity_id) === Number(activity.id)
              );
              return (
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
                  activityID={activity.id}
                  onFeedbackClick={() => handleFeedbackClick(activity.id)}
                  onCommentsClick={() => handleCommentsClick(activity.id)}
                  attendanceData={filteredAttendance}
                />
              );
            })}
          </Stack>
        )}

      {/* Feedback Form Modal */}
      {activeModal?.name === "feedbackForm" && (
        <FeedbackActivity
          onClose={closeModal}
          activityID={activeModal.data.activityID}
          userDetail={userDetail}
        />
      )}

      {/* Comments List Modal */}
      {activeModal?.name === "commentForm" && (
        <ActivityCommentList
          onClose={closeModal}
          activityID={activeModal.data.activityID}
        />
      )}

      {allActivitiesError && <ErrorDisplay />}
      {(allActivitiesLoading || isFetching) && <LoadingDisplay open={true} />}

      {/* Pagination controls */}
      {sortedActivities.length > 0 && (
        <Stack
          direction="row"
          justifyContent="center"
          sx={{ marginTop: "20px" }}
        >
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="large"
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      )}
    </Stack>
  );
};

export default ActivitiesList;
