import React from "react";
import { CircularProgress, Stack, Backdrop } from "@mui/material";

interface LoadingDisplayProps {
    open: boolean;
}

const LoadingDisplay: React.FC<LoadingDisplayProps> = ({ open }) => {
    return (
        <Backdrop
            sx={{
                color: "#fff",
                zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={open}
        >
            <Stack direction="row" justifyContent="center" alignItems="center" height={1}>
                <CircularProgress color="primary" />
            </Stack>
        </Backdrop>
    );
};

export default LoadingDisplay;
