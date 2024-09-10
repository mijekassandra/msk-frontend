import { Button } from "@mui/material";
import React, { ReactNode, MouseEvent } from "react";

interface TertiaryButtonProps {
    size?: "small" | "medium" | "large";
    variant?: "text" | "outlined";
    color?: "primary" | "secondary" | "error";
    height?: string;
    width?: string;
    children: ReactNode;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}
const TertiaryButton: React.FC<TertiaryButtonProps> = ({
    width,
    height,
    size,
    color,
    children,
    variant,
    onClick,
}) => {
    return (
        <Button
            sx={{
                borderRadius: "8px",
                gap: 1,
                height: { height },
                width: { width },
            }}
            variant={variant}
            color={color}
            size={size}
            onClick={onClick}
        >
            {children}
        </Button>
    );
};

export default TertiaryButton;
