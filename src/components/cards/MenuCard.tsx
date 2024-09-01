import React, { ReactNode } from "react";
import { Card, CardMedia, CardContent } from "@mui/material";

interface MenuCardProps {
  content: ReactNode;
  cardImage: string;
  url?: string;
}

// Use this Card for Menu in Dashboard
const MenuCard: React.FC<MenuCardProps> = ({ content, cardImage, url }) => {
  return (
    <Card
      sx={{
        borderRadius: "8px",
        height: "180px",
        width: "180px",
        padding: "8px",
      }}
    >
      <CardMedia
        component="img"
        height="fit-content"
        image={cardImage}
      ></CardMedia>
      <CardContent>{content}</CardContent>
    </Card>
  );
};

export default MenuCard;
