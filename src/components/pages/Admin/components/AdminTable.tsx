import React, { useState, useEffect } from "react";
import { Box, IconButton, Alert } from "@mui/material";
import { Visibility, BorderColor, ToggleOff, ToggleOn, AddCircle } from "@mui/icons-material";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

//import components
import CustomDataGrid from "../../../layout/CustomDataGrid";
import PrimaryButton from "../../../buttons/PrimaryButton";
import CreateNewAdmin from "./CreateNewAdmin";
import LoadingDisplay from "../../../displays/LoadingDisplay";
import ErrorDisplay from "../../../displays/ErrorDisplay";

// import apiSlices
import {
    useGetUsersQuery,
    useRegisterUserMutation,
    useEditUserMutation,
    useChangeAccountStatusMutation,
} from "../api/userApi";

const AdminTable = () => {
    // logged in user details
    const userDetail = useSelector((state: RootState) => state.auth.user);

    const [alert, setAlert] = useState<{
        type: "success" | "error";
        message: string;
    } | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<"create" | "edit" | "view">("create"); // for modal mode, either create or edit
    const [currentAcount, setCurrentAccount] = useState({}); // for edit modal

    const {
        data: allUsers = [],
        isError: allUsersError,
        isSuccess: allUsersSuccess,
        isLoading: allUsersLoading,
        refetch,
    } = useGetUsersQuery();

    const [addAccount] = useRegisterUserMutation();
    const [editAccount] = useEditUserMutation();
    const [changeAccountStatus] = useChangeAccountStatusMutation();

    const handleAddAccountClick = () => {
        setModalMode("create");
        setCurrentAccount({});
        setIsModalOpen(true);
    };

    const handleEditAccountClick = (account: any) => {
        setModalMode("edit");
        setCurrentAccount(account);
        setIsModalOpen(true);
    };

    const handleViewAccountClick = (account: any) => {
        setModalMode("view");
        setCurrentAccount(account);
        setIsModalOpen(true);
    };

    const handleToggleAccountStatus = async (account: any) => {
        try {
            const updatedAccount = await changeAccountStatus(account.account_id).unwrap();

            // Set the success alert
            setAlert({
                type: "success",
                message: updatedAccount.message,
            });
        } catch (error) {
            console.error("Error changing status:", error);

            // Set the error alert
            setAlert({
                type: "error",
                message: `Failed to update the status for user ${account.username}.`,
            });
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const rows = allUsers.map((account) => ({
        ...account,
        id: account.id,
    }));

    const filteredRows = React.useMemo(() => {
        // return data that are only Chairperson
        if (userDetail?.role === "Super Admin" || userDetail?.role === "Federation") {
            return rows.filter((row) => row.role === "Chairperson");
        }

        // return data that are Users on their barangays
        else if (userDetail?.role === "Chairperson") {
            return rows.filter(
                (row) => row.role === "User" && row.barangay === userDetail?.barangay
            );
        }
        // Default, return all rows if no condition is met
        return rows;
    }, [rows, userDetail?.role, userDetail?.barangay]);

    // When the user role changes, we want to refetch the users list to make sure it's accurate
    useEffect(() => {
        refetch();
        // console.log(`${userDetail?.role}:'s list are: `, filteredRows);
    }, [userDetail?.role, refetch]);

    useEffect(() => {
        if (alert) {
            const timeout = setTimeout(() => {
                setAlert(null);
            }, 5000);

            // Cleanup function to clear the timeout if the component unmounts or alert changes
            return () => clearTimeout(timeout);
        }
    }, [alert]);

    const columns = [
        { field: "username", headerName: "Username", minWidth: 200, flex: 1 },
        { field: "email", headerName: "Email", minWidth: 200, flex: 1 },
        {
            field: "account_status",
            headerName: "Account Status",
            minWidth: 200,
            flex: 1,
        },
        {
            field: "role",
            headerName: "Role",
            minWidth: 200,
            flex: 1,
        },
        {
            field: "barangay",
            headerName: "Barangay",
            minWidth: 200,
            flex: 1,
        },
        {
            field: "action",
            headerName: "Action",
            maxWidth: 160,
            renderCell: (params: any) => (
                <Box>
                    <IconButton
                        aria-label="view"
                        onClick={() => handleViewAccountClick(params.row)}
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
                        onClick={() => handleEditAccountClick(params.row)}
                    >
                        <BorderColor
                            sx={{
                                color: "secondary.light",
                                fontSize: "22px",
                            }}
                        />
                    </IconButton>
                    <IconButton
                        aria-label="toggle-status"
                        onClick={() => handleToggleAccountStatus(params.row)}
                    >
                        {params.row.account_status === "active" ? (
                            <ToggleOn
                                sx={{
                                    color: "success.main",
                                    fontSize: "35px",
                                }}
                            />
                        ) : (
                            <ToggleOff
                                sx={{
                                    color: "grey.500",
                                    fontSize: "35px",
                                }}
                            />
                        )}
                    </IconButton>
                </Box>
            ),
        },
    ];

    return (
        <>
            {allUsersSuccess ? (
                <CustomDataGrid
                    rows={filteredRows}
                    getRowId={(row: any, index) => row.id ?? `${row.username}-${index}`}
                    isLoading={allUsersLoading}
                    columns={columns}
                    tableLabel="LIST OF SANGGUNIANG KABATAAN CHAIRPERSON"
                    actionButton={
                        <PrimaryButton
                            size="small"
                            startIcon={<AddCircle />}
                            onClick={handleAddAccountClick}
                        >
                            ADD USER
                        </PrimaryButton>
                    }
                />
            ) : allUsersError ? (
                <ErrorDisplay />
            ) : null}

            {isModalOpen && (
                <CreateNewAdmin
                    mode={modalMode}
                    initialData={currentAcount}
                    onClose={handleCloseModal}
                    addAccount={addAccount}
                    editAccount={editAccount}
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
                    <Alert variant="filled" severity={alert.type}>
                        {alert.message}
                    </Alert>
                </Box>
            )}

            <LoadingDisplay open={allUsersLoading} />
        </>
    );
};

export default AdminTable;
