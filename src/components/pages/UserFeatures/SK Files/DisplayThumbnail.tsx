import React from "react";
import { Box, Stack, Typography } from "@mui/material";

// Import icons
import pdfLogo from "../../../../assets/pdf-logo.png";
import docxLogo from "../../../../assets/doc-logo.png";
import excelLogo from "../../../../assets/excel-logo.png";
import defaultLogo from "../../../../assets/default-logo.png";

interface DisplayThumbnailProps {
    fileUrl: string; // URL or path to the file
    file_name: string;
}
const DisplayThumbnail: React.FC<DisplayThumbnailProps> = ({
    fileUrl,
    file_name,
}) => {
    // Determine file type based on the file extension
    const fileExtension = fileUrl.split(".").pop()?.toLowerCase();

    let icon;
    if (fileExtension === "pdf") {
        icon = pdfLogo;
    } else if (fileExtension === "csv" || fileExtension === "xls") {
        icon = excelLogo;
    } else if (fileExtension === "docx" || fileExtension === "doc") {
        icon = docxLogo;
    } else {
        icon = defaultLogo;
    }

    const handleFileClick = async () => {
        // Determine the file extension
        const fileExtension = fileUrl.split(".").pop()?.toLowerCase();

        if (fileExtension === "pdf") {
            // If the file is a PDF, open it in a new tab
            window.open(fileUrl, "_blank");
        } else {
            // For other file types, download with a custom filename
            try {
                // Fetch the file as a binary blob
                const response = await fetch(fileUrl);
                const blob = await response.blob();

                // Create a download link and set its href to the Blob URL
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);

                // Set the download attribute to the desired filename from the `file_name` prop
                link.download = file_name;

                // Append the link to the document, trigger click, and remove it
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                // Revoke the blob URL after download to free memory
                URL.revokeObjectURL(link.href);
            } catch (error) {
                console.error("Failed to download file:", error);
            }
        }
    };

    return (
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            rowGap={2}
            sx={{
                width: "170px",
            }}
        >
            <Stack
                sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    height: "40px",
                }}
            >
                <Typography
                    variant="h5"
                    textTransform="uppercase"
                    textAlign="center"
                    sx={{
                        overflowWrap: "break-word",
                        wordWrap: "break-word",
                        lineHeight: 1,
                        marginBottom: "8px",
                    }}
                >
                    {file_name}
                </Typography>
            </Stack>

            <Box
                onClick={handleFileClick}
                style={{
                    width: "120px",
                    height: "120px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    overflow: "hidden",
                    cursor: "pointer",
                }}
            >
                <img
                    src={icon}
                    alt={`${fileExtension} thumbnail`}
                    style={{ width: "75px", height: "auto" }}
                />
            </Box>

            <Box
                sx={{
                    borderRadius: "8px",
                    border: "1px solid #71797E",
                    padding: "8px",
                }}
            >
                <Typography
                    variant="subtitle1"
                    textTransform="uppercase"
                    textAlign="center"
                    marginInline="20px"
                >
                    {fileExtension} FILE
                </Typography>
            </Box>
        </Stack>
    );
};

export default DisplayThumbnail;
