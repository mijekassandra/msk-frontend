import { Stack } from "@mui/material";
import TertiaryButton from "./TertiaryButton";
import PrimaryButton from "./PrimaryButton";
import React, { MouseEvent } from "react";

interface TwoChoiceProps {
  leftText?: string;
  rightText: string;
  size?: "small" | "medium" | "large";
  leftOnClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  rightOnClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const TwoChoice: React.FC<TwoChoiceProps> = ({
  leftText,
  rightText,
  size,
  leftOnClick,
  rightOnClick,
}) => {
  return (
    <Stack paddingX={2} paddingY={1} spacing={2} direction="row">
      {leftText && (
        <TertiaryButton
          variant="text"
          color={"primary"}
          size={size}
          onClick={leftOnClick}
        >
          {leftText}
        </TertiaryButton>
      )}
      <PrimaryButton size={size} onClick={rightOnClick}>
        {rightText}
      </PrimaryButton>
    </Stack>
  );
};

export default TwoChoice;
