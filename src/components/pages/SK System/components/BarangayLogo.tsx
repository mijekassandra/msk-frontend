import React, { useEffect, useState } from "react";
import { Stack, Typography, Grid } from "@mui/material";

import barangays from "../../../../mockData/Barangay.json";

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
            <Grid container spacing={3} justifyContent="space-between">
                {barangayData.map((barangay, index) => (
                    <Grid item key={index}>
                        <img src={barangay.logo} alt={barangay.barangayName} width="130" />
                        <Typography variant="h5" textAlign="center">
                            {barangay.barangayName.toUpperCase()}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
        </Stack>
    );
};

export default BarangayLogo;
