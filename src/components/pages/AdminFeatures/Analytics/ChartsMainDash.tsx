import { Stack, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";

const data = [
    { id: 0, value: 20, label: "Active" },
    { id: 1, value: 45, label: "Inactive" },
];

const ChartsMainDash = () => {
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
                    Voter Status
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
                    width={330}
                    height={160}
                />
            </Stack>
        </Stack>
    );
};

export default ChartsMainDash;
