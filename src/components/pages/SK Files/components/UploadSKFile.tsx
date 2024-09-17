import React from "react";
import { Box, Typography, FormControlLabel, IconButton, Stack, Switch } from "@mui/material";

// import components
import ModalVariantThree from "../../../modals/ModalVariantThree";
import PrimaryButton from "../../../buttons/PrimaryButton";

interface UploadSKFileProps {
    id: string;
    file_name?: string;
    upload_file: string;
    onClose: () => void;
}

const UploadSKFile: React.FC<UploadSKFileProps> = (props: UploadSKFileProps) => {
    return (
        <ModalVariantThree
            onClose={props.onClose}
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
                            <span
                                style={{
                                    color: "red",
                                }}
                            >
                                .docx .doc .pptx .ppt .xlsx .xls .pdf .odt
                            </span>{" "}
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
                        <input type="file"></input>
                        <PrimaryButton size="small">UPLOAD FILE</PrimaryButton>
                    </Stack>
                </Stack>
            }
        ></ModalVariantThree>
    );
};

export default UploadSKFile;
