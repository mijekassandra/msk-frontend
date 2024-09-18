import React, { useState } from "react";
import { Box, Typography, FormControlLabel, IconButton, Stack, Switch } from "@mui/material";
import { Visibility, BorderColor, Delete, AddCircle } from "@mui/icons-material";
import Swal from "sweetalert2";

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
    useDeleteActivityMutation,
} from "../api/activityApi";

const activitiesData = [
    {
        id: 1,
        activity_title: "KABATAAN KONTRA DROGA AT TERORISMO",
        activity_type: "",
        activity_content: "",
        date: "2024-04-22 1:30pm",
        updated: "2024-04-22 1:30pm",
    },
];

const ActivitiesTable = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<"create" | "edit" | "view">("create"); // for modal mode, either create or edit
    const [currentActivity, setCurrentActivity] = useState({}); // for edit modal

    const {
        data: allActivities = [],
        isError: allActivitiesError,
        isSuccess: allActivitiesSuccess,
        isLoading: allActivitiesLoading,
        isFetching: allActivitiesFetching,
    } = useGetActivtiesQuery();

    const [addActivity] = useAddActivityMutation();
    const [editActivity] = useEditActivityMutation();
    const [deleteActivity] = useDeleteActivityMutation();

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

    const handleDeleteActivity = async (activity: any) => {
        // confirmation dialog
        const result = await Swal.fire({
            title: "Delete Activity?",
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
                await deleteActivity(activity.id);
                Swal.fire({
                    title: "Deleted!",
                    text: "The activity has been deleted.",
                    icon: "success",
                    confirmButtonText: "OK",
                    customClass: {
                        title: "my-swal-title",
                        htmlContainer: "my-swal-text",
                        popup: "my-swal-popup",
                        confirmButton: "my-swal-button",
                    },
                });
            } catch (error) {
                console.log("Error: ", error);
            }
        }
    };

    const getNextId = (activity: any) => {
        const lastId = activity.length > 0 ? Number(activity[activity.length - 1].id) : 0;
        return lastId + 1;
    };

    const rows = allActivities.map((activity) => ({
        ...activity,
        activity_id: activity.id,
    }));

    const columns = [
        { field: "activity_title", headerName: "Title", minWidth: 300, flex: 1 },
        { field: "activity_type", headerName: "Type", maxWidth: 200, flex: 1 },
        { field: "date", headerName: "Date Publish", maxWidth: 160 },
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
                    <IconButton
                        aria-label="folder"
                        onClick={() => handleDeleteActivity(params.row)}
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
            {allActivitiesSuccess ? (
                <CustomDataGrid
                    rows={rows}
                    columns={columns}
                    getRowId={(row: any) => row.id}
                    isLoading={allActivitiesLoading}
                    totalCount={allActivities.length}
                    tableLabel="LIST OF ACTIVITIES"
                    actionButton={
                        <PrimaryButton
                            size="small"
                            startIcon={<AddCircle />}
                            onClick={handleAddActivityClick}
                        >
                            CREATE ACTIVITIES
                        </PrimaryButton>
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
                    totalCount={getNextId(allActivities)}
                />
            )}

            <LoadingDisplay open={allActivitiesLoading} />
        </>
    );
};

export default ActivitiesTable;
