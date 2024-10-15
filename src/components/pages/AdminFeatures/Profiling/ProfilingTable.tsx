import React, { useState } from "react";
import { Box, Typography, FormControlLabel, IconButton } from "@mui/material";
import { Visibility, BorderColor, Delete, AddCircle } from "@mui/icons-material";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

// import components
import CustomDataGrid from "../../../layout/CustomDataGrid";
import PrimaryButton from "../../../buttons/PrimaryButton";
import CreateNewProfiling from "./CreateNewProfiling";
import ErrorDisplay from "../../../displays/ErrorDisplay";
import LoadingDisplay from "../../../displays/LoadingDisplay";

// import apiSlices
import { useGetUsersQuery, useEditUserMutation } from "../../Admin/api/userApi";

const ProfilingTable = () => {
    // logged in user details
    const userDetail = useSelector((state: RootState) => state.auth.user);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<"create" | "edit" | "view">("create"); // for modal mode, either create or edit
    const [currentProfiling, setCurrentProfiling] = useState({});

    const {
        data: allYouthProfiling = [],
        isError: allYouthProfilingError,
        isSuccess: allYouthProfilingSuccess,
        isLoading: allYouthProfilingLoading,
    } = useGetUsersQuery();

    const [editUser] = useEditUserMutation();

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

    const calculateAge = (dateOfBirth: string) => {
        const birthDate = new Date(dateOfBirth);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            return age - 1;
        }
        return age;
    };

    const filteredRows = allYouthProfiling
        .filter((profile) => profile.barangay === userDetail?.barangay) // Filter profiles by barangay
        .map((profile) => ({
            ...profile,
            age: calculateAge(profile.date_of_birth),
            id: profile.id,
        }));

    const columns = [
        { field: "first_name", headerName: "First Name", minWidth: 180, flex: 1 },
        { field: "last_name", headerName: "Last Name", maxWidth: 180, flex: 1 },
        { field: "age", headerName: "Age", maxWidth: 80 },
        { field: "gender", headerName: "Gender", width: 80 },
        { field: "voter_status", headerName: "Voter Status", maxWidth: 120 },
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
                    rows={filteredRows}
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
                    // addYouthProfiling={addYouthProfiling}
                    editYouthProfiling={editUser}
                />
            )}
        </>
    );
};

export default ProfilingTable;
