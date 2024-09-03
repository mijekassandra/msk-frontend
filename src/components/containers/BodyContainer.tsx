import { Stack } from "@mui/material";
import React, { ReactNode } from "react";

interface BodyContainerProps {
  content: ReactNode;
  background?: string;
}

const BodyContainer: React.FC<BodyContainerProps> = ({
  content,
  background,
}) => {
  return (
    <Stack
      sx={{
        minHeight: "100vh", // Ensure the Box takes up at least 100% of the viewport height
        display: "flex",
        flexDirection: "column", // Stack children vertically
        justifyContent: "center", // Center children vertically
        alignItems: "center", // Center children horizontally
        padding: "20px", // Add some padding
        backgroundImage: background ? `url(${background})` : "none", // Use image if provided
        backgroundSize: "cover", // Cover the entire area
        backgroundRepeat: "no-repeat", // No repeat
        backgroundColor: background ? "transparent" : "#fff", // Default to white if no image
      }}
    >
      {content}
    </Stack>
  );
};

export default BodyContainer;
