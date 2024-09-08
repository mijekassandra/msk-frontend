import React, { ReactNode } from "react";
import { Stack } from "@mui/material";

interface DashboardBodyProps {
    content: ReactNode;
    width?: string;
}

const DashboardBody: React.FC<DashboardBodyProps> = ({ content, width }) => {
    return (
        <Stack
            width={width}
            sx={{
                padding: "40px 25px",
            }}
        >
            {content}
        </Stack>
    );
};

export default DashboardBody;
