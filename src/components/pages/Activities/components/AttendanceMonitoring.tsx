import React, { useState } from "react";
import ModalVariantTwo from "../../../modals/ModalVariantTwo";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import PrimaryButton from "../../../buttons/PrimaryButton";
import {
  Stack,
  Select,
  Box,
  Chip,
  MenuItem,
  OutlinedInput,
  IconButton,
  Typography,
} from "@mui/material";
import { AddCircle, Close } from "@mui/icons-material";

import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { YouthProfilingProps } from "../../../pages/AdminFeatures/Profiling/api/profilingApi";

// import apiSlices
import { useGetProfilesQuery } from "../../AdminFeatures/Profiling/api/profilingApi";
import {
  useGetAllAttendanceQuery,
  useGetAttendanceByActivityQuery,
  useAddAttendanceMutation,
} from "../../Settings/components/api/attendanceApi";

const columns: GridColDef[] = [
  {
    field: "fullName",
    headerName: "Fullname",
    minWidth: 200,
    flex: 1,
  },
  {
    field: "barangay",
    headerName: "Barangay",
    minWidth: 200,
    flex: 1,
  },
];

interface AttendanceMonitoringProps {
  onClose: () => void;
  activityId: number;
}

const AttendanceMonitoring: React.FC<AttendanceMonitoringProps> = ({
  onClose,
  activityId,
}) => {
  // logged in user details
  const userDetail = useSelector((state: RootState) => state.auth.user);

  // // Fetch adminMode and selectedBarangay from the Redux store
  // const adminMode = useSelector((state: RootState) => state.admin.adminMode);
  // const selectedBarangay = useSelector(
  //   (state: RootState) => state.admin.selectedBarangay
  // );

  const [loading, setLoading] = useState(false);

  //! modals
  const [isAttendanceOpen, setIsAttendanceOpen] = useState(true);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  //! FETCHING AND ADDING USER SECION --------------------------------------------------------------
  // State for selected names
  const [selectedNames, setSelectedNames] = useState<YouthProfilingProps[]>([]);

  //! Fetch attendance records for the given activity
  const { data: attendanceRecords = [], isLoading: attendanceLoading } =
    useGetAttendanceByActivityQuery(activityId);

  //! fetch all attendance and users
  const { data: allAttendance = [] } = useGetAllAttendanceQuery();
  const { data: allYouthProfiling = [] } = useGetProfilesQuery();

  //! RTK Mutation for adding attendance
  const [addAttendance, { isLoading: adding }] = useAddAttendanceMutation();

  // Handle selection change
  const handleChange = (event: any) => {
    const selectedIds = event.target.value;
    const selectedProfiles = allYouthProfiling.filter((profile) =>
      selectedIds.includes(profile.id)
    );
    setSelectedNames(selectedProfiles);
  };

  // Handle removing a name from the selection
  const handleRemove = (event: any, nameToRemove: any) => {
    event.stopPropagation();
    setSelectedNames((prev) => prev.filter((name) => name !== nameToRemove));
  };

  //! FOR HANDLE CLICKS -----------------------------------------

  //  Open "Add User" modal and close "Attendance Monitoring"
  const handleOpenAddUser = () => {
    setIsAttendanceOpen(false); // Close Attendance Monitoring
    setIsAddUserOpen(true); // Open Add User
    console.log("data", allYouthProfiling);
  };

  // Close "Add User" and Re-open "Attendance Monitoring"
  const handleCloseAddUser = () => {
    setIsAddUserOpen(false); // Close Add User
    setIsAttendanceOpen(true); // Reopen Attendance Monitoring
  };

  // Close everything
  const handleCloseAll = () => {
    setIsAddUserOpen(false);
    setIsAttendanceOpen(false);
    onClose();
  };

  console.log("selectedNames", selectedNames);

  //! Submit New Attendance
  const handleAddAttendance = async () => {
    const newAttendance = selectedNames.map((profile, index) => ({
      attendance_id: allAttendance.length + index + 1,
      activity_id: activityId,
      profiling_id: profile.id,
      account_id: profile.account_id,
      first_name: profile.first_name,
      last_name: profile.last_name,
      barangay: profile.barangay,
    }));

    console.log("Formatted Attendance Data:", newAttendance);

    try {
      //  Send attendance records one by one to avoid JSON formatting issues
      for (const record of newAttendance) {
        await addAttendance(record).unwrap();
      }

      setSelectedNames([]); //  Clear selection after submission
      handleCloseAddUser();
    } catch (error) {
      console.error("Failed to add attendance:", error);
    }
  };

  //! Filter attendance records where `activity_id` matches the selected `activityId`
  const filteredAttendance = attendanceRecords.filter(
    (record: any) => record.activity_id === activityId
  );

  //! Prepare DataGrid Rows
  const rows = filteredAttendance.map((record: any) => ({
    id: record.attendance_id,
    fullName: `${record.first_name} ${record.last_name}`,
    barangay: record.barangay,
  }));

  return (
    <>
      {isAttendanceOpen && (
        <ModalVariantTwo
          onClose={handleCloseAll}
          onSave={() => console.log("")}
          headerTitle="Attendance Monitoring"
          mode="view"
          loading={attendanceLoading}
          content={
            <Stack gap={1} alignItems={"flex-end"}>
              <PrimaryButton
                size="small"
                startIcon={<AddCircle />}
                onClick={handleOpenAddUser}
              >
                Add User
              </PrimaryButton>
              <div
                style={{ maxHeight: "450px", overflow: "auto", width: "100%" }}
              >
                <DataGrid
                  rows={rows}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 10 },
                    },
                  }}
                  pageSizeOptions={[10, 15, 20]}
                  sx={{
                    "& .MuiDataGrid-columnHeaderTitle": { fontWeight: "bold" },
                    "& .MuiDataGrid-cell": { fontWeight: "300" },
                  }}
                />
              </div>
            </Stack>
          }
        />
      )}

      {/* Add User Modal - Opens and Closes Attendance Monitoring */}
      {isAddUserOpen && (
        <ModalVariantTwo
          onClose={handleCloseAddUser}
          onSave={handleAddAttendance}
          headerTitle="Add User to Attendance"
          loading={loading}
          mode="edit"
          content={
            <Stack spacing={2}>
              <Select
                multiple
                displayEmpty
                value={selectedNames.map((profile) => profile.id)}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" />}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return (
                      <Typography sx={{ color: "#aaa" }}>
                        Select names
                      </Typography>
                    );
                  }
                  return (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selectedNames.map((profile) => (
                        <Chip
                          key={profile.id}
                          label={`${profile.first_name} ${profile.last_name}`} // ✅ Ensure string
                          onDelete={(event) => handleRemove(event, profile)}
                          deleteIcon={
                            <IconButton
                              size="small"
                              onMouseDown={(e) => e.stopPropagation()}
                            >
                              <Close fontSize="small" />
                            </IconButton>
                          }
                        />
                      ))}
                    </Box>
                  );
                }}
              >
                {allYouthProfiling
                  .filter((profile) => {
                    // Exclude profiles already in attendance
                    const isAlreadyInAttendance = attendanceRecords.some(
                      (record: any) =>
                        record.activity_id === activityId &&
                        record.profiling_id === profile.id
                    );

                    // Apply role-based filtering
                    if (userDetail.role === "Chairperson") {
                      return (
                        profile.barangay === userDetail.barangay && // Only show same barangay
                        !isAlreadyInAttendance
                      );
                    }

                    // If not "Chairperson", return all profiles except those already in attendance
                    return !isAlreadyInAttendance;
                  })
                  .map((profile) => (
                    <MenuItem key={profile.id} value={profile.id}>
                      {profile.first_name} {profile.last_name}
                    </MenuItem>
                  ))}
              </Select>
            </Stack>
          }
        />
      )}
    </>
  );
};

export default AttendanceMonitoring;
