import React, { useState } from "react";
import { Stack, Typography } from "@mui/material";
import ModalVariantThree from "../../../modals/ModalVariantThree";
import PrimaryButton from "../../../buttons/PrimaryButton";

interface UploadSKFileProps {
    onClose: () => void;
    onUpload: (formData: FormData) => void;
}

const UploadSKFile: React.FC<UploadSKFileProps> = ({ onClose, onUpload }) => {
    // Single state object to manage file data
    const [fileData, setFileData] = useState<{
        file: File | null;
        fileName: string;
        fileType: string;
        fileSize: number;
    }>({
        file: null,
        fileName: "",
        fileType: "",
        fileSize: 0,
    });

    // Handle file input change
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setFileData({
                file: file,
                fileName: file.name,
                fileType: file.name.split(".").pop() || "",
                fileSize: file.size,
            });
        }
    };

    // Handle upload button click
    const handleUploadClick = () => {
        if (fileData.file) {
            // Create FormData object
            const formData = new FormData();
            formData.append("file_name", fileData.fileName);
            formData.append("file_size", fileData.fileSize.toString());
            formData.append("file_type", fileData.fileType);
            formData.append("upload_file", fileData.file);

            onUpload(formData);
        }
    };

    return (
        <ModalVariantThree
            onClose={onClose}
            headerTitle="UPLOAD FILES"
            content={
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
                        <PrimaryButton size="small" onClick={handleUploadClick}>
                            UPLOAD FILE
                        </PrimaryButton>
                    </Stack>
                </Stack>
            }
        />
    );
};

export default UploadSKFile;
