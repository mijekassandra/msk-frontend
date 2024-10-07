import React, { useState, useRef } from "react";
import { Button, IconButton, Box } from "@mui/material";

import { Panorama, Close } from "@mui/icons-material";

interface CustomUpload2Props {
  label?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
}

const CustomUpload2: React.FC<CustomUpload2Props> = (
  props: CustomUpload2Props
) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  // Handle file input change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setFileName(file.name); // Update state with the selected file name
      console.log("file is: ", file);
    }
    if (props.onChange) {
      props.onChange(event); // Call the parent onChange handler if provided
    }
  };

  const handleRemoveFile = () => {
    setFileName(null);
    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }
  };

  return (
    <Box display="flex" alignItems="center">
      <Button
        component="label"
        variant="contained"
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
        {fileName || props.label || "Upload"}
        <input
          type="file"
          hidden
          onChange={handleFileChange}
          ref={inputFileRef}
          accept={props.accept}
        />
      </Button>

      {fileName && (
        <IconButton
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
