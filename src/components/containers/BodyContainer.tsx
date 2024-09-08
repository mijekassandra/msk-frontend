import React, { ReactNode } from "react";
import { Stack } from "@mui/material";

interface BodyContainerProps {
    content: ReactNode;
    background?: string;
    flexDirection?: string;
    justifyContent?: string;
    alignItems?: string;
}

const BodyContainer: React.FC<BodyContainerProps> = ({
    content,
    background,
    flexDirection,
    justifyContent,
    alignItems,
}) => {
    return (
        <Stack
            sx={{
                minHeight: "100vh", // Ensure the Box takes up at least 100% of the viewport height
                display: "flex",
                ...(flexDirection && { flexDirection }),
                ...(justifyContent && { justifyContent }),
                ...(alignItems && { alignItems }),
                backgroundImage: background ? `url(${background})` : "none",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundColor: background ? "transparent" : "#ffffff;",
            }}
        >
            {content}
        </Stack>
    );
};

export default BodyContainer;
