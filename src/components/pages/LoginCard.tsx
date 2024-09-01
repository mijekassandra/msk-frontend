import { Card, CardMedia, CardContent } from "@mui/material";
import React, { ReactNode } from "react";

interface LoginCardProps {
  content: ReactNode;
  width?: string;
  customPadding?: string;
  url?: string;
  bgColor?: string;
}

const LoginCard: React.FC<LoginCardProps> = ({
  content,
  width,
  customPadding,
  url,
  bgColor,
}) => {
  return (
    <Card
      sx={{
        borderRadius: "4px",
        border: bgColor || "1px solid #CED6F9",
        width: width ? width : "fit-content",
        height: "fit-content",
        cursor: url && "pointer",
      }}
    >
      <CardMedia component="img" height="40"></CardMedia>
      <CardContent>{content}</CardContent>
    </Card>
  );
};

export default LoginCard;
