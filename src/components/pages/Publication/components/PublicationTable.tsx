import React, { useState, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import {
  Visibility,
  BorderColor,
  Archive,
  AddCircle,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { formatDateTime } from "../../../../utils/dateTimeUtil.js";

// import components
import CustomDataGrid from "../../../layout/CustomDataGrid";
import PrimaryButton from "../../../buttons/PrimaryButton";
import CreateNewPublication from "./CreateNewPublication";
import ErrorDisplay from "../../../displays/ErrorDisplay";
import LoadingDisplay from "../../../displays/LoadingDisplay";

// import apiSlices
import {
  useGetPublicationsQuery,
  useAddPublicationMutation,
  useEditPublicationMutation,
} from "../api/publicationApi";

const PublicationTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit" | "view">(
    "create"
  );
  const [currentPublication, setCurrentPublication] = useState({}); // for edit modal

  // logged in user role
  const userDetail = useSelector((state: RootState) => state.auth.user);

  // Fetch adminMode and selectedBarangay from the Redux store
  const adminMode = useSelector((state: RootState) => state.admin.adminMode);
  const selectedBarangay = useSelector(
    (state: RootState) => state.admin.selectedBarangay
  );

  const {
    data: allPublications = [],
    isError: allPublicationsError,
    isSuccess: allPublicationsSuccess,
    isLoading: allPublicationsLoading,
    refetch,
  } = useGetPublicationsQuery();

  //mutations
  const [addPublication] = useAddPublicationMutation();
  const [editPublication] = useEditPublicationMutation();

  const handleCreatePublicationClick = () => {
    setModalMode("create");
    setCurrentPublication({});
    setIsModalOpen(true);
  };

  const handleEditPublicationClick = (publication: any) => {
    setModalMode("edit");
    setCurrentPublication(publication);
    setIsModalOpen(true);
  };

  const handleViewPublicationClick = (publication: any) => {
    setModalMode("view");
    setCurrentPublication(publication);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Force refetch if needed
  useEffect(() => {
    refetch();
  }, []);

  // const rows = allPublications.map((publication) => ({
  //     ...publication,
  //     id: publication.id,
  // }));

  //   Filter publications based on user role (Super Admin, Federation)
  const filteredRows = React.useMemo(() => {
    if (adminMode && selectedBarangay) {
      // return barangay based on the selected barangay
      console.log("all pub, ", allPublications);
      return allPublications.filter(
        (publication) => publication.brgy_id === selectedBarangay
      );
    }

    return allPublications;
  }, [allPublications, userDetail?.role]);

  const columns = [
    { field: "title", headerName: "Title", minWidth: 300, flex: 1 },
    { field: "type", headerName: "Type", maxWidth: 160 },
    {
      field: "created_at",
      headerName: "Date Publish",
      maxWidth: 160,
      valueFormatter: (params) => formatDateTime(params),
    },
    {
      field: "updated_at",
      headerName: "Date Updated",
      maxWidth: 160,
      valueFormatter: (params) => formatDateTime(params),
    },
    {
      field: "action",
      headerName: "Action",
      maxWidth: 160,
      renderCell: (params: any) => (
        <Box>
          <IconButton
            aria-label="view"
            onClick={() => handleViewPublicationClick(params.row)}
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
                onClick={() => handleEditPublicationClick(params.row)}
              >
                <BorderColor
                  sx={{
                    color: "secondary.light",
                    fontSize: "22px",
                  }}
                />
              </IconButton>
              <IconButton aria-label="archive">
                <Archive
                  sx={{
                    color: "secondary.main",
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
      {allPublicationsSuccess ? (
        <CustomDataGrid
          rows={allPublications}
          columns={columns}
          isLoading={allPublicationsLoading}
          tableLabel="LIST OF PUBLICATIONS"
          actionButton={
            !adminMode && !selectedBarangay ? (
              <PrimaryButton
                size="small"
                startIcon={<AddCircle />}
                onClick={handleCreatePublicationClick}
              >
                CREATE PUBLICATION
              </PrimaryButton>
            ) : null
          }
        />
      ) : allPublicationsError ? (
        <ErrorDisplay />
      ) : null}

      {isModalOpen && (
        <CreateNewPublication
          mode={modalMode}
          initialData={currentPublication}
          onClose={handleCloseModal}
          addPublication={addPublication}
          editPublication={editPublication}
        />
      )}

      <LoadingDisplay open={allPublicationsLoading} />
    </>
  );
};

export default PublicationTable;
