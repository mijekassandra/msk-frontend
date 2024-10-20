import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, TextField, Button, Divider } from "@mui/material";

// import components
import LogoHeader from "../../../displays/LogoHeader";
import LoadingDisplay from "../../../displays/LoadingDisplay";
import ErrorDisplay from "../../../displays/ErrorDisplay";
import FilePreview from "./FilePreview";

const UserSKFiles = () => {
  const [tabMode, setTabMode] = useState<
    "administrative" | "financial" | "project"
  >("administrative");

  const handleTabChange = (
    mode: "administrative" | "financial" | "project"
  ) => {
    setTabMode(mode);
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
            variant={tabMode === "administrative" ? "outlined" : "text"}
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
      </Stack>
    </Stack>
  );
};

export default UserSKFiles;
