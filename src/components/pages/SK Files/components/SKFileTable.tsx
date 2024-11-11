import React, { useState } from "react";
import { Box, IconButton, Stack, Alert, Typography } from "@mui/material";
import Swal from "sweetalert2";
import {
    Download,
    Visibility,
    Delete,
    Publish,
    Description,
    PictureAsPdf,
    InsertPhoto,
    Slideshow,
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
    useUpdateSkFileByIdMutation,
    useDeleteSkFileMutation,
} from "../api/skFileApi";

const { VITE_FILE_ENDPOINT } = import.meta.env;

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
    const [alert, setAlert] = useState<string | null>(null);

    //TODO UPLOAD
    const handleFileUpload = async (formData: FormData) => {
        try {
            const response = await uploadSkFile(formData);
            // formData.forEach((value, key) => {
            //     console.log(`FormData Key: ${key}, Value:`, value);
            // });
            console.log("response: ", response);

            if (response.error) {
                setAlert(response.error.data.message);

                setTimeout(() => {
                    setAlert(null);
                }, 4000);
            } else if (response.data.status === "success") {
                Swal.fire({
                    title: "Upload Success!",
                    text: "File has been successfully uploaded.",
                    icon: "success",
                    confirmButtonText: "OK",
                    customClass: {
                        title: "my-swal-title",
                        htmlContainer: "my-swal-text",
                        popup: "my-swal-popup",
                        confirmButton: "my-swal-button",
                    },
                });
            }
            setIsModalOpen(false);
        } catch (error) {
            console.error("Upload error:", error);
            setAlert("Failed to upload file.");
        }
    };

    //TODO DELETE
    const handleDeleteFile = async (file: any) => {
        // confirmation dialog
        const result = await Swal.fire({
            title: "Delete File?",
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
                const response = await deleteSkFile(file.id);
                // console.log("response: ", response);
                // console.log("response: ", file.id);

                if (response.error) {
                    setAlert(response.error.data.message);

                    setTimeout(() => {
                        setAlert(null);
                    }, 4000);
                } else if (response.data.status === "success") {
                    Swal.fire({
                        title: "Deleted!",
                        text: "The File has been deleted.",
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

    //TODO DOWNLOAD
    const handleDownload = async (file: any) => {
        const fileUrl = `${VITE_FILE_ENDPOINT}${file.attachment}`;

        try {
            // Fetch the file as a blob to ensure it downloads instead of opening
            const response = await fetch(fileUrl);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);

            // Create an anchor element to trigger the download
            const link = document.createElement("a");
            link.href = blobUrl;
            link.setAttribute("download", file.file_name); // Set download attribute for file name

            // Append, click, and clean up
            document.body.appendChild(link);
            link.click();
            URL.revokeObjectURL(blobUrl); // Revoke blob URL after download
            document.body.removeChild(link);
        } catch (error) {
            console.error("Failed to download file:", error);
        }
    };

    const columns = [
        {
            field: "file_type",
            headerName: "File Type",
            maxWidth: 130,
            renderCell: (params: any) => {
                const fileName = params.row.attachment;
                const fileType = fileName.split(".").pop()?.toLowerCase();

                // console.log("params.row", params.row);
                // console.log("filetype", fileType);
                let IconComponent = Description;
                let iconColor = "#2196f3";

                // Determine the correct icon and color based on file type
                if (fileType === "pdf") {
                    IconComponent = PictureAsPdf;
                    iconColor = "red"; // PDF - Red
                } else if (["jpg", "jpeg", "png", "gif"].includes(fileType)) {
                    IconComponent = InsertPhoto;
                    iconColor = "green"; // Image - Green
                } else if (["doc", "docx"].includes(fileType)) {
                    IconComponent = Description;
                    iconColor = "blue"; // Document - Blue
                } else if (["ppt", "pptx"].includes(fileType)) {
                    IconComponent = Slideshow;
                    iconColor = "orange"; // PowerPoint - Orange
                }

                return (
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <IconComponent
                            sx={{ color: iconColor, fontSize: "22px" }}
                        />
                        <Typography variant="caption">{fileType}</Typography>
                    </Stack>
                );
            },
        },
        { field: "file_name", headerName: "Filename", minWidth: 250 },
        {
            field: "file_size",
            headerName: "Filesize",
            maxWidth: 100,
            renderCell: (params: any) => {
                const fileSizeInBytes = params.value;
                const fileSizeInMB = (fileSizeInBytes / (1024 * 1024)).toFixed(
                    2
                ); // Convert to MB and limit to 2 decimal places
                return <span>{fileSizeInMB} MB</span>;
            },
        },
        { field: "created_at", headerName: "Date Upload", maxWidth: 160 },
        {
            field: "action",
            headerName: "Action",
            maxWidth: 160,
            renderCell: (params: any) => (
                <Box>
                    <IconButton
                        aria-label="download"
                        onClick={() => handleDownload(params.row)}
                    >
                        <Download
                            sx={{ color: "secondary.main", fontSize: "22px" }}
                        />
                    </IconButton>
                    <IconButton aria-label="view">
                        <Visibility
                            sx={{ color: "primary.dark", fontSize: "22px" }}
                        />
                    </IconButton>
                    <IconButton
                        aria-label="delete"
                        onClick={() => handleDeleteFile(params.row)}
                    >
                        <Delete
                            sx={{ color: "error.main", fontSize: "22px" }}
                        />
                    </IconButton>
                </Box>
            ),
        },
    ];

    return (
        <>
            {allSkFilesSuccess ? (
                <CustomDataGrid
                    rows={allSkFiles.skFiles}
                    columns={columns}
                    isLoading={allSkFilesLoading}
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

            {isModalOpen && (
                <UploadSKFile
                    onClose={handleCloseModal}
                    onUpload={handleFileUpload}
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

            <LoadingDisplay open={allSkFilesLoading} />
        </>
    );
};

export default SKFileTable;
