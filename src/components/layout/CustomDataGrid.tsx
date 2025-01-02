import React from "react";
import {
    DataGrid,
    GridColDef,
    GridToolbarQuickFilter,
    GridRowId,
    GridToolbarContainer,
    GridToolbarExport,
    GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { Typography, Stack, Box, Divider } from "@mui/material";
import { TocOutlined } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Barangays } from "../../mockData/Barangay";
import DefaultLogo from "/src/assets/SKFed.png";
import SKLogo from "/src/assets/Sangguniang_Kabataan_logo.jpg";

interface CustomDataGridProps {
    rows: readonly any[];
    columns: GridColDef[];
    changePage?: any;
    onClickEvent?: any;
    isNotPaginationModeServer?: true;
    tableLabel?: string;
    actionButton?: React.ReactNode | (() => React.ReactNode);
    isLoading?: boolean;
    isFetching?: boolean;
    getRowId?: (row: any) => GridRowId;
    barangay?: string | null;
    dataType?: string;
}

const CustomDataGrid: React.FC<CustomDataGridProps> = ({
    rows,
    columns,
    onClickEvent,
    tableLabel,
    actionButton,
    isLoading,
    getRowId,
    barangay,
    dataType,
}) => {
    // logged in user details
    const userDetail = useSelector((state: RootState) => state.auth.user);
    const adminMode = useSelector((state: RootState) => state.admin.adminMode);
    const selectedBarangay = useSelector(
        (state: RootState) => state.admin.selectedBarangay
    );

    let matchingBarangay: any;

    if (adminMode && selectedBarangay) {
        matchingBarangay = Barangays.find(
            (b) => b.barangayName === selectedBarangay
        );
    } else {
        matchingBarangay = Barangays.find((b) => b.barangayName === barangay);
    }

    return (
        <Stack>
            <Stack
                direction="row"
                spacing={2}
                justifyContent="space-between"
                alignItems="center"
                padding="15px 10px 15px 10px"
            >
                <Stack direction="row" spacing={2}>
                    <TocOutlined />
                    <Typography variant="h4" fontWeight={500}>
                        {tableLabel}
                    </Typography>
                </Stack>

                {actionButton && (
                    <Box className="action-button-container">
                        {typeof actionButton === "function"
                            ? actionButton()
                            : actionButton}
                    </Box>
                )}
            </Stack>

            <DataGrid
                rows={rows}
                getRowId={getRowId}
                autoHeight={true}
                onRowClick={onClickEvent}
                loading={isLoading}
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
                pageSizeOptions={[5, 10, 15, 20]}
                paginationMode="client"
                slots={{
                    toolbar: () => (
                        <GridToolbarContainer
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                margin: "10px",
                            }}
                        >
                            <Box
                                className="print-hidden"
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    width: "100%",
                                }}
                            >
                                <Box>
                                    <GridToolbarExport />
                                    <GridToolbarFilterButton />
                                </Box>
                                <GridToolbarQuickFilter
                                    sx={{ width: "250px" }}
                                />
                            </Box>
                            <Box
                                className="print-only"
                                sx={{
                                    display: "none", // Hidden by default on screen
                                    textAlign: "center",
                                    width: "100%",
                                    pt: 2,
                                    pb: 1,
                                    "@media print": {
                                        display: "block", // Shown only in print view
                                    },
                                }}
                            >
                                {/* Logo and Header Section */}
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        mb: 2,
                                        px: 5,
                                    }}
                                >
                                    {/* Left Logo */}
                                    <img
                                        src={SKLogo}
                                        alt="Left Logo"
                                        style={{
                                            width: "80px",
                                            height: "80px",
                                        }}
                                    />

                                    {/* Centered Header Text */}
                                    <Box>
                                        <Typography
                                            variant="h4"
                                            fontWeight="bold"
                                        >
                                            Republic of the Philippines
                                        </Typography>
                                        <Typography variant="body1">
                                            Province of Misamis Oriental
                                        </Typography>
                                        <Typography variant="body1">
                                            Municipality of Lagonglong
                                        </Typography>
                                        <Typography variant="body1">
                                            {userDetail.role ===
                                                "Super Admin" ||
                                            (userDetail.role === "Federation" &&
                                                !adminMode &&
                                                !selectedBarangay)
                                                ? "All Barangays"
                                                : `Barangay ${barangay}`}
                                        </Typography>
                                        <Typography variant="h4" sx={{ mt: 1 }}>
                                            OFFICE OF THE SANGGUNIANG KABATAAN
                                        </Typography>
                                    </Box>

                                    {/* Right Logo */}
                                    <img
                                        src={
                                            userDetail.role === "Super Admin" ||
                                            (userDetail.role === "Federation" &&
                                                !adminMode &&
                                                !selectedBarangay)
                                                ? DefaultLogo
                                                : `${matchingBarangay?.logo}`
                                        }
                                        alt="Right Logo"
                                        style={{
                                            width: "80px",
                                            height: "80px",
                                        }}
                                    />
                                </Box>

                                {/* Report Title Section */}
                                <Divider />
                                <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>
                                    {dataType}
                                </Typography>
                            </Box>
                        </GridToolbarContainer>
                    ),
                }}
                slotProps={{
                    toolbar: {
                        showQuickFilter: false,
                        export: false,
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
                        whiteSpace: "normal",
                        wordWrap: "break-word",
                        display: "flex",
                        alignItems: "center",
                        minHeight: "60px",
                    },
                    "& .MuiDataGrid-row": {
                        cursor: onClickEvent ? "pointer" : "",
                    },
                }}
                getRowHeight={() => "auto"} // Set minimum row height
            />
        </Stack>
    );
};

export default CustomDataGrid;
