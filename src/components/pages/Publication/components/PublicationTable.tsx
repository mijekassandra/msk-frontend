import React from "react";
import { Box, Typography, FormControlLabel, IconButton, Stack, Switch } from "@mui/material";
import { Visibility, BorderColor, Folder, AddCircle } from "@mui/icons-material";

// import components
import CustomDataGrid from "../../../layout/CustomDataGrid";
import PrimaryButton from "../../../buttons/PrimaryButton";

const publicationData = [
    {
        id: 1,
        publication_title: "LAGONGLONG INTER-BARANGAY-SUMMER-LEAGUE",
        publication_type: "",
        publication_content: "",
        date: "2024-04-25 1:30pm",
        updated: "2024-04-25 1:30pm",
    },
    {
        id: 2,
        publication_title:
            "Unlock Your Potential-Elevate Your Game with Intensive Basketball Skills Training!",
        publication_type: "",
        publication_content: "",
        date: "2024-03-21 2:30pm",
        updated: "2024-03-21 2:30pm",
    },
];

const PublicationTable = () => {
    const columns = [
        { field: "publication_title", headerName: "Title", minWidth: 300, flex: 1 },
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
                        <Folder
                            sx={{
                                color: "secondary.main",
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
                rows={publicationData}
                columns={columns}
                totalCount={publicationData.length}
                tableLabel="LIST OF PUBLICATIONS"
                actionButton={
                    <PrimaryButton size="small" startIcon={<AddCircle />}>
                        CREATE PUBLICATION
                    </PrimaryButton>
                }
            />
        </>
    );
};

export default PublicationTable;
