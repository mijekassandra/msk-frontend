import React, { MouseEvent, useState } from "react";
import { Stack, Grid, Typography, Rating } from "@mui/material";
import barangays from "../../mockData/Barangay.json";
import DefaultLogo from "/src/assets/SKFed.png";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

// import components
import PrimaryButton from "../buttons/PrimaryButton";
import ModalImage from "../modals/ModalImage";

// api service
import { useGetAllFeedbacksByPublicationIdQuery } from "../pages/Publication/api/publicationApi";

interface PublicationCardProps {
    publicationID: number;
    barangay: string | null;
    date: string;
    cardImage: string;
    title: string;
    content: string;
    views: number;
    comments: number;
    rating: number;
    mode?: string;
    selectedBarangay?: string | null;
    type?: string | null;

    onFeedbackClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    onCommentsClick?: (event: MouseEvent<HTMLDivElement>) => void;
}

const PublicationCard: React.FC<PublicationCardProps> = ({
    publicationID,
    barangay,
    date,
    cardImage,
    title,
    content,
    mode,
    type,
    onFeedbackClick,
    onCommentsClick,
    selectedBarangay,
}) => {
    // Fetch adminMode and selectedBarangay from the Redux store
    const adminMode = useSelector((state: RootState) => state.admin.adminMode);

    // find the image for seal
    const matchingBarangay = !adminMode
        ? barangays.Barangays.find((b) => b.barangayName === barangay)
        : barangays.Barangays.find((b) => b.barangayName === selectedBarangay);

    //! authenticiation
    // const userDetail = useSelector((state: RootState) => state.auth.user);

    //! Feedbacks
    const { data: feedbacks = [] } =
        useGetAllFeedbacksByPublicationIdQuery(publicationID);

    // Calculate feedback count based on fetched data
    const feedbackCount = Array.isArray(feedbacks) ? feedbacks.length : 0;

    const averageRating =
        Array.isArray(feedbacks) && feedbacks.length > 0
            ? feedbacks.reduce(
                  (sum: number, feedback: any) => sum + feedback.rating,
                  0
              ) / feedbacks.length
            : 0;

    //! Modal image
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Grid
            container
            gap={{ xs: 2, md: 4 }}
            justifyContent="space-between"
            sx={{
                borderRadius: "2px",
                border: "1px solid #CCCCCC",
                padding: "20px 30px 40px 30px",
                overflowY: "auto",
                maxHeight: "70vh",
                background: "#f9f9f9",
            }}
        >
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
                <Grid
                    item
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
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "24px",
                    }}
                >
                    <img
                        src={cardImage}
                        height="200px"
                        style={{
                            borderRadius: "16px",
                            objectFit: "cover",
                            width: "100%",
                            cursor: "pointer",
                        }}
                        onClick={handleOpen}
                    />
                    <ModalImage
                        image={cardImage}
                        altText="Card Image"
                        open={open}
                        onClose={handleClose}
                    />

                    {mode !== "view" ? (
                        <Stack>
                            <PrimaryButton
                                size="medium"
                                color="info"
                                onClick={onFeedbackClick}
                            >
                                Provide Feedback
                            </PrimaryButton>
                        </Stack>
                    ) : null}
                </Grid>
            </Grid>
            <Grid
                item
                sx={{
                    display: "grid",
                    alignContent: "space-between",
                    gap: "32px",
                }}
                md={6.3}
                sm={12}
                xs={12}
            >
                <Typography variant="h4" fontWeight={600} textAlign={"center"}>
                    {title}
                </Typography>
                <Typography
                    variant="body1"
                    fontFamily="Poppins"
                    whiteSpace="pre-line"
                >
                    {content}
                </Typography>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent={{
                        md: "flex-end",
                        xs: "space-between",
                    }}
                    gap={{
                        md: 6,
                        xs: 1,
                    }}
                    flex="flex-wrap"
                >
                    {mode !== "view" ? (
                        <>
                            <Stack direction="row" alignItems="center" gap={1}>
                                <Typography
                                    variant="h5"
                                    onClick={onCommentsClick}
                                    sx={{
                                        cursor: "pointer",
                                        "&:hover": {
                                            textDecoration: "underline",
                                        },
                                    }}
                                >
                                    {feedbackCount}{" "}
                                    {feedbackCount > 1 ? "comments" : "comment"}
                                </Typography>
                            </Stack>

                            <Rating
                                name="read-only"
                                readOnly
                                value={averageRating}
                            />
                        </>
                    ) : null}
                </Stack>
            </Grid>
        </Grid>
    );
};

export default PublicationCard;
