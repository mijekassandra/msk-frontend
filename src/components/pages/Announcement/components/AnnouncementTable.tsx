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
import { formatDateTime } from "../../../../utils/dateTimeUtil.ts";

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

    // Force refetch if needed
    useEffect(() => {
        refetch();
    }, []);

    const filteredRows = React.useMemo(() => {
        if (adminMode && selectedBarangay) {
            return allAnnouncements.filter(
                (announcement) =>
                    announcement.barangay === selectedBarangay &&
                    announcement.type !== "Federation"
            );
        } else if (userDetail.role === "Chairperson") {
            return allAnnouncements.filter(
                (announcement) => announcement.barangay === userDetail.barangay
            );
        }
        return allAnnouncements;
    }, [allAnnouncements, userDetail?.role]);

    const columns = [
        { field: "title", headerName: "Title", minWidth: 300, flex: 1 },
        { field: "type", headerName: "Type", maxWidth: 120, flex: 1 },
        { field: "status", headerName: "Status", maxWidth: 100, flex: 1 },
        {
            field: "created_at",
            headerName: "Date Publish",
            maxWidth: 150,
            flex: 1,
            valueFormatter: (params: any) => formatDateTime(params),
        },
        {
            field: "updated_at",
            headerName: "Date Updated",
            maxWidth: 150,
            flex: 1,
            valueFormatter: (params: any) => formatDateTime(params),
        },
        {
            field: "action",
            headerName: "Action",
            maxWidth: 150,
            flex: 1,
            headerClassName: "print-hidden",
            cellClassName: "print-hidden",
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

                    {!adminMode &&
                    !selectedBarangay &&
                    userDetail?.role !== "Super Admin" ? (
                        <>
                            <IconButton
                                aria-label="edit"
                                onClick={() =>
                                    handleEditAnnouncementClick(params.row)
                                }
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
                                onClick={() =>
                                    handleDeleteAnnouncement(params.row)
                                }
                            >
                                <Delete
                                    sx={{
                                        color: "error.main",
                                        fontSize: "22px",
                                    }}
                                />
                            </IconButton>
                        </>
                    ) : null}
                </Box>
            ),
        },
    ];

    return (
        <>
            {allAnnouncementsSuccess ? (
                <CustomDataGrid
                    rows={filteredRows}
                    getRowId={(row: any) => row.id}
                    isLoading={allAnnouncementsLoading}
                    columns={columns}
                    tableLabel="LISTS OF ANNOUNCEMENTS"
                    actionButton={
                        !adminMode &&
                        !selectedBarangay &&
                        userDetail?.role !== "Super Admin" ? (
                            <PrimaryButton
                                size="small"
                                startIcon={<AddCircle />}
                                onClick={handleAddAnnouncementClick}
                            >
                                CREATE ANNOUNCEMENT
                            </PrimaryButton>
                        ) : null
                    }
                    barangay={
                        !adminMode && !selectedBarangay
                            ? userDetail.barangay
                            : selectedBarangay
                    }
                    dataType="LIST OF ANNOUNCEMENT"
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
