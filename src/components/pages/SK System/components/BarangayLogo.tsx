import React, { useEffect, useState } from "react";
import { Stack, Typography, Grid } from "@mui/material";
import { styled } from "@mui/system";

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

    useEffect(() => {
        // Load JSON data into state
        setBarangayData(barangays.Barangays);
    }, []);

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
                    >
                        <StyledLogo src={barangay.logo} alt={barangay.barangayName} width="130" />
                        <Typography variant="h5" textAlign="center" marginTop={2}>
                            {barangay.barangayName.toUpperCase()}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
        </Stack>
    );
};

export default BarangayLogo;
