import React, { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import {
    Visibility,
    BorderColor,
    Delete,
    AddCircle,
} from "@mui/icons-material";
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

    // Fetch adminMode and selectedBarangay from the Redux store
    const adminMode = useSelector((state: RootState) => state.admin.adminMode);
    const selectedBarangay = useSelector(
        (state: RootState) => state.admin.selectedBarangay
    );

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<"create" | "edit" | "view">(
        "create"
    ); // for modal mode, either create or edit
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
        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
            return age - 1;
        }
        return age;
    };

    const filteredRows = allYouthProfiling
        .filter((profile) => {
            if (adminMode && selectedBarangay) {
                return (
                    profile.barangay === selectedBarangay &&
                    profile.profile_id !== null
                );
            }
            return (
                profile.barangay === userDetail?.barangay &&
                profile.profile_id !== null
            );
        })
        .map((profile) => ({
            ...profile,
            age: calculateAge(profile.date_of_birth),
            profile_id: profile.id,
        }));

    const columns = [
        {
            field: "first_name",
            headerName: "First Name",
            minWidth: 100,
            flex: 1,
        },
        { field: "last_name", headerName: "Last Name", maxWidth: 150, flex: 1 },
        { field: "age", headerName: "Age", maxWidth: 75, flex: 0.5 },
        { field: "gender", headerName: "Gender", maxWidth: 100, flex: 0.5 },
        {
            field: "voter_status",
            headerName: "Voter Status",
            maxWidth: 110,
            flex: 0.5,
        },
        {
            field: "educational_attainment",
            headerName: "HEA",
            width: 100,
            flex: 1,
        },
        {
            field: "action",
            headerName: "Action",
            width: 30,
            headerClassName: "print-hidden",
            cellClassName: "print-hidden",
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
                    {!adminMode && !selectedBarangay ? (
                        <>
                            <IconButton
                                aria-label="edit"
                                onClick={() =>
                                    handleEditProfilingCLick(params.row)
                                }
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
                        </>
                    ) : null}
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
                    getRowId={(row: any) => row.profile_id ?? row.account_id}
                    isLoading={allYouthProfilingLoading}
                    tableLabel="LIST OF KK Profile Profiling"
                    actionButton={
                        !adminMode && !selectedBarangay ? (
                            <PrimaryButton
                                size="small"
                                startIcon={<AddCircle />}
                                onClick={handleAddProfilingClick}
                            >
                                Add User
                            </PrimaryButton>
                        ) : null
                    }
                    barangay={
                        !adminMode && !selectedBarangay
                            ? userDetail.barangay
                            : selectedBarangay
                    }
                    dataType="LIST OF KK PROFILING"
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

            <LoadingDisplay open={allYouthProfilingLoading} />
        </>
    );
};

export default ProfilingTable;
