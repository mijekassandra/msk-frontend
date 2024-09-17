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
                height: "100vh", // Set height to full viewport height
                overflow: "hidden", // Prevent overflowing outside of viewport
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
