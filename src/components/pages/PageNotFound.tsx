import React from "react";
import { Stack } from "@mui/material";

// import components
import BodyContainer from "../containers/BodyContainer";

const PageNotFound = () => {
    return (
        <BodyContainer
            background=""
            flexDirection="flex"
            justifyContent="center"
            alignItems="center"
            content={<Stack></Stack>}
        ></BodyContainer>
    );
};

export default PageNotFound;
