import React from "react";
import { Stack, Typography } from "@mui/material";

// import image
import DefaultLogo from "../../assets/SKFed.png";

interface BarangaySealProps {
    barangay?: string;
    barangayLogo?: string;
}

const BarangaySeal: React.FC<BarangaySealProps> = ({
    barangay = "Sangguniang Kabataan Federation",
    barangayLogo = DefaultLogo,
}) => {
    return (
        <Stack
            sx={{
                background: "#CE1529",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "15px 10px",
            }}
        >
            <img width="120px" src={barangayLogo} alt="Barangay Logo" />
            <Typography variant="h3" color="white" textAlign="center">
                {barangay}
            </Typography>
        </Stack>
    );
};

export default BarangaySeal;
