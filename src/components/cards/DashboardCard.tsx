import React, { ReactNode } from "react";
import { Card } from "@mui/material";

interface DashboardCardProps {
  content: ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ content }) => {
  return (
    <Card
      sx={{
        minHeight: "350px",
        padding: "20px",
        border: "1px solid #CED6F9",
      }}
    >
      {content}
    </Card>
  );
};

export default DashboardCard;
