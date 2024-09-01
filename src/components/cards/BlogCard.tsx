import React, { MouseEvent } from "react";
import {
  Card,
  CardMedia,
  CardHeader,
  CardActions,
  Typography,
} from "@mui/material";

// import components
import PrimaryButton from "../buttons/PrimaryButton";

interface BlogCardProps {
  bgColor: string;
  cardImage: string;
  cardTitle: string;

  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({
  bgColor,
  cardImage,
  cardTitle,
  onClick,
}) => {
  return (
    <Card
      sx={{
        borderRadius: "4px",
        bgcolor: bgColor,
        padding: "30px 20px",
        width: "280px",
        height: "300px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <CardMedia component="img" height="160px" image={cardImage} />
      <CardHeader title={<Typography variant="h4">{cardTitle}</Typography>} />
      <CardActions>
        <PrimaryButton size="small" color="info" onClick={onClick}>
          Read More
        </PrimaryButton>
      </CardActions>
    </Card>
  );
};

export default BlogCard;
