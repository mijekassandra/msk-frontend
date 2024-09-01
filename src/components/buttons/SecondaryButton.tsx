import { Button } from "@mui/material";
import React, { ReactNode, MouseEvent } from "react";

// Props
import { SvgIconProps } from "@mui/material";

interface SecondaryButtonProps {
  size?: "small" | "medium" | "large";
  variant?: "outlined" | "contained";
  children: ReactNode;
  startIcon?: React.ReactElement<SvgIconProps>;
  endIcon?: React.ReactElement<SvgIconProps>;

  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  size,
  variant = "contained",
  children,
  startIcon,
  endIcon,
  onClick,
}) => {
  return (
    <Button
      sx={{
        borderRadius: "8px",
      }}
      variant={variant}
      color="secondary"
      size={size}
      disableElevation
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default SecondaryButton;
