import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import { Visibility, BorderColor, Archive, AddCircle } from "@mui/icons-material";
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
    const [modalMode, setModalMode] = useState<"create" | "edit" | "view">("create"); // for modal mode, either create or edit
    const [currentPublication, setCurrentPublication] = useState({}); // for edit modal

    // logged in user role
    const userDetail = useSelector((state: RootState) => state.auth.user);

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

    // Filter publications based on user role (Super Admin, Federation)
    const filteredRows = React.useMemo(() => {
        if (userDetail?.role === "Super Admin" || userDetail?.role === "Federation") {
            console.log("allPublications: ", allPublications);
            return allPublications; // Show all publications for Super Admin or Federation
        } else if (userDetail?.role === "Chairperson") {
            return allPublications.filter((publication) => publication.type === "Chairperson");
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
                    rows={filteredRows}
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
