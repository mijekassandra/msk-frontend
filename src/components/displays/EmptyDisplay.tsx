import React from "react";
import { Stack, Typography } from "@mui/material";

// import image
import EmptyImage from "../../assets/EmptyPage.png";

interface EmptyDisplayProps {
    label?: string;
}

const EmptyDisplay: React.FC<EmptyDisplayProps> = ({ label }) => {
    return (
        <Stack alignItems="center" justifyContent="center" height={1} gap={1}>
            <img src={EmptyImage} width="250px" alt="Empty page" />

            <Typography variant="subtitle1">{label || "No content to display!"}</Typography>
        </Stack>
    );
};
export default EmptyDisplay;
