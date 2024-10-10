import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import {
  Visibility,
  BorderColor,
  Delete,
  AddCircle,
} from "@mui/icons-material";
import Swal from "sweetalert2";

//import components
import CustomDataGrid from "../../../layout/CustomDataGrid";
import PrimaryButton from "../../../buttons/PrimaryButton";
import CreateNewAdmin from "./CreateNewAdmin";
import LoadingDisplay from "../../../displays/LoadingDisplay";
import ErrorDisplay from "../../../displays/ErrorDisplay";

// import apiSlices
import {
  useGetUsersQuery,
  useGetUserByIDQuery,
  useRegisterUserMutation,
  useEditUserMutation,
  useDeleteUserMutation,
} from "../api/userApi";

const AdminTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit" | "view">(
    "create"
  ); // for modal mode, either create or edit
  const [currentAcount, setCurrentAccount] = useState({}); // for edit modal

  const {
    data: allUsers = [],
    isError: allUsersError,
    isSuccess: allUsersSuccess,
    isLoading: allUsersLoading,
  } = useGetUsersQuery();

  const [addAccount] = useRegisterUserMutation();
  const [editAccount] = useEditUserMutation();
  const [deleteAccount] = useDeleteUserMutation();

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
      customClass: {
        title: "my-swal-title",
        htmlContainer: "my-swal-text",
        popup: "my-swal-popup",
      },
    });

    // if final confirmation
    if (result.isConfirmed) {
      try {
        await deleteAccount(account.id);
        Swal.fire({
          title: "Deleted!",
          text: "Your account has been deleted.",
          icon: "success",
          customClass: {
            title: "my-swal-title",
            htmlContainer: "my-swal-text",
            popup: "my-swal-popup",
            confirmButton: "my-swal-button",
          },
          confirmButtonText: "OK",
        });
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  };

  const rows = allUsers.map((account) => ({
    ...account,
    id: account.id,
  }));

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
            aria-label="folder"
            onClick={() => handleDeleteAccount(params.row)}
          >
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
      {allUsersSuccess ? (
        <CustomDataGrid
          rows={rows}
          // getRowId={(row) => row.id}
          getRowId={(row, index) => row.id ?? `${row.username}-${index}`} // For the mean time, use id if available, otherwise generate one
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

      <LoadingDisplay open={allUsersLoading} />
    </>
  );
};

export default AdminTable;
