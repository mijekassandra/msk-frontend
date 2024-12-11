import React from "react";
import { Card, Typography, Stack } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";

interface AnalyticsCardProps {
    cardTitle: string;
    yesCount: number;
    totalValue?: number;
    width?: string;
    color?: string;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
    cardTitle,
    yesCount,
    totalValue,
    width = 170,
    color = "#A1B2D4",
}) => {
    // Convert yesCount and noCount to numbers
    const yesValue = Number(yesCount);
    const noValue = Number(totalValue) - yesValue;

    // Create data array based on whether noCount is passed
    const data = [
        { value: yesValue, id: "Yes", fill: color },
        ...(noValue > 0 ? [{ value: noValue, id: "No", fill: "" }] : []),
    ];

    return (
        <Card
            elevation={0}
            sx={{
                borderRadius: "4px",
                background: "white",
                padding: "12px",
                display: "flex",
                border: "1px solid #e0e0e0",
                alignItems: "center",
                width: width,
                gap: 2,
                height: "70px",
            }}
        >
            <Stack gap={0.4}>
                <Typography
                    variant="body1"
                    textAlign="start"
                    lineHeight={1.2}
                    sx={{ maxWidth: "90px" }}
                >
                    {cardTitle}
                </Typography>
                <Typography variant="h2" fontWeight={700}>
                    {yesCount}
                </Typography>
            </Stack>
            <PieChart
                colors={[color, "#e0e0e0"]}
                series={[
                    {
                        data: data,
                        innerRadius: 15,
                        outerRadius: 25,
                        paddingAngle: 10,
                        cornerRadius: 3,
                        startAngle: -45,
                        endAngle: 360,
                    },
                ]}
                width={1}
                height={60}
            />
        </Card>
    );
};

export default AnalyticsCard;
