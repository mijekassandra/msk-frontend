import React, { useState } from "react";
import { Stack, Typography, TextField, MenuItem } from "@mui/material";
import ModalVariantThree from "../../../modals/ModalVariantThree";
import PrimaryButton from "../../../buttons/PrimaryButton";
import { FileUploadOutlined } from "@mui/icons-material";

interface UploadSKFileProps {
    onClose: () => void;
    onUpload: (formData: FormData) => void;
    fileTypeError?: string | null;
}

const UploadSKFile: React.FC<UploadSKFileProps> = ({
    onClose,
    onUpload,
    fileTypeError,
}) => {
    const [attachment, setAttachment] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string>("");
    const [fileType, setFileType] = useState<string>("");
    const [error, setError] = useState<string>("");

    // Handle file selection
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setAttachment(file);
            setFileName(file.name);
            setFileType("");
            setError("");
        }
    };

    // Handle file type change
    const handleInputChange = (
        event: React.ChangeEvent<{ value: unknown }>
    ) => {
        setFileType(event.target.value as string);
    };

    const handleUploadClick = async () => {
        //! Step 1: Check if a file is selected
        if (!attachment) {
            setError("Please select a file to upload.");
            return;
        }

        //! Step 2: Check if the file type is selected
        if (!fileType) {
            setError("Please select a file type before uploading.");
            return;
        }

        if (fileTypeError === "INVALID FILE TYPE") {
            setError("Unsupported file format.");
        }

        //! Step 3: If both are valid, prepare FormData
        const formData = new FormData();
        formData.append("attachment", attachment);
        formData.append("file_name", fileName);
        formData.append("file_type", fileType);

        //Todo Trigger the onUpload function (the async file upload logic)
        onUpload(formData);
    };

    return (
        <ModalVariantThree
            onClose={onClose}
            headerTitle="UPLOAD FILES"
            headerIcon={<FileUploadOutlined sx={{ fontSize: "16px" }} />}
            content={
                <Stack gap={1.5}>
                    <Stack>
                        <Stack
                            sx={{
                                border: "1px solid gray",
                                padding: "5px 10px",
                            }}
                        >
                            <Typography>
                                File Type:{" "}
                                <span style={{ color: "red" }}>
                                    .docx .doc .pptx .ppt .xlsx .xls .pdf .odt
                                </span>
                            </Typography>
                        </Stack>
                        <Stack
                            spacing={1.5}
                            sx={{
                                borderInline: "1px solid gray",
                                borderBottom: "1px solid gray",
                                padding: "15px 10px",
                            }}
                        >
                            <input type="file" onChange={handleFileChange} />
                            <Stack direction="row" gap={2}>
                                <TextField
                                    fullWidth
                                    select
                                    size="small"
                                    variant="outlined"
                                    name="file_type"
                                    value={fileType}
                                    onChange={handleInputChange}
                                    label="Select File Type"
                                    InputLabelProps={{
                                        shrink: false,
                                        style: {
                                            display: fileType
                                                ? "none"
                                                : "block",
                                        },
                                    }}
                                >
                                    <MenuItem value="" disabled>
                                        Select File Type
                                    </MenuItem>
                                    <MenuItem value="administrative">
                                        Administrative
                                    </MenuItem>
                                    <MenuItem value="financial">
                                        Financial
                                    </MenuItem>
                                    <MenuItem value="project">Project</MenuItem>
                                </TextField>
                            </Stack>
                        </Stack>
                    </Stack>

                    {/* Error message */}
                    {error && (
                        <Typography
                            variant="caption"
                            textAlign="right"
                            color="error.main"
                        >
                            {error}
                        </Typography>
                    )}
                    <PrimaryButton size="small" onClick={handleUploadClick}>
                        UPLOAD FILE
                    </PrimaryButton>
                </Stack>
            }
        />
    );
};

export default UploadSKFile;
