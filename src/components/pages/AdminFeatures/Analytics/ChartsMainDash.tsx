import { Stack, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";

interface ChartsMainDashProps {
    data: { id: number; value: number; label: string }[];
    chartTitle: string;
}

const ChartsMainDash: React.FC<ChartsMainDashProps> = ({
    data,
    chartTitle,
}) => {
    return (
        <Stack>
            <Stack
                direction="column"
                gap={1}
                sx={{
                    borderRadius: "4px",
                    background: "white",
                    padding: "12px",
                    alignContent: "end",
                    border: "1px solid #e0e0e0",
                }}
            >
                <Typography variant="body1" textAlign="start">
                    {chartTitle}
                </Typography>
                <PieChart
                    colors={["#A1B2D4", "#F28C92"]}
                    series={[
                        {
                            data: data,
                            highlightScope: {
                                fade: "global",
                                highlight: "item",
                            },
                            faded: {
                                innerRadius: 30,
                                additionalRadius: -30,
                                color: "gray",
                            },
                        },
                    ]}
                    slotProps={{
                        legend: {
                            labelStyle: {
                                fontSize: 11,
                            },
                            itemMarkWidth: 10,
                            itemMarkHeight: 10,
                            markGap: 5,
                            itemGap: 5,
                        },
                    }}
                    width={330}
                    height={160}
                />
            </Stack>
        </Stack>
    );
};

export default ChartsMainDash;
