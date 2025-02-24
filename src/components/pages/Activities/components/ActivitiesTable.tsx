import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import {
  Visibility,
  BorderColor,
  AddCircle,
  AssignmentInd,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { formatDateTime } from "../../../../utils/dateTimeUtil";

// import components
import CustomDataGrid from "../../../layout/CustomDataGrid";
import PrimaryButton from "../../../buttons/PrimaryButton";
import CreateNewActivity from "./CreateNewActivity";
import ErrorDisplay from "../../../displays/ErrorDisplay";
import LoadingDisplay from "../../../displays/LoadingDisplay";

// import apiSlices
import {
  useGetActivtiesQuery,
  useAddActivityMutation,
  useEditActivityMutation,
} from "../api/activityApi";
import AttendanceMonitoring from "./AttendanceMonitoring";

const ActivitiesTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit" | "view">(
    "create"
  ); // for modal mode, either create or edit
  const [currentActivity, setCurrentActivity] = useState({}); // for edit modal

  // logged in user role
  const userDetail = useSelector((state: RootState) => state.auth.user);

  // Fetch adminMode and selectedBarangay from the Redux store
  const adminMode = useSelector((state: RootState) => state.admin.adminMode);
  const selectedBarangay = useSelector(
    (state: RootState) => state.admin.selectedBarangay
  );

  // For attendance monitoring
  const [isAttendanceOpen, setIsAttendanceOpen] = useState(false);
  const [currentActivityId, setCurrentActivityId] = useState<number | null>(
    null
  );

  const {
    data: allActivities = [],
    isError: allActivitiesError,
    isSuccess: allActivitiesSuccess,
    isLoading: allActivitiesLoading,
  } = useGetActivtiesQuery();

  const [addActivity] = useAddActivityMutation();
  const [editActivity] = useEditActivityMutation();

  const handleAddActivityClick = () => {
    setModalMode("create");
    setCurrentActivity({});
    setIsModalOpen(true);
  };

  const handleEditActivityClick = (activity: any) => {
    setModalMode("edit");
    setCurrentActivity(activity);
    setIsModalOpen(true);
  };

  const handleViewActivityClick = (activity: any) => {
    setModalMode("view");
    setCurrentActivity(activity);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAttendanceClick = (activityId: number) => {
    setCurrentActivityId(activityId);
    setIsAttendanceOpen(true);
    console.log("Attendance Modal Opened for Activity ID:", activityId);
  };

  const handleCloseAttendance = () => {
    setIsAttendanceOpen(false);
    setCurrentActivityId(null); // Reset when modal closes
  };

  //   Filter activities based on user role (Super Admin, Federation)
  const filteredRows = React.useMemo(() => {
    if (adminMode && selectedBarangay) {
      return allActivities.filter(
        (activity) =>
          activity.barangay === selectedBarangay &&
          activity.type !== "Federation"
      );
    } else if (userDetail.role === "Chairperson") {
      return allActivities.filter(
        (activity) =>
          activity.barangay === userDetail.barangay &&
          activity.type !== "Federation"
      );
    } else if (userDetail.role === "Federation") {
      return allActivities.filter(
        (activity) =>
          activity.barangay === userDetail.barangay &&
          activity.type !== "Chairperson"
      );
    }

    return allActivities;
  }, [allActivities, userDetail?.role]);

  const columns = [
    {
      field: "title",
      headerName: "Title",
      minWidth: 300,
      flex: 1,
    },
    { field: "type", headerName: "Type", maxWidth: 120, flex: 1 },
    { field: "status", headerName: "Status", maxWidth: 110, flex: 1 },
    {
      field: "created_at",
      headerName: "Date Publish",
      maxWidth: 160,
      valueFormatter: (params: any) => formatDateTime(params),
    },
    {
      field: "updated_at",
      headerName: "Date Updated",
      maxWidth: 160,
      valueFormatter: (params: any) => formatDateTime(params),
    },
    {
      field: "action",
      headerName: "Action",
      maxWidth: 160,
      renderCell: (params: any) => (
        <Box>
          <IconButton
            aria-label="view"
            onClick={() => handleViewActivityClick(params.row)}
          >
            <Visibility
              sx={{
                color: "primary.dark",
                fontSize: "22px",
              }}
            />
          </IconButton>
          {!adminMode &&
          !selectedBarangay &&
          userDetail?.role !== "Super Admin" ? (
            <>
              <IconButton
                aria-label="edit"
                onClick={() => handleEditActivityClick(params.row)}
              >
                <BorderColor
                  sx={{
                    color: "secondary.light",
                    fontSize: "22px",
                  }}
                />
              </IconButton>
            </>
          ) : null}
          <IconButton
            aria-label="edit"
            onClick={() => handleAttendanceClick(params.row.id)}
          >
            <AssignmentInd
              sx={{
                color: "error.main",
                fontSize: "22px",
              }}
            />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <>
      {allActivitiesSuccess ? (
        <CustomDataGrid
          rows={filteredRows}
          columns={columns}
          getRowId={(row: any) => row.id}
          isLoading={allActivitiesLoading}
          tableLabel="LIST OF ACTIVITIES"
          actionButton={
            !adminMode &&
            !selectedBarangay &&
            userDetail?.role !== "Super Admin" ? (
              <PrimaryButton
                size="small"
                startIcon={<AddCircle />}
                onClick={handleAddActivityClick}
              >
                CREATE ACTIVITIES
              </PrimaryButton>
            ) : null
          }
          barangay={
            !adminMode && !selectedBarangay
              ? userDetail.barangay
              : selectedBarangay
          }
          dataType="LIST OF ACTIVITIES"
        />
      ) : allActivitiesError ? (
        <ErrorDisplay />
      ) : null}

      {isModalOpen && (
        <CreateNewActivity
          mode={modalMode}
          initialData={currentActivity}
          onClose={handleCloseModal}
          addActivity={addActivity}
          editActivity={editActivity}
        />
      )}

      {isAttendanceOpen && currentActivityId !== null && (
        <AttendanceMonitoring
          onClose={handleCloseAttendance}
          activityId={currentActivityId}
        />
      )}

      <LoadingDisplay open={allActivitiesLoading} />
    </>
  );
};

export default ActivitiesTable;
