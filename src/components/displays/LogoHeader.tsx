import React from "react";
import { Stack, Typography, Divider } from "@mui/material";

// import assets
import SKLogo from "../../assets/Sangguniang_Kabataan_logo.jpg";

interface LogoHeaderProps {
    header: string;
}

const LogoHeader: React.FC<LogoHeaderProps> = ({ header }) => {
    return (
        <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            padding="0px 10px 20px 0px"
        >
            <img src={SKLogo} height="50px" />
            <Divider orientation="vertical" variant="middle" flexItem />
            <Typography variant="h4">{header}</Typography>
        </Stack>
    );
};

export default LogoHeader;
