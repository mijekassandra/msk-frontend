import React, { ReactNode } from "react";
import { Card } from "@mui/material";

interface DashboardCardProps {
    content: ReactNode;
    padding?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ content, padding }) => {
    return (
        <Card
            elevation={0}
            sx={{
                minHeight: "350px",
                padding: { padding },
                border: "1px solid #e0e0e0",
                background: "#f8f8f8",
            }}
        >
            {content}
        </Card>
    );
};

export default DashboardCard;
