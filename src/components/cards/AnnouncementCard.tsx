import React from "react";
import { Grid, Stack, Typography } from "@mui/material";
import barangays from "../../mockData/Barangay.json";
import DefaultLogo from "../../assets/SKFed.png";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface AnnouncementCardProps {
    barangay: string;
    date: string;
    cardImage: string;
    title: string;
    content: string;
    selectedBarangay?: string | null;
    type?: string | null;
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({
    barangay,
    date,
    cardImage,
    title,
    content,
    selectedBarangay,
    type,
}) => {
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
                overflowY: "auto",
                maxHeight: "70vh",
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
                md={5}
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
                md={6.3}
                sm={12}
                xs={12}
            >
                <Typography variant="h4" fontWeight={600} textAlign={"center"}>
                    {title}
                </Typography>
                <Typography variant="body1" fontFamily="Poppins">
                    {content}
                </Typography>
            </Grid>
        </Grid>
    );
};

export default AnnouncementCard;
