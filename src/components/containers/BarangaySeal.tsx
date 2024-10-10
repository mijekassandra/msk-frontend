import React from "react";
import { Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

// import default image
import DefaultLogo from "../../assets/SKFed.png";
import barangays from "../../mockData/Barangay.json";

interface BarangaySealProps {
  barangay?: string;
  barangayLogo?: string;
}

const BarangaySeal: React.FC<BarangaySealProps> = ({
  barangay = "Sangguniang Kabataan Federation",
  barangayLogo = DefaultLogo,
}) => {
  // logged in user details
  const userDetail = useSelector((state: RootState) => state.auth.user);

  // Set default values
  let finalBarangay = "Sangguniang Kabataan Federation";
  let finalLogo = barangayLogo;

  // If the user is a Chairperson, append their barangay
  if (userDetail.role === "Chairperson") {
    const userBarangay = userDetail.barangay;
    const matchingBarangay = barangays.Barangays.find(
      (b) => b.barangayName === userBarangay
    );

    if (matchingBarangay) {
      finalBarangay = `Sangguniang Kabataan Barangay ${matchingBarangay.barangayName}`;
      finalLogo = matchingBarangay.logo; // Update logo based on matched barangay
    }
  } else if (
    userDetail.role === "Super Admin" ||
    userDetail.role === "Federation"
  ) {
    // If Federation or Super Admin, show "Sangguniang Kabataan Federation"
    finalBarangay = "Sangguniang Kabataan Federation";
    finalLogo = DefaultLogo;
  }

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
      <img width="140px" src={finalLogo} alt="Barangay Logo" />
      <Typography variant="h3" color="white" textAlign="center">
        {finalBarangay}
      </Typography>
    </Stack>
  );
};

export default BarangaySeal;
