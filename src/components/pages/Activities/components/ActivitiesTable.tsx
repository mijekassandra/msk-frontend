import React, { useState } from "react";
import { Box, Typography, FormControlLabel, IconButton, Stack, Switch } from "@mui/material";
import { Visibility, BorderColor, Delete, AddCircle } from "@mui/icons-material";

// import components
import CustomDataGrid from "../../../layout/CustomDataGrid";
import PrimaryButton from "../../../buttons/PrimaryButton";
import CreateNewActivity from "./CreateNewActivity";

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

    const handleCreateActivityClick = () => {
        setIsModalOpen(true); // Open the modal
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // Close the modal
    };

    const columns = [
        { field: "activity_title", headerName: "Title", minWidth: 300, flex: 1 },
        { field: "date", headerName: "Date Publish", maxWidth: 160 },
        { field: "updated", headerName: "Date Updated", maxWidth: 160 },
        {
            field: "action",
            headerName: "Action",
            maxWidth: 160,
            renderCell: (params: any) => (
                <Box>
                    <IconButton aria-label="view">
                        <Visibility
                            sx={{
                                color: "primary.dark",
                                fontSize: "22px",
                            }}
                        />
                    </IconButton>
                    <IconButton aria-label="edit">
                        <BorderColor
                            sx={{
                                color: "secondary.light",
                                fontSize: "22px",
                            }}
                        />
                    </IconButton>
                    <IconButton aria-label="folder">
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
            <CustomDataGrid
                rows={activitiesData}
                columns={columns}
                totalCount={activitiesData.length}
                tableLabel="LIST OF ACTIVITIES"
                actionButton={
                    <PrimaryButton
                        size="small"
                        startIcon={<AddCircle />}
                        onClick={handleCreateActivityClick}
                    >
                        CREATE ACTIVITIES
                    </PrimaryButton>
                }
            />
            {isModalOpen && (
                <CreateNewActivity
                    id=""
                    activity_title=""
                    activity_content=""
                    onClose={handleCloseModal}
                />
            )}
        </>
    );
};

export default ActivitiesTable;
