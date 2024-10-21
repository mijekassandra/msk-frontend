import React, { useEffect, useState } from "react";
import { Stack, Typography, Grid } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAdminMode, setSelectedBarangay } from "../../../../../slice/adminSlice";

import barangays from "../../../../mockData/Barangay.json";

const StyledLogo = styled("img")({
    transition: "transform 0.3s ease",
    "&:hover": {
        transform: "scale(1.1)",
    },
});

interface BarangayLogoProps {
    barangayName: string;
    logo: string;
}

const BarangayLogo = () => {
    const [barangayData, setBarangayData] = useState<BarangayLogoProps[]>([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        setBarangayData(barangays.Barangays);
    }, []);

    const handleBarangayClick = (barangayName: string) => {
        dispatch(setAdminMode(true)); // Enable admin mode
        dispatch(setSelectedBarangay(barangayName)); // Set the selected barangay
        navigate(`/view/${barangayName}/publication`); // Navigate to the barangay-specific view
    };

    return (
        <Stack>
            <Grid
                container
                gap={3}
                sx={{
                    justifyContent: {
                        md: "space-between",
                        xs: "space-evenly",
                    },
                }}
            >
                {barangayData.map((barangay, index) => (
                    <Grid
                        item
                        key={index}
                        md={2}
                        sx={{
                            display: "grid",
                            justifyContent: "center",
                        }}
                        onClick={() => handleBarangayClick(barangay.barangayName)} // Handle click
                    >
                        <StyledLogo src={barangay.logo} alt={barangay.barangayName} width="130" />
                        <Typography variant="h5" textAlign="center" marginTop={2}>
                            {"BRGY."} {barangay.barangayName.toUpperCase()}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
        </Stack>
    );
};

export default BarangayLogo;
