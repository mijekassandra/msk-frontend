import React, { useState, useEffect } from "react";
import { Box, IconButton, Typography, Alert } from "@mui/material";
import {
    Visibility,
    BorderColor,
    Delete,
    AddCircle,
} from "@mui/icons-material";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import generatePDF from "../../../../utils/generatePDF";

// import components
import CustomDataGrid from "../../../layout/CustomDataGrid";
import PrimaryButton from "../../../buttons/PrimaryButton";
import CreateNewProfiling from "./CreateNewProfiling";
import ErrorDisplay from "../../../displays/ErrorDisplay";
import LoadingDisplay from "../../../displays/LoadingDisplay";

// import apiSlices
import {
    useGetProfilesQuery,
    useAddYouthProfilingMutation,
    useEditYouthProfilingMutation,
    useDeleteYouthProfilingMutation,
} from "../Profiling/api/profilingApi";

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
    const [currentProfiling, setCurrentProfiling] = useState<any>({});
    const [alert, setAlert] = useState(null);

    const {
        data: allYouthProfiling = [],
        isError: allYouthProfilingError,
        isSuccess: allYouthProfilingSuccess,
        isLoading: allYouthProfilingLoading,
    } = useGetProfilesQuery();

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

    const handleDeleteProfiling = async (profile: any) => {
        // confirmation dialog
        const result = await Swal.fire({
            title: "Delete Profiling?",
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
                const response = await deleteYouthProfiling(profile.id);

                if (response.error) {
                    setAlert(response.error.data.message);

                    setTimeout(() => {
                        setAlert(null);
                    }, 4000);
                } else if (response.data.status === "success") {
                    Swal.fire({
                        title: "Deleted!",
                        text: "The KK Profiling has been deleted.",
                        icon: "success",
                        customClass: {
                            title: "my-swal-title",
                            htmlContainer: "my-swal-text",
                            popup: "my-swal-popup",
                            confirmButton: "my-swal-button",
                        },
                        confirmButtonText: "OK",
                    });
                }
            } catch (error) {
                console.log("Error: ", error);
            }
        }
    };

    // const handleViewProfilingClick = (profile: any) => {
    //     setModalMode("view");
    //     setCurrentProfiling(profile);
    //     setIsModalOpen(true);
    // };

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
                    profile.barangay === selectedBarangay && profile.id !== null
                );
            }
            if (userDetail.role === "Chairperson") {
                return profile.barangay === userDetail.barangay;
            }
            return allYouthProfiling;
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
            minWidth: 130,
            flex: 1,
        },
        { field: "last_name", headerName: "Last Name", minWidth: 130, flex: 1 },
        { field: "age", headerName: "Age", maxWidth: 80, flex: 0.5 },
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
            maxWidth: 120,
            flex: 1,
        },
        {
            field: "action",
            headerName: "Action",
            maxWidth: 150,
            flex: 1,
            headerClassName: "print-hidden",
            cellClassName: "print-hidden",
            renderCell: (params: any) => (
                <Box>
                    {/* <IconButton
                        aria-label="view"
                        onClick={() => handleViewProfilingClick(params.row)}
                    >
                        <Download
                            sx={{
                                color: "primary.dark",
                                fontSize: "20px",
                            }}
                        />
                    </IconButton> */}
                    <IconButton
                        aria-label="view"
                        onClick={() => generatePDF(params.row)}
                    >
                        <Visibility
                            sx={{
                                color: "primary.dark",
                                fontSize: {
                                    lg: "20px",
                                    xs: "16px",
                                },
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
                                        fontSize: {
                                            lg: "20px",
                                            xs: "16px",
                                        },
                                    }}
                                />
                            </IconButton>
                            <IconButton
                                aria-label="folder"
                                onClick={() =>
                                    handleDeleteProfiling(params.row)
                                }
                            >
                                <Delete
                                    sx={{
                                        color: "error.main",
                                        fontSize: {
                                            lg: "20px",
                                            xs: "16px",
                                        },
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
                    addYouthProfiling={addYouthProfiling}
                    editYouthProfiling={editYouthProfiling}
                    age={calculateAge(currentProfiling.date_of_birth)}
                />
            )}
            {alert && (
                <Box
                    sx={{
                        position: "fixed",
                        bottom: 16,
                        right: 16,
                        zIndex: 1000,
                    }}
                >
                    <Alert variant="filled" severity="error">
                        {alert}
                    </Alert>
                </Box>
            )}

            <LoadingDisplay open={allYouthProfilingLoading} />
        </>
    );
};

export default ProfilingTable;
