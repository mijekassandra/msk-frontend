import React, { useEffect } from "react";
import { Stack, Typography, Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

// import default image
import DefaultLogo from "../../assets/SKFed.png";
import barangays from "../../mockData/Barangay.json";

interface BarangaySealProps {
    barangay?: string;
    barangayLogo?: string;
}

const BarangaySeal: React.FC<BarangaySealProps> = ({ barangayLogo = DefaultLogo }) => {
    // redux logged in user details
    const userDetail = useSelector((state: RootState) => state.auth.user);

    // redux fetch adminMode and selectedBarangay
    const adminMode = useSelector((state: RootState) => state.admin.adminMode);
    const selectedBarangay = useSelector((state: RootState) => state.admin.selectedBarangay);

    // Set default values
    let finalBarangay = "Sangguniang Kabataan Federation";
    let finalLogo = barangayLogo;

    // TODO If adminMode is true and a selectedBarangay exists, update the finalBarangay and finalLogo
    if (adminMode && selectedBarangay) {
        const matchingBarangay = barangays.Barangays.find(
            (b) => b.barangayName === selectedBarangay
        );

        if (matchingBarangay) {
            finalBarangay = `Sangguniang Kabataan Barangay ${matchingBarangay.barangayName}`;
            finalLogo = `/${matchingBarangay.logo}`;
        }
    }
    // TODO If the user is a Chairperson, append their barangay
    else if (userDetail?.role === "Chairperson") {
        const userBarangay = userDetail.barangay;
        const matchingBarangay = barangays.Barangays.find((b) => b.barangayName === userBarangay);

        if (matchingBarangay) {
            finalBarangay = `Sangguniang Kabataan Barangay ${matchingBarangay.barangayName}`;
            finalLogo = matchingBarangay.logo;
        }
    }
    // TODO If Federation or Super Admin, show "Sangguniang Kabataan Federation"
    else if (userDetail?.role === "Super Admin" || userDetail?.role === "Federation") {
        finalBarangay = "Sangguniang Kabataan Federation";
        finalLogo = DefaultLogo;
    }
    // TODO For other roles (like a regular user)
    else {
        finalBarangay = `${userDetail?.last_name}, ${userDetail?.first_name}`;
        finalLogo = "";
    }

    useEffect(() => {
        console.log("here", finalLogo);
        console.log("here", adminMode);
        console.log("here", selectedBarangay);
    }, [finalLogo, adminMode, selectedBarangay]);

    return (
        <Stack
            sx={{
                background: "#CE1529",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "15px 10px",
            }}
            gap={1}
        >
            {userDetail?.role !== "User" && <img width="140px" src={finalLogo} alt="Logo" />}

            {userDetail?.role === "User" && (
                <Avatar
                    sx={{ width: "120px", height: "120px" }}
                    src={userDetail?.profile_img || undefined}
                    alt={`${userDetail?.first_name} ${userDetail?.last_name}`}
                />
            )}
            <Typography variant="h3" color="white" textAlign="center">
                {finalBarangay}
            </Typography>
        </Stack>
    );
};

export default BarangaySeal;
