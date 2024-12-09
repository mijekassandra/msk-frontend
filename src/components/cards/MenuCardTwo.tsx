import React, { ReactNode, MouseEvent } from "react";
import { Card, IconButton, Stack, Typography } from "@mui/material";

interface MenuCardTwoProps {
    cardTitle: string;
    icon: ReactNode | string;
    subheader?: string;
    bgColor: string;
    onClick?: (event: MouseEvent<HTMLDivElement>) => void;
}

const MenuCardTwo: React.FC<MenuCardTwoProps> = ({
    cardTitle,
    icon,
    bgColor,
    subheader,
    onClick,
}) => {
    return (
        <Card
            elevation={0}
            sx={{
                borderRadius: "6px",
                padding: "16px 14px",
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                alignContent: "end",
                border: "1px solid #e0e0e0",
                transition: "box-shadow 0.3s ease",
                "&:hover": {
                    boxShadow: 3,
                },
                gap: "12px",
                minWidth: "250px",
            }}
            onClick={onClick}
        >
            <IconButton
                sx={{
                    backgroundColor: bgColor,
                    borderRadius: "50%",
                    width: "42px",
                    height: "42px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    padding: "5px",
                    "&:hover": {
                        backgroundColor: bgColor,
                        cursor: "default",
                    },
                }}
            >
                {icon}
            </IconButton>
            <Stack>
                <Typography variant="h4" fontWeight={500}>
                    {cardTitle}
                </Typography>
                <Typography variant="caption" color="#4F4F4F">
                    {subheader}
                </Typography>
            </Stack>
        </Card>
    );
};

export default MenuCardTwo;
