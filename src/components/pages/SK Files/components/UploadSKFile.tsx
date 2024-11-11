import React, { useState } from "react";
import { Stack, Typography } from "@mui/material";
import ModalVariantThree from "../../../modals/ModalVariantThree";
import PrimaryButton from "../../../buttons/PrimaryButton";
import { FileUploadOutlined } from "@mui/icons-material";

interface UploadSKFileProps {
    onClose: () => void;
    // initialData?: {
    //     id?: number;
    //     file_name?: string;
    //     attachment?: File | null | string;
    //     created_at?: string;
    // };
    onUpload: (formData: FormData) => void;
}

const UploadSKFile: React.FC<UploadSKFileProps> = ({
    onClose,
    // initialData = {},
    onUpload,
}) => {
    const [attachment, setAttachment] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string>("");

    // Handle file selection
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setAttachment(file); // Store the file in state
            setFileName(file.name); // Set file name to show in the state
        }
    };

    // Prepare FormData and trigger the upload function passed as prop
    const handleUploadClick = () => {
        if (attachment) {
            const formData = new FormData();
            formData.append("attachment", attachment);
            formData.append("file_name", fileName);

            onUpload(formData);
            onClose();
        } else {
            alert("Please select a file to upload.");
        }
    };

    return (
        <ModalVariantThree
            onClose={onClose}
            headerTitle="UPLOAD FILES"
            headerIcon={<FileUploadOutlined sx={{ fontSize: "16px" }} />}
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
