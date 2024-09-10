import React from "react";
import { DataGrid, GridColDef, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { Typography, Stack, Box } from "@mui/material";

import { TocOutlined } from "@mui/icons-material";

interface CustomDataGridProps {
    rows: readonly any[];
    columns: GridColDef[];
    totalCount?: number;
    changePage?: any;
    onClickEvent?: any;
    isNotPaginationModeServer?: true;
    tableLabel?: string;
    actionButton?: React.ReactNode | (() => React.ReactNode);
}

const CustomDataGrid: React.FC<CustomDataGridProps> = ({
    rows,
    columns,
    totalCount,
    changePage,
    onClickEvent,
    isNotPaginationModeServer,
    tableLabel,
    actionButton,
}) => {
    return (
        <Stack>
            <Stack
                direction="row"
                spacing={2}
                justifyContent="space-between"
                alignItems="center"
                padding="10px 10px 15px 10px"
            >
                <Stack direction="row" spacing={2}>
                    <TocOutlined />
                    <Typography variant="h4" fontWeight={500}>
                        {tableLabel}
                    </Typography>
                </Stack>

                {actionButton && (
                    <Box className="action-button-container">
                        {typeof actionButton === "function" ? actionButton() : actionButton}
                    </Box>
                )}
            </Stack>

            <DataGrid
                rows={rows}
                onRowClick={onClickEvent}
                columns={columns.map((column) => ({
                    ...column,
                    flex: 1,
                    minWidth: 120,
                }))}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5]}
                rowCount={totalCount}
                onPaginationModelChange={(model) => {
                    const { page, pageSize } = model;
                    changePage(page, pageSize); // Ensure you're passing both page and pageSize
                }}
                {...(!isNotPaginationModeServer && {
                    paginationMode: "client", // Only server mode if pagination is handled server-side
                })}
                slots={{
                    toolbar: () => (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                margin: "10px",
                            }}
                        >
                            <GridToolbarQuickFilter sx={{ width: "250px" }} />
                        </Box>
                    ),
                }}
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                    },
                }}
                sx={{
                    flexGrow: 1,
                    bgcolor: "#FFFFFF",
                    "&.MuiDataGrid-root": {
                        border: "none",
                    },
                    "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                        outline: "none !important",
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        bgcolor: "#FEF5EB",
                    },
                    "& .MuiDataGrid-columnHeaderTitle": {
                        fontWeight: "600",
                    },
                    "& .MuiDataGrid-cell": {
                        fontWeight: "200",
                    },
                    "& .MuiDataGrid-row": {
                        cursor: onClickEvent ? "pointer" : "",
                    },
                }}
            />
        </Stack>
    );
};

export default CustomDataGrid;
