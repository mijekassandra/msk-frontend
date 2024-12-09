import { useState, useEffect } from "react";
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
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

// Import components
import CustomDataGrid from "../../../layout/CustomDataGrid";
import PrimaryButton from "../../../buttons/PrimaryButton";
import UploadSKFile from "./UploadSKFile";
import ErrorDisplay from "../../../displays/ErrorDisplay";
import LoadingDisplay from "../../../displays/LoadingDisplay";
import { formatDateTime } from "../../../../utils/dateTimeUtil";

// Import API
import {
    useGetSkFilesQuery,
    useUploadSkFileMutation,
    useDeleteSkFileMutation,
} from "../api/skFileApi";

const { VITE_FILE_ENDPOINT } = import.meta.env;

const SKFileTable = ({ filteredFiles }) => {
    // logged in user role
    const userDetail = useSelector((state: RootState) => state.auth.user);

    // Fetch adminMode and selectedBarangay from the Redux store
    const adminMode = useSelector((state: RootState) => state.admin.adminMode);
    const selectedBarangay = useSelector(
        (state: RootState) => state.admin.selectedBarangay
    );

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
    const [loading, setLoading] = useState(false);

    //TODO Filter the files based on file_type if filteredFiles is provided
    // Filter only if filteredFiles is defined and non-empty
    const filteredRows =
        filteredFiles && filteredFiles !== ""
            ? allSkFiles.skFiles?.filter(
                  (file) => file.file_type === filteredFiles
              )
            : allSkFiles.skFiles || [];

    //TODO UPLOAD
    const handleFileUpload = async (formData: FormData) => {
        setLoading(true); // Start loading

        try {
            const response = await uploadSkFile(formData);

            console.log("response is: ", response);
            if (response.error) {
                const errorMessage =
                    response.error.data.error?.message ||
                    response.error.data.message;

                setAlert(errorMessage);
                console.log("error mess: ", alert);
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
                setIsModalOpen(false);
            }
        } catch (error) {
            console.error("Upload error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (alert) {
            console.log("Alert updated:", alert);
        }
    }, [alert]);

    //TODO DELETE
    const handleDeleteFile = async (file: any) => {
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
            URL.revokeObjectURL(blobUrl);
            document.body.removeChild(link);
        } catch (error) {
            console.error("Failed to download file:", error);
        }
    };

    //TODO VIEW
    const handleView = (file: any) => {
        const fileUrl = `${VITE_FILE_ENDPOINT}${file.attachment}`;
        window.open(fileUrl, "_blank");
    };

    const columns = [
        {
            // field: "file_type",
            headerName: "File Format",
            maxWidth: 120,
            renderCell: (params: any) => {
                const fileName = params.row.attachment;
                const fileType = fileName.split(".").pop()?.toLowerCase();

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
        { field: "file_type", headerName: "File Type", minWidth: 250 },
        {
            field: "file_size",
            headerName: "Filesize",
            maxWidth: 150,
            renderCell: (params: any) => {
                const fileSizeInBytes = params.row.file_size;
                return <span>{fileSizeInBytes} MB</span>;
            },
        },
        {
            field: "created_at",
            headerName: "Date Publish",
            maxWidth: 160,
            valueFormatter: (params: any) => formatDateTime(params),
        },
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
                    <IconButton
                        aria-label="view"
                        onClick={() => handleView(params.row)}
                    >
                        <Visibility
                            sx={{ color: "primary.dark", fontSize: "22px" }}
                        />
                    </IconButton>
                    {!adminMode &&
                    !selectedBarangay &&
                    userDetail?.role !== "Super Admin" ? (
                        <IconButton
                            aria-label="delete"
                            onClick={() => handleDeleteFile(params.row)}
                        >
                            <Delete
                                sx={{ color: "error.main", fontSize: "22px" }}
                            />
                        </IconButton>
                    ) : null}
                </Box>
            ),
        },
    ];

    return (
        <>
            {allSkFilesSuccess ? (
                <CustomDataGrid
                    rows={filteredRows}
                    columns={columns}
                    isLoading={allSkFilesLoading}
                    tableLabel="LIST OF FILES"
                    actionButton={
                        !adminMode &&
                        !selectedBarangay &&
                        userDetail?.role !== "Super Admin" ? (
                            <PrimaryButton
                                size="small"
                                startIcon={<Publish />}
                                onClick={handleUploadFileClick}
                            >
                                Upload File
                            </PrimaryButton>
                        ) : null
                    }
                />
            ) : allSkFilesError ? (
                <ErrorDisplay />
            ) : null}

            {isModalOpen && (
                <UploadSKFile
                    onClose={handleCloseModal}
                    onUpload={handleFileUpload}
                    fileTypeError={alert}
                    loading={loading}
                />
            )}

            {alert && (
                <Box
                    sx={{
                        position: "fixed",
                        bottom: 16,
                        right: 16,
                        zIndex: 100000,
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
