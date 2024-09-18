import React, { useState } from "react";
import { Box, IconButton, Stack } from "@mui/material";
import Swal from "sweetalert2";
import {
    Download,
    Visibility,
    Delete,
    Publish,
    Description,
    PictureAsPdf,
} from "@mui/icons-material";

// Import components
import CustomDataGrid from "../../../layout/CustomDataGrid";
import PrimaryButton from "../../../buttons/PrimaryButton";
import UploadSKFile from "./UploadSKFile";
import ErrorDisplay from "../../../displays/ErrorDisplay";
import LoadingDisplay from "../../../displays/LoadingDisplay";

// Import API
import {
    useGetSkFilesQuery,
    useUploadSkFileMutation,
    useDeleteSkFileMutation,
} from "../api/skFileApi";

const SKFileTable = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {
        data: allSkFiles = [],
        isError: allSkFilesError,
        isSuccess: allSkFilesSuccess,
        isLoading: allSkFilesLoading,
    } = useGetSkFilesQuery();

    // mutations
    const [uploadSkFile] = useUploadSkFileMutation();
    const [deleteSkFile] = useDeleteSkFileMutation();

    // open and close modal
    const handleUploadFileClick = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    // Handle file upload
    const handleFileUpload = async (formData: FormData) => {
        try {
            // Show loading alert
            Swal.fire({
                title: "Uploading...",
                text: "Please wait while the file is being uploaded.",
                icon: "info",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
                customClass: {
                    title: "my-swal-title",
                    htmlContainer: "my-swal-text",
                    popup: "my-swal-popup",
                    confirmButton: "my-swal-button",
                },
            });

            // Perform the file upload
            await uploadSkFile(formData).unwrap();

            // Show success alert
            Swal.fire({
                title: "Success",
                text: "File uploaded successfully!",
                icon: "success",
                customClass: {
                    title: "my-swal-title",
                    htmlContainer: "my-swal-text",
                    popup: "my-swal-popup",
                    confirmButton: "my-swal-button",
                },
            });

            // Close the modal
            handleCloseModal();
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    const rows = allSkFiles.map((file) => ({
        ...file,
        file_id: file.id,
    }));

    const columns = [
        {
            field: "file_type",
            headerName: "File Type",
            maxWidth: 130,
            renderCell: (params: any) => {
                const fileType = params.value;
                return (
                    <Stack direction="row" alignItems="center" spacing={1}>
                        {fileType === "docx" && (
                            <Description sx={{ color: "#2196f3", fontSize: "22px" }} />
                        )}
                        {fileType === "pdf" && (
                            <PictureAsPdf sx={{ color: "error.main", fontSize: "22px" }} />
                        )}
                        <span>{fileType}</span>
                    </Stack>
                );
            },
        },
        { field: "file_name", headerName: "Filename", minWidth: 250 },
        { field: "file_size", headerName: "Filesize", maxWidth: 100 },
        { field: "upload_date", headerName: "Date Upload", maxWidth: 160 },
        {
            field: "action",
            headerName: "Action",
            maxWidth: 160,
            renderCell: (params: any) => (
                <Box>
                    <IconButton aria-label="download">
                        <Download sx={{ color: "secondary.main", fontSize: "22px" }} />
                    </IconButton>
                    <IconButton aria-label="view">
                        <Visibility sx={{ color: "primary.dark", fontSize: "22px" }} />
                    </IconButton>
                    <IconButton aria-label="delete">
                        <Delete sx={{ color: "error.main", fontSize: "22px" }} />
                    </IconButton>
                </Box>
            ),
        },
    ];

    return (
        <>
            {allSkFilesSuccess ? (
                <CustomDataGrid
                    rows={rows}
                    columns={columns}
                    isLoading={allSkFilesLoading}
                    totalCount={allSkFiles.length}
                    tableLabel="LIST OF FILES"
                    actionButton={
                        <PrimaryButton
                            size="small"
                            startIcon={<Publish />}
                            onClick={handleUploadFileClick}
                        >
                            Upload File
                        </PrimaryButton>
                    }
                />
            ) : allSkFilesError ? (
                <ErrorDisplay />
            ) : null}

            {isModalOpen && <UploadSKFile onClose={handleCloseModal} onUpload={handleFileUpload} />}

            <LoadingDisplay open={allSkFilesLoading} />
        </>
    );
};

export default SKFileTable;
