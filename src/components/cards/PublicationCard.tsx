import React, { MouseEvent, useState, useEffect } from "react";
import {
    Stack,
    Grid,
    Typography,
    Rating,
    Popover,
    IconButton,
} from "@mui/material";
import barangays from "../../mockData/Barangay.json";
import DefaultLogo from "../../assets/SKFed.png";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { FacebookCounter, FacebookSelector } from "@charkour/react-reactions";
import { AddReactionOutlined } from "@mui/icons-material";

// import components
import PrimaryButton from "../buttons/PrimaryButton";

// api service
import { useGetAllFeedbacksByPublicationIdQuery } from "../pages/Publication/api/publicationApi";
import {
    useAddOrUpdateReactionMutation,
    useGetAllReactionsByPublicationIdQuery,
    useRemoveReactionMutation,
} from "../../features/Reaction/api/reactionsApi";

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

    onFeedbackClick?: (event: MouseEvent<HTMLButtonElement>) => void; // Separate handler for feedback
    onCommentsClick?: (event: MouseEvent<HTMLDivElement>) => void; // Separate handler for comments
}

const PublicationCard: React.FC<PublicationCardProps> = ({
    publicationID,
    barangay,
    date,
    cardImage,
    title,
    content,
    views,
    comments,
    rating,
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

    // authenticiation
    const userDetail = useSelector((state: RootState) => state.auth.user);

    // state for user reaction
    const [userReactionState, setUserReactionState] = useState<string | null>(
        null
    );

    //! Feedbacks
    const {
        data: feedbacks = [],
        isLoading,
        isError,
    } = useGetAllFeedbacksByPublicationIdQuery(publicationID);

    // Calculate feedback count based on fetched data
    const feedbackCount = feedbacks ? feedbacks.length : 0;

    const averageRating =
        feedbacks.length > 0
            ? feedbacks.reduce(
                  (sum: number, feedback: any) => sum + feedback.rating,
                  0
              ) / feedbacks.length
            : 0;

    //! Reactions

    const { data: reactions = [] } =
        useGetAllReactionsByPublicationIdQuery(publicationID);
    const [addOrUpdateReaction] = useAddOrUpdateReactionMutation();
    const [removeReaction] = useRemoveReactionMutation();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleOpenPopover = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClosePopover = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);

    const handleSelectReaction = async (reaction: string) => {
        if (userReactionState === reaction) {
            const response = await removeReaction(publicationID);
            if (response) {
                setUserReactionState(null); // Clear local state if reaction is removed
                console.log("Reaction removed, userReactionState set to null");
            }
            console.log("removed: ", response);
        } else {
            const response = await addOrUpdateReaction({
                publicationId: publicationID,
                reaction,
            });
            if (response) {
                setUserReactionState(reaction); // Update local state to new reaction
                console.log(
                    "Reaction updated, userReactionState set to:",
                    reaction
                );
            }
            console.log("add/update: ", response);
        }
        handleClosePopover();
    };

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
                        }}
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
                <Typography variant="body1" fontFamily="Poppins">
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
                                {/* <FacebookCounter
                                // counters={formattedReactions}
                                />

                                <IconButton onClick={handleOpenPopover}>
                                    <AddReactionOutlined
                                        sx={{ fontSize: "24px" }}
                                    />
                                </IconButton>
                                <Popover
                                    open={open}
                                    anchorEl={anchorEl}
                                    onClose={handleClosePopover}
                                    anchorOrigin={{
                                        vertical: "center",
                                        horizontal: "left",
                                    }}
                                    transformOrigin={{
                                        vertical: "center",
                                        horizontal: "right",
                                    }}
                                    sx={{
                                        "& .MuiPaper-root": {
                                            backgroundColor: "transparent",
                                            boxShadow: "none",
                                            paddingBlock: "10px",
                                            width: "200px",
                                            height: "85px",
                                            alignContent: "center",
                                        },
                                    }}
                                >
                                    
                                    <FacebookSelector
                                        iconSize={24}
                                        onSelect={handleSelectReaction}
                                        reactions={[
                                            "like",
                                            "love",
                                            "haha",
                                            "wow",
                                            "sad",
                                            "angry",
                                        ]}
                                    />
                                </Popover> */}
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
