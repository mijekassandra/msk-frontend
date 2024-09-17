import React, { useState } from "react";
import { Box, Typography, FormControlLabel, IconButton, Stack, Switch } from "@mui/material";
import { Visibility, BorderColor, Delete, AddCircle } from "@mui/icons-material";
import Swal from "sweetalert2";

//import components
import CustomDataGrid from "../../../layout/CustomDataGrid";
import PrimaryButton from "../../../buttons/PrimaryButton";
import CreateNewAdmin from "./CreateNewAdmin";
import LoadingDisplay from "../../../displays/LoadingDisplay";
import ErrorDisplay from "../../../displays/ErrorDisplay";

// import apiSlices
import {
    useGetAccountsQuery,
    useGetAccountByIDQuery,
    useAddAccountMutation,
    useEditAccountMutation,
    useDeleteAccountMutation,
} from "../api/accountApi";

const AdminTable = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<"create" | "edit" | "view">("create"); // for modal mode, either create or edit
    const [currentAcount, setCurrentAccount] = useState({}); // for edit modal

    const {
        data: allAccounts = [],
        isError: allAccountsError,
        isSuccess: allAccountsSuccess,
        isLoading: allAccountsLoading,
        isFetching: allAccountsFetching,
    } = useGetAccountsQuery();

    const [addAccount] = useAddAccountMutation();
    const [editAccount] = useEditAccountMutation();
    const [deleteAccount] = useDeleteAccountMutation();

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

    const handleCloseModal = () => {
        setIsModalOpen(false); // Close the modal
    };

    const handleDeleteAccount = async (account: any) => {
        // confirmation dialog
        const result = await Swal.fire({
            title: "Delete Account?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Delete!",
        });

        // if final confirmation
        if (result.isConfirmed) {
            try {
                await deleteAccount(account.id);
                Swal.fire("Deleted!", "The account has been deleted.", "success");
            } catch (error) {
                Swal.fire("Error!", "There was an error deleting the account.", "error");
            }
        }
    };

    const getNextId = (account: any) => {
        // get the last announcement's id and increment it by 1
        const lastId = account.length > 0 ? Number(account[account.length - 1].id) : 0;
        return lastId + 1;
    };

    const rows = allAccounts.map((account) => ({
        ...account,
        account_id: account.id,
    }));

    const columns = [
        { field: "username", headerName: "Username", minWidth: 200, flex: 1 },
        { field: "email", headerName: "Email", minWidth: 200, flex: 1 },
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
                    <IconButton aria-label="folder" onClick={() => handleDeleteAccount(params.row)}>
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
            {allAccountsSuccess ? (
                <CustomDataGrid
                    rows={rows}
                    getRowId={(row: any) => row.id}
                    isLoading={allAccountsLoading}
                    columns={columns}
                    totalCount={allAccounts.length}
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
            ) : allAccountsError ? (
                <ErrorDisplay />
            ) : null}

            {isModalOpen && (
                <CreateNewAdmin
                    mode={modalMode}
                    initialData={currentAcount}
                    onClose={handleCloseModal}
                    addAccount={addAccount}
                    editAccount={editAccount}
                    totalCount={getNextId(allAccounts)}
                />
            )}

            <LoadingDisplay open={allAccountsLoading} />
        </>
    );
};

export default AdminTable;
