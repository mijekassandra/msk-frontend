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
    useGetActivityByIDQuery,
    useAddActivityMutation,
    useEditActivityMutation,
} from "../api/activityApi";

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

    const {
        data: allActivities = [],
        isError: allActivitiesError,
        isSuccess: allActivitiesSuccess,
        isLoading: allActivitiesLoading,
        refetch,
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

    // Force refetch if needed
    useEffect(() => {
        refetch();
    }, []);

    // const handleDeleteActivity = async (activity: any) => {
    //     // confirmation dialog
    //     const result = await Swal.fire({
    //         title: "Delete Activity?",
    //         text: "You won't be able to revert this!",
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonColor: "#d33",
    //         confirmButtonText: "Delete!",
    //         customClass: {
    //             title: "my-swal-title",
    //             htmlContainer: "my-swal-text",
    //             popup: "my-swal-popup",
    //         },
    //     });

    //     // final confirmation
    //     if (result.isConfirmed) {
    //         try {
    //             await deleteActivity(activity.id);
    //             Swal.fire({
    //                 title: "Deleted!",
    //                 text: "The activity has been deleted.",
    //                 icon: "success",
    //                 confirmButtonText: "OK",
    //                 customClass: {
    //                     title: "my-swal-title",
    //                     htmlContainer: "my-swal-text",
    //                     popup: "my-swal-popup",
    //                     confirmButton: "my-swal-button",
    //                 },
    //             });
    //         } catch (error) {
    //             console.log("Error: ", error);
    //         }
    //     }
    // };

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
                (activity) => activity.barangay === userDetail.barangay
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
        { field: "status", headerName: "Status", maxWidth: 120, flex: 1 },
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
            maxWidth: 140,
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
                    {/* <IconButton
                        aria-label="folder"
                        onClick={() => handleDeleteActivity(params.row)}
                    >
                        <Delete
                            sx={{
                                color: "error.main",
                                fontSize: "22px",
                            }}
                        />
                    </IconButton> */}
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

            <LoadingDisplay open={allActivitiesLoading} />
        </>
    );
};

export default ActivitiesTable;
