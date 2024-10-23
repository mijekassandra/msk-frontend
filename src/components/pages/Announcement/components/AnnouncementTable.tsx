import React, { useState, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import {
  Visibility,
  BorderColor,
  Delete,
  AddCircle,
} from "@mui/icons-material";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { formatDateTime } from "../../../../utils/dateTimeUtil.js";

// import components
import CustomDataGrid from "../../../layout/CustomDataGrid";
import PrimaryButton from "../../../buttons/PrimaryButton";
import CreateAnnouncement from "./CreateAnnouncement";
import LoadingDisplay from "../../../displays/LoadingDisplay";
import ErrorDisplay from "../../../displays/ErrorDisplay";

// import apiSlices
import {
  useGetAnnouncementsQuery,
  useAddAnnouncementMutation,
  useEditAnnouncementMutation,
  useDeleteAnnouncementMutation,
} from "../api/announcementApi";

const AnnouncementTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit" | "view">(
    "create"
  );
  const [currentAnnouncement, setCurrentAnnouncement] = useState({}); // for edit modal

  // logged in user role
  const userDetail = useSelector((state: RootState) => state.auth.user);

  // Fetch adminMode and selectedBarangay from the Redux store
  const adminMode = useSelector((state: RootState) => state.admin.adminMode);
  const selectedBarangay = useSelector(
    (state: RootState) => state.admin.selectedBarangay
  );

  const {
    data: allAnnouncements = [],
    isError: allAnnouncementsError,
    isSuccess: allAnnouncementsSuccess,
    isLoading: allAnnouncementsLoading,
    refetch,
  } = useGetAnnouncementsQuery();

  //mutations
  const [addAnnouncement] = useAddAnnouncementMutation();
  const [editAnnouncement] = useEditAnnouncementMutation();
  const [deleteAnnouncement] = useDeleteAnnouncementMutation();

  const handleAddAnnouncementClick = () => {
    setModalMode("create");
    setCurrentAnnouncement({});
    setIsModalOpen(true);
  };

  const handleEditAnnouncementClick = (announcement: any) => {
    setModalMode("edit");
    setCurrentAnnouncement(announcement);
    setIsModalOpen(true);
  };

  const handleViewAnnouncementClick = (announcement: any) => {
    setModalMode("view");
    setCurrentAnnouncement(announcement);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Force refetch if needed
  useEffect(() => {
    refetch();
  }, []);

  const handleDeleteAnnouncement = async (announcement: any) => {
    // confirmation dialog
    const result = await Swal.fire({
      title: "Delete Announcement?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete!",
      customClass: {
        title: "my-swal-title",
        htmlContainer: "my-swal-text",
        popup: "my-swal-popup",
      },
    });

    // if final confirmation
    if (result.isConfirmed) {
      try {
        await deleteAnnouncement(announcement.id);
        Swal.fire({
          title: "Deleted!",
          text: "The announcement has been deleted.",
          icon: "success",
          customClass: {
            title: "my-swal-title",
            htmlContainer: "my-swal-text",
            popup: "my-swal-popup",
            confirmButton: "my-swal-button",
          },
          confirmButtonText: "OK",
        });
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  };

  //   const rows = allAnnouncements.map((announcement) => ({
  //     ...announcement,
  //     announcement_id: announcement.id,
  //   }));

  const columns = [
    { field: "title", headerName: "Title" },
    { field: "type", headerName: "Type" },
    { field: "status", headerName: "Status" },
    { field: "created_at", headerName: "Date Publish" },
    {
      field: "action",
      headerName: "Action",
      maxWidth: 160,
      renderCell: (params: any) => (
        <Box>
          <IconButton
            aria-label="view"
            onClick={() => handleViewAnnouncementClick(params.row)}
          >
            <Visibility
              sx={{
                color: "primary.dark",
                fontSize: "22px",
              }}
            />
          </IconButton>
          <IconButton
            aria-label="edit"
            onClick={() => handleEditAnnouncementClick(params.row)}
          >
            <BorderColor
              sx={{
                color: "secondary.light",
                fontSize: "22px",
              }}
            />
          </IconButton>
          <IconButton
            aria-label="folder"
            onClick={() => handleDeleteAnnouncement(params.row)}
          >
            <Delete
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
      {allAnnouncementsSuccess ? (
        <CustomDataGrid
          rows={allAnnouncements}
          getRowId={(row: any) => row.id}
          isLoading={allAnnouncementsLoading}
          columns={columns}
          tableLabel="LISTS OF ANNOUNCEMENTS"
          actionButton={
            !adminMode && !selectedBarangay ? (
              <PrimaryButton
                size="small"
                startIcon={<AddCircle />}
                onClick={handleAddAnnouncementClick}
              >
                CREATE ANNOUNCEMENT
              </PrimaryButton>
            ) : null
          }
        />
      ) : allAnnouncementsError ? (
        <ErrorDisplay />
      ) : null}

      {isModalOpen && (
        <CreateAnnouncement
          mode={modalMode}
          initialData={currentAnnouncement}
          onClose={handleCloseModal}
          addAnnouncement={addAnnouncement}
          editAnnouncement={editAnnouncement}
        />
      )}

      <LoadingDisplay open={allAnnouncementsLoading} />
    </>
  );
};

export default AnnouncementTable;
