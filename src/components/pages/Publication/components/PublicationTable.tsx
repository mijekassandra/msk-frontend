import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import {
  Visibility,
  BorderColor,
  Archive,
  AddCircle,
} from "@mui/icons-material";

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
  ); // for modal mode, either create or edit
  const [currentPublication, setCurrentPublication] = useState({}); // for edit modal

  const {
    data: allPublications = [],
    isError: allPublicationsError,
    isSuccess: allPublicationsSuccess,
    isLoading: allPublicationsLoading,
  } = useGetPublicationsQuery();

  //   console.log("data pub: ", allPublications);

  //mutations
  const [addPublication] = useAddPublicationMutation();
  const [editPublication] = useEditPublicationMutation();

  const handleCreatePublicationClick = () => {
    setModalMode("create");
    setCurrentPublication({});
    setIsModalOpen(true); // Open the modal
  };

  const handleEditPublicationClick = (publication: any) => {
    setModalMode("edit");
    setCurrentPublication(publication);
    setIsModalOpen(true); // Open the modal
  };

  const handleViewPublicationClick = (publication: any) => {
    setModalMode("view");
    setCurrentPublication(publication);
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const rows = allPublications.map((publication) => ({
    ...publication,
    id: publication.id,
  }));

  const columns = [
    { field: "title", headerName: "Title", minWidth: 300, flex: 1 },
    { field: "type", headerName: "Type", maxWidth: 160 },
    { field: "created_at", headerName: "Date Publish", maxWidth: 160 },
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
        </Box>
      ),
    },
  ];

  return (
    <>
      {allPublicationsSuccess ? (
        <CustomDataGrid
          rows={rows}
          columns={columns}
          isLoading={allPublicationsLoading}
          tableLabel="LIST OF PUBLICATIONS"
          actionButton={
            <PrimaryButton
              size="small"
              startIcon={<AddCircle />}
              onClick={handleCreatePublicationClick}
            >
              CREATE PUBLICATION
            </PrimaryButton>
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
