import { useEffect, useState } from "react";
import { Stack, Typography, Grid } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
    setAdminMode,
    setSelectedBarangay,
} from "../../../../../slice/adminSlice";

// Import images directly
import PoblacionLogo from "/src/assets/Poblacion.png";
import KabulawanLogo from "/src/assets/Kabulawan.png";
import DampilLogo from "/src/assets/Dampil.png";
import ManaolLogo from "/src/assets/Manaol.png";
import BanglayLogo from "/src/assets/Banglay.png";
import TabokLogo from "/src/assets/Tabok.png";
import KauswaganLogo from "/src/assets/Kauswagan.png";
import GastonLogo from "/src/assets/Gaston.png";
import LumboLogo from "/src/assets/Lumbo.png";
import UmagosLogo from "/src/assets/Umagos.png";

const barangays = [
    { barangayName: "Poblacion", logo: PoblacionLogo },
    { barangayName: "Kabulawan", logo: KabulawanLogo },
    { barangayName: "Dampil", logo: DampilLogo },
    { barangayName: "Manaol", logo: ManaolLogo },
    { barangayName: "Banglay", logo: BanglayLogo },
    { barangayName: "Tabok", logo: TabokLogo },
    { barangayName: "Kauswagan", logo: KauswaganLogo },
    { barangayName: "Gaston", logo: GastonLogo },
    { barangayName: "Lumbo", logo: LumboLogo },
    { barangayName: "Umagos", logo: UmagosLogo },
];
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
        setBarangayData(barangays);
    }, []);

    const handleBarangayClick = (barangayName: string) => {
        dispatch(setAdminMode(true));
        dispatch(setSelectedBarangay(barangayName));
        navigate(`/view/${barangayName}/dashboard`);
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
                        onClick={() =>
                            handleBarangayClick(barangay.barangayName)
                        } // Handle click
                    >
                        <StyledLogo
                            src={barangay.logo}
                            alt={barangay.barangayName}
                            width="130"
                        />
                        <Typography
                            variant="h5"
                            textAlign="center"
                            marginTop={2}
                        >
                            {"BRGY."} {barangay.barangayName.toUpperCase()}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
        </Stack>
    );
};

export default BarangayLogo;
