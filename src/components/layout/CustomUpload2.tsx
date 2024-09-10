import React from "react";
import { Button } from "@mui/material";

import { CloudUpload, Panorama } from "@mui/icons-material";

interface CustomUpload2Props {
    label?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // Handler for file input change
    accept?: string; // File types to accept
}

const CustomUpload2: React.FC<CustomUpload2Props> = (props: CustomUpload2Props) => {
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
            {props.label}
            <input type="file" hidden onChange={props.onChange} accept={props.accept} />
        </Button>
    );
};

export default CustomUpload2;
