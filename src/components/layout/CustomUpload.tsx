import React from "react";
import { Button } from "@mui/material";

import { CloudUpload } from "@mui/icons-material";

interface CustomUploadProps {
    label?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // Handler for file input change
    accept?: string; // File types to accept
}

const CustomUpload: React.FC<CustomUploadProps> = (props: CustomUploadProps) => {
    return (
        <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            disableElevation
            startIcon={<CloudUpload />}
            sx={{
                borderRadius: "4px",
                background: "#f6f6f6",
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
            {props.label}
            <input type="file" hidden onChange={props.onChange} accept={props.accept} />
        </Button>
    );
};

export default CustomUpload;
