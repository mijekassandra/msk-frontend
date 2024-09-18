import React, { ReactNode, MouseEvent } from "react";
import { Card, Box, CardMedia, CardContent } from "@mui/material";

interface MenuCardProps {
    content: ReactNode;
    cardImage: string;
    url?: string;
    imgWidth?: string;
    onClick?: (event: MouseEvent<HTMLDivElement>) => void;
}

// Use this Card for Menu in Dashboard
const MenuCard: React.FC<MenuCardProps> = ({ content, cardImage, imgWidth, url, onClick }) => {
    return (
        <Card
            elevation={0}
            sx={{
                borderRadius: "4px",
                height: "140px",
                width: "140px",
                padding: "8px",
                display: "grid",
                justifyContent: "center",
                alignContent: "end",
                border: "1px solid #e0e0e0",
                transition: "box-shadow 0.3s ease", // Smooth transition
                "&:hover": {
                    boxShadow: 2, // Elevation 1 on hover
                },
            }}
            onClick={onClick}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <CardMedia
                    component="img"
                    height="fit-content"
                    image={cardImage}
                    sx={{
                        width: imgWidth,
                    }}
                />
            </Box>
            <CardContent>{content}</CardContent>
        </Card>
    );
};

export default MenuCard;
