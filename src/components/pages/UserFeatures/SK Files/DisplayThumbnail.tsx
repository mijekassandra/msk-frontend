import React from "react";

// Import icons
import pdfLogo from "../../../../assets/pdf-logo.png";
import docxLogo from "../../../../assets/docx-logo.png";
import pptLogo from "../../../../assets/ppt-logo.png";

interface DisplayThumbnailProps {
    fileUrl: string; // URL or path to the file
}
const DisplayThumbnail: React.FC<DisplayThumbnailProps> = ({ fileUrl }) => {
    // Determine file type based on the file extension
    const fileExtension = fileUrl.split(".").pop()?.toLowerCase();

    let icon;
    if (fileExtension === "pdf") {
        icon = pdfLogo;
    } else if (fileExtension === "ppt" || fileExtension === "pptx") {
        icon = pptLogo;
    } else if (fileExtension === "docx" || fileExtension === "doc") {
        icon = docxLogo;
    }

    // Handle file click behavior
    const handleFileClick = () => {
        if (fileExtension === "pdf") {
            // Open PDF in a new tab
            window.open(fileUrl, "_blank");
        } else if (
            fileExtension === "ppt" ||
            fileExtension === "pptx" ||
            fileExtension === "docx" ||
            fileExtension === "doc"
        ) {
            // Trigger download for PPT or DOCX
            const link = document.createElement("a");
            link.href = fileUrl;
            link.download = fileUrl.split("/").pop(); // Extract filename from URL
            link.click();
        } else {
            alert("Unsupported file type");
        }
    };

    return (
        <div
            onClick={handleFileClick}
            style={{
                width: "100px",
                height: "100px",
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
                style={{ width: "60px", height: "auto" }}
            />
        </div>
    );
};

export default DisplayThumbnail;
