import { Button } from "@mui/material";
import React, { ReactNode, MouseEvent } from "react";

// Props
import { SvgIconProps } from "@mui/material";

interface PrimaryButtonProps {
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
  size?: "small" | "medium" | "large";
  variant?: "outlined" | "contained";
  children: ReactNode;
  width?: string;
  startIcon?: React.ReactElement<SvgIconProps>;
  endIcon?: React.ReactElement<SvgIconProps>;
  disabled?: boolean;

  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  color = "primary",
  size,
  variant = "contained",
  children,
  width,
  startIcon,
  endIcon,
  disabled = false,

  onClick,
}) => {
  return (
    <Button
      sx={{
        borderRadius: "8px",
        height: "100%",
        width: { width },
      }}
      variant={variant}
      color={color}
      size={size}
      disableElevation
      startIcon={startIcon}
      endIcon={endIcon}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
