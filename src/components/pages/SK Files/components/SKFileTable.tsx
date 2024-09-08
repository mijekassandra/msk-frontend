import React from "react";
import { Box, Typography, FormControlLabel, IconButton, Stack, Switch } from "@mui/material";

// import icons
import {
    Download,
    Visibility,
    Delete,
    Publish,
    Description,
    PictureAsPdf,
} from "@mui/icons-material";

// import components
import CustomDataGrid from "../../../layout/CustomDataGrid";
import PrimaryButton from "../../../buttons/PrimaryButton";

const skFilesData = [
    {
        id: 1,
        file_name: "Agenda of the meeting.docx",
        file_size: 5,
        file_type: "docx",
        upload_date: "2024-01-24 9:30am",
    },
    {
        id: 2,
        file_name: "Attendance.pdf",
        file_size: 10,
        file_type: "pdf",
        upload_date: "2024-01-24 9:50am",
    },
    {
        id: 3,
        file_name: "Minutes.docx",
        file_size: 20,
        file_type: "docx",
        upload_date: "2024-01-24 10:00am",
    },
    {
        id: 4,
        file_name: "Activity design.docx",
        file_size: 10,
        file_type: "docx",
        upload_date: "2024-01-24 11:00am",
    },
];

const SKFileTable = () => {
    const columns = [
        {
            field: "file_type",
            headerName: "File Type",
            maxWidth: 130,
            renderCell: (params: any) => {
                const fileType = params.value;
                return (
                    <Stack direction="row" alignItems="center" spacing={1}>
                        {fileType === "docx" && (
                            <Description sx={{ color: "#2196f3", fontSize: "22px" }} />
                        )}
                        {fileType === "pdf" && (
                            <PictureAsPdf sx={{ color: "error.main", fontSize: "22px" }} />
                        )}
                        <span>{fileType}</span>
                    </Stack>
                );
            },
        },
        { field: "file_name", headerName: "Filename", minWidth: 250 },
        { field: "file_size", headerName: "Filesize", maxWidth: 100 },
        { field: "upload_date", headerName: "Date Upload", maxWidth: 160 },
        {
            field: "action",
            headerName: "Action",
            maxWidth: 160,
            renderCell: (params: any) => (
                <Box>
                    <IconButton aria-label="download">
                        <Download
                            sx={{
                                color: "secondary.main",
                                fontSize: "22px",
                            }}
                        />
                    </IconButton>
                    <IconButton aria-label="view">
                        <Visibility
                            sx={{
                                color: "primary.dark",
                                fontSize: "22px",
                            }}
                        />
                    </IconButton>
                    <IconButton aria-label="delete">
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
                rows={skFilesData}
                columns={columns}
                totalCount={skFilesData.length}
                tableLabel="LIST OF FILES"
                actionButton={
                    <PrimaryButton size="small" startIcon={<Publish />}>
                        Upload File
                    </PrimaryButton>
                }
            />
        </>
    );
};

export default SKFileTable;
