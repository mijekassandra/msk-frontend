import React, { MouseEvent } from "react";
import { Stack, Grid, Typography } from "@mui/material";
import { CalendarMonth, LocationOn } from "@mui/icons-material/";
import barangays from "../../mockData/Barangay.json";
import DefaultLogo from "../../assets/SKFed.png";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

// import components
import TertiaryButton from "../buttons/TertiaryButton";

interface ActivitiesCardProps {
    barangay: string | null;
    date: string;
    cardImage?: string;
    title: string;
    location?: string;
    mode?: string;
    selectedBarangay?: string | null;
    type?: string | null;
    date_of_activity: string;
    content?: string;

    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const ActivitiesCard: React.FC<ActivitiesCardProps> = ({
    barangay,
    date,
    cardImage,
    title,
    location,
    date_of_activity,
    mode,
    type,
    selectedBarangay,
    content,
    onClick,
}) => {
    // Fetch adminMode and selectedBarangay from the Redux store
    const adminMode = useSelector((state: RootState) => state.admin.adminMode);

    // find the image for seal
    const matchingBarangay = !adminMode
        ? barangays.Barangays.find((b) => b.barangayName === barangay)
        : barangays.Barangays.find((b) => b.barangayName === selectedBarangay);

    return (
        <Grid
            container
            gap={{ xs: 2, md: 4 }}
            justifyContent="space-between"
            sx={{
                borderRadius: "4px",
                border: "1px solid #CCCCCC",
                padding: "20px 30px 40px 30px",
            }}
        >
            <Grid
                item
                xs={12}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                }}
            >
                <img
                    src={
                        type === "Federation"
                            ? DefaultLogo
                            : matchingBarangay?.logo
                            ? `/${matchingBarangay.logo}`
                            : DefaultLogo
                    }
                    height="40px"
                />
                <Stack>
                    <Typography variant="subtitle1">{barangay}</Typography>
                    <Typography variant="body1" color={"gray"}>
                        {date}
                    </Typography>
                </Stack>
            </Grid>
            <Grid
                item
                md={5.5}
                sm={12}
                xs={12}
                sx={{
                    display: "grid",
                    alignContent: "flex-start",
                    gap: "20px",
                }}
            >
                <Stack>
                    <img
                        src={cardImage}
                        height="230px"
                        style={{
                            borderRadius: "16px",
                            objectFit: "cover",
                            width: "100%",
                        }}
                    />
                </Stack>
            </Grid>
            <Grid
                item
                sx={{
                    display: "grid",
                    alignContent: "flex-start",
                    gap: "32px",
                }}
                md={5.5}
                sm={12}
                xs={12}
            >
                <Typography
                    variant="h3"
                    fontWeight={600}
                    textAlign={"center"}
                    textTransform="uppercase"
                >
                    {title}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <CalendarMonth />
                    <Typography variant="h5" fontFamily="Poppins">
                        {date_of_activity}
                    </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <LocationOn />
                    <Typography variant="h5" fontFamily="Poppins">
                        {location}
                    </Typography>
                </Stack>
                <Stack
                    direction="row"
                    justifyContent="flex-end"
                    marginRight="20px"
                >
                    <TertiaryButton
                        variant="text"
                        color="primary"
                        size="large"
                        onClick={onClick}
                    >
                        VIEW
                    </TertiaryButton>
                </Stack>
            </Grid>
        </Grid>
    );
};

export default ActivitiesCard;
