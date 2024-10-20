import React, { useState, useRef } from "react";
import { Button, IconButton, Box } from "@mui/material";

import { Panorama, Close } from "@mui/icons-material";

interface CustomUpload2Props {
  label?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
  fileName?: string | null;
  mode: string;
}

const CustomUpload2: React.FC<CustomUpload2Props> = (
  props: CustomUpload2Props
) => {
  const [displayFileName, setDisplayFileName] = useState<string | null>(
    props.fileName || null
  ); // Use prop fileName
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  // Handle file input change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setDisplayFileName(file.name);
    }
    if (props.onChange) {
      props.onChange(event);
    }
  };

  const handleRemoveFile = () => {
    setDisplayFileName(null);
    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }
  };

  return (
    <Box display="flex" alignItems="center">
      <Button
        component="label"
        variant="contained"
        disabled={props.mode === "view"}
        disableElevation
        endIcon={
          <Panorama
            sx={{
              color: "success.light",
              fontSize: "40px",
            }}
          />
        }
        sx={{
          borderRadius: "4px",
          background: "#f6f6f6",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          color: "#8a8a8a",
          "& .MuiButton-endIcon": {
            color: "#8a8a8a",
          },
          "&:hover": {
            background: "#e2e2e2",
            color: "#8a8a8a",
            "& .MuiButton-endIcon": {
              color: "#8a8a8a",
            },
          },
        }}
      >
        {/* Show the file name if it exists, otherwise show the label */}
        {displayFileName || props.label || "Upload"}
        <input
          type="file"
          hidden
          onChange={handleFileChange}
          ref={inputFileRef}
          accept={props.accept}
        />
      </Button>

      {displayFileName && (
        <IconButton
          disabled={props.mode === "view"}
          onClick={handleRemoveFile}
          aria-label="Remove file"
          sx={{ ml: 1 }}
        >
          <Close sx={{ fontSize: "20px", color: "red" }} />
        </IconButton>
      )}
    </Box>
  );
};

export default CustomUpload2;
