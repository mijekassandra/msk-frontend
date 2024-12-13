import { Stack, CircularProgress } from "@mui/material";
import TertiaryButton from "./TertiaryButton";
import PrimaryButton from "./PrimaryButton";
import React, { MouseEvent } from "react";

interface TwoChoiceProps {
    leftText?: string;
    rightText: string;
    size?: "small" | "medium" | "large";
    color?: "primary" | "secondary" | "error" | undefined;
    justifyContent?: string;
    leftOnClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    rightOnClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    loading?: boolean;
}

const TwoChoice: React.FC<TwoChoiceProps> = ({
    leftText,
    rightText,
    size,
    color = "primary",
    justifyContent = "flex-end",
    leftOnClick,
    rightOnClick,
    disabled,
    loading,
}) => {
    return (
        <Stack
            paddingX={0}
            paddingY={1}
            spacing={2}
            direction="row"
            justifyContent={justifyContent}
        >
            {leftText && (
                <TertiaryButton
                    variant="text"
                    color={color}
                    size={size}
                    onClick={leftOnClick}
                >
                    {" "}
                    {leftText}
                </TertiaryButton>
            )}
            <PrimaryButton
                size={size}
                onClick={rightOnClick}
                disabled={disabled}
            >
                {loading ? (
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Stack>Submitting</Stack>
                        <CircularProgress
                            size={16}
                            color="inherit"
                            sx={{
                                marginLeft: "6px",
                            }}
                        />
                    </Stack>
                ) : (
                    rightText
                )}
            </PrimaryButton>
        </Stack>
    );
};

export default TwoChoice;
