import React, { MouseEvent } from "react";
import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    CardActionArea,
    Typography,
    Button,
    Stack,
} from "@mui/material";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import { formatDistanceStrict } from "date-fns";

interface BlogCardProps {
    bgColor: string;
    cardImage: File;
    cardTitle: string;
    cardContent: string;
    cardBarangay: string;
    cardDate: Date | string;

    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({
    cardImage,
    cardTitle,
    cardContent,
    cardDate,
    onClick,
}) => {
    // Convert the date to a "time ago" format
    const formattedDate = formatDistanceStrict(new Date(cardDate), new Date(), {
        addSuffix: true,
    });
    return (
        <Card
            sx={{
                borderRadius: "6px",
                bgcolor: "#f8f8f8",
                width: "280px",
                height: "325px",
                display: "flex",
                flexDirection: "column",
                variant: "outlined",
            }}
        >
            <CardMedia
                component="img"
                height="160px"
                image={
                    cardImage instanceof File
                        ? URL.createObjectURL(cardImage)
                        : cardImage
                }
                alt="Publication Image"
            />
            <CardActionArea>
                <CardContent
                    sx={{
                        height: "85px",
                    }}
                >
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        fontWeight={600}
                        sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: "2",
                            WebkitBoxOrient: "vertical",
                        }}
                    >
                        {cardTitle}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            color: "text.secondary",
                            display: "-webkit-box",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            WebkitLineClamp: 2, // Limit to 2 lines
                            WebkitBoxOrient: "vertical",
                        }}
                    >
                        {cardContent}
                    </Typography>
                </CardContent>
            </CardActionArea>

            <CardActions>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    width="100%"
                    padding={0.5}
                >
                    <Stack direction="row">
                        <Button
                            size="small"
                            onClick={onClick}
                            sx={{
                                fontWeight: "500",
                            }}
                        >
                            Read More
                        </Button>
                    </Stack>

                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={0.5}
                        sx={{ color: "text.secondary" }}
                    >
                        <WatchLaterIcon sx={{ fontSize: "12px" }} />
                        <Typography variant="caption">
                            {formattedDate}
                        </Typography>
                    </Stack>
                </Stack>
            </CardActions>
        </Card>
    );
};

export default BlogCard;
