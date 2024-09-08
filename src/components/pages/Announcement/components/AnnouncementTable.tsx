import React from "react";
import { Box, Typography, FormControlLabel, IconButton, Stack, Switch } from "@mui/material";
import { Visibility, BorderColor, Delete, AddCircle } from "@mui/icons-material";

// import components
import CustomDataGrid from "../../../layout/CustomDataGrid";
import PrimaryButton from "../../../buttons/PrimaryButton";

const announcementData = [
    {
        id: 1,
        announcement_title: "SPORTSFEST 2024 ",
        announcement_type: "",
        announcement_content: "",
        date: "2024-06-11 1:30pm",
        updated: "2024-06-11 1:30pm",
        user_id: "",
    },
    {
        id: 2,
        announcement_title: "Barangay Cleanup Drive ",
        announcement_type: "",
        announcement_content: "",
        date: "2024-05-29 10:30am",
        updated: "2024-05-29 10:30am",
        user_id: "",
    },
];

const AnnouncementTable = () => {
    const columns = [
        { field: "announcement_title", headerName: "Title" },
        { field: "date", headerName: "Date Publish" },
        { field: "updated", headerName: "Date Updated" },
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
                rows={announcementData}
                columns={columns}
                totalCount={announcementData.length}
                tableLabel="LIST OF ANNOUNCEMENTS"
                actionButton={
                    <PrimaryButton size="small" startIcon={<AddCircle />}>
                        CREATE ANNOUNCEMENT
                    </PrimaryButton>
                }
            />
        </>
    );
};

export default AnnouncementTable;
