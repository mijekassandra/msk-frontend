import React, { useState } from "react";
import { Button, IconButton, Box } from "@mui/material";

import { Panorama, Close } from "@mui/icons-material";

interface CustomUpload2Props {
    label?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // Handler for file input change
    accept?: string; // File types to accept
}

const CustomUpload2: React.FC<CustomUpload2Props> = (props: CustomUpload2Props) => {
    const [fileName, setFileName] = useState<string | null>(null);

    // Handle file input change
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setFileName(file.name); // Update state with the selected file name
        }
        if (props.onChange) {
            props.onChange(event); // Call the parent onChange handler if provided
        }
    };

    const handleRemoveFile = (event: React.ChangeEvent<HTMLButtonElement>) => {
        setFileName("");
    };

    return (
        <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            disableElevation
            endIcon={
                <Panorama
                    sx={{
                        color: "success.light",
                        fontSize: "100px",
                    }}
                />
            }
            sx={{
                borderRadius: "4px",
                background: "#f6f6f6",
                display: "flex",
                justifyContent: "space-between",
                color: "#8a8a8a",
                "& .MuiButton-startIcon": {
                    color: "#8a8a8a",
                },
                "&:hover": {
                    background: "#e2e2e2",
                    color: "#8a8a8a",
                    "& .MuiButton-startIcon": {
                        color: "#8a8a8a",
                    },
                },
            }}
        >
            {/* Show the file name if it exists, otherwise show the label */}
            <Box>
                {/* <IconButton onClick={handleRemoveFile}>
                    <Close
                        sx={{
                            fontSize: "20px",
                            fontWeight: "bold",
                        }}
                    />
                </IconButton> */}
                {fileName || props.label || "Upload"}
                <input type="file" hidden onChange={handleFileChange} accept={props.accept} />
            </Box>
        </Button>
    );
};

export default CustomUpload2;
