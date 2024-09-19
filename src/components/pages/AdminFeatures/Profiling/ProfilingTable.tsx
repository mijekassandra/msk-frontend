import React, { useState } from "react";
import { Box, Typography, FormControlLabel, IconButton } from "@mui/material";
import { Visibility, BorderColor, Delete, AddCircle } from "@mui/icons-material";
import Swal from "sweetalert2";

// import components
import CustomDataGrid from "../../../layout/CustomDataGrid";
import PrimaryButton from "../../../buttons/PrimaryButton";
import CreateNewProfiling from "./CreateNewProfiling";
import ErrorDisplay from "../../../displays/ErrorDisplay";
import LoadingDisplay from "../../../displays/LoadingDisplay";

// import apiSlices
import {
    useGetYouthProfilingsQuery,
    useGetYouthProfilingByIDQuery,
    useAddYouthProfilingMutation,
    useEditYouthProfilingMutation,
    useDeleteYouthProfilingMutation,
} from "./api/profilingApi";

const ProfilingTable = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<"create" | "edit" | "view">("create"); // for modal mode, either create or edit
    const [currentProfiling, setCurrentProfiling] = useState({});

    const {
        data: allYouthProfiling = [],
        isError: allYouthProfilingError,
        isSuccess: allYouthProfilingSuccess,
        isLoading: allYouthProfilingLoading,
        isFetching: allYouthProfilingFetching,
    } = useGetYouthProfilingsQuery();

    // mutations
    const [addYouthProfiling] = useAddYouthProfilingMutation();
    const [editYouthProfiling] = useEditYouthProfilingMutation();
    const [deleteYouthProfiling] = useDeleteYouthProfilingMutation();

    const handleAddProfilingClick = () => {
        setModalMode("create");
        setCurrentProfiling({});
        setIsModalOpen(true);
    };

    const handleEditProfilingCLick = (profile: any) => {
        setModalMode("edit");
        setCurrentProfiling(profile);
        setIsModalOpen(true);
    };

    const handleViewProfilingClick = (profile: any) => {
        setModalMode("view");
        setCurrentProfiling(profile);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const getNextId = (profile: any) => {
        const lastId = profile.length > 0 ? Number(profile[profile.length - 1].id) : 0;
        return lastId + 1;
    };

    const rows = allYouthProfiling.map((profile) => ({
        ...profile,
        youth_profile_id: profile.id,
    }));

    const columns = [
        { field: "first_name", headerName: "First Name", minWidth: 200, flex: 1 },
        { field: "last_name", headerName: "Last Name", maxWidth: 200, flex: 1 },
        { field: "age", headerName: "Age", maxWidth: 80 },
        { field: "civil_status", headerName: "Civil Status", maxWidth: 120 },
        { field: "sex", headerName: "Sex", width: 80 },
        { field: "voter_status", headerName: "Voter Status", maxWidth: 120 },
        { field: "educational_attainment", headerName: "HEA", maxWidth: 120 },
        {
            field: "action",
            headerName: "Action",
            maxWidth: 160,
            renderCell: (params: any) => (
                <Box>
                    <IconButton
                        aria-label="view"
                        onClick={() => handleViewProfilingClick(params.row)}
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
                        onClick={() => handleEditProfilingCLick(params.row)}
                    >
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
            {allYouthProfilingSuccess ? (
                <CustomDataGrid
                    rows={rows}
                    columns={columns}
                    getRowId={(row: any) => row.id}
                    isLoading={allYouthProfilingLoading}
                    totalCount={allYouthProfiling.length}
                    tableLabel="LIST OF KK Profile Profiling"
                    actionButton={
                        <PrimaryButton
                            size="small"
                            startIcon={<AddCircle />}
                            onClick={handleAddProfilingClick}
                        >
                            Add User
                        </PrimaryButton>
                    }
                />
            ) : allYouthProfilingError ? (
                <ErrorDisplay />
            ) : null}

            {isModalOpen && (
                <CreateNewProfiling
                    mode={modalMode}
                    initialData={currentProfiling}
                    onClose={handleCloseModal}
                    addYouthProfiling={addYouthProfiling}
                    editYouthProfiling={editYouthProfiling}
                    totalCount={getNextId(allYouthProfiling)}
                />
            )}
        </>
    );
};

export default ProfilingTable;
