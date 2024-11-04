import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, TextField, Button, Divider, Typography } from "@mui/material";

// import components
import LogoHeader from "../../../displays/LogoHeader";
import LoadingDisplay from "../../../displays/LoadingDisplay";
import ErrorDisplay from "../../../displays/ErrorDisplay";
import DisplayThumbnail from "./DisplayThumbnail";

const UserSKFiles = () => {
    const [tabMode, setTabMode] = useState<
        "administrative" | "financial" | "project"
    >("administrative");

    const handleTabChange = (
        mode: "administrative" | "financial" | "project"
    ) => {
        setTabMode(mode);
    };

    const getFileUrl = () => {
        switch (tabMode) {
            case "administrative":
                return "src/assets/administrative.pdf";
            case "financial":
                return "src/assets/financial.pdf";
            case "project":
                return "src/assets/project.pdf";
            default:
                return "";
        }
    };

    return (
        <Stack gap={2}>
            <LogoHeader header="SK FILES" />

            <Stack direction="row" justifyContent="flex-end" marginBlock={1}>
                <TextField
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="Search"
                    sx={{
                        width: 400,
                        minWidth: {
                            sm: 300,
                            xs: "100%",
                        },
                    }}
                />
            </Stack>
            <Stack
                rowGap={2}
                sx={{
                    marginInline: 7,
                }}
            >
                <Stack direction="row" justifyContent="space-between" gap={5}>
                    <Button
                        variant={
                            tabMode === "administrative" ? "outlined" : "text"
                        }
                        onClick={() => handleTabChange("administrative")}
                    >
                        ADMINISTRATIVE FILES
                    </Button>
                    <Button
                        variant={tabMode === "financial" ? "outlined" : "text"}
                        onClick={() => handleTabChange("financial")}
                    >
                        FINANCIAL FILES
                    </Button>
                    <Button
                        variant={tabMode === "project" ? "outlined" : "text"}
                        onClick={() => handleTabChange("project")}
                    >
                        PROJECT FILES
                    </Button>
                </Stack>
                <Divider sx={{ borderBottomWidth: 3.5 }} />
                <DisplayThumbnail fileUrl="src/assets/administrative.pdf" />
                <DisplayThumbnail fileUrl="src/assets/Dummy Docs.docx" />

                {/* <embed
                    width="191"
                    height="207"
                    src="src\assets\administrative.pdf"
                    type="application/pdf"
                /> */}
            </Stack>
        </Stack>
    );
};

export default UserSKFiles;
