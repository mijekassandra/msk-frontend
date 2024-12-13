import React, { ReactNode } from "react";
import {
    Modal,
    Box,
    Typography,
    Divider,
    Stack,
    IconButton,
    CircularProgress,
} from "@mui/material";
import { Close } from "@mui/icons-material";

// import components
import PrimaryButton from "../buttons/PrimaryButton";

// MODAL FOR PUBLISHING
interface ModalVariantTwoProps {
    content: ReactNode;
    headerTitle?: string;
    onClose: () => void;
    onSave: () => void;
    subheader?: ReactNode;
    mode: "create" | "edit" | "view";
    maxWidth?: string;
    loading: boolean;
}

const ModalVariantTwo: React.FC<ModalVariantTwoProps> = ({
    content,
    headerTitle,
    onClose,
    onSave,
    mode,
    maxWidth = "600px",
    loading = false,
}) => {
    return (
        <Modal
            disableAutoFocus
            open={true}
            sx={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                padding: "10px",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    maxWidth: maxWidth,
                    minWidth: "550px",
                    bgcolor: "background.paper",
                    padding: "20px",
                    borderRadius: "12px",
                }}
            >
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                        pb: "15px",
                    }}
                >
                    <Typography variant="h3" fontWeight={500} color="info.dark">
                        {headerTitle}
                    </Typography>
                    <IconButton onClick={onClose}>
                        <Close
                            sx={{
                                fontSize: "20px",
                                fontWeight: "bold",
                            }}
                        />
                    </IconButton>
                </Stack>
                <Divider />
                <Stack marginBlock="20px">{content}</Stack>

                {mode !== "view" ? (
                    <Stack
                        direction="row"
                        spacing={3}
                        width="100%"
                        justifyContent="center"
                    >
                        <PrimaryButton
                            size="small"
                            variant="outlined"
                            width="150px"
                            onClick={onClose}
                        >
                            Cancel
                        </PrimaryButton>
                        <PrimaryButton
                            size="small"
                            width="150px"
                            color="info"
                            onClick={onSave}
                            disabled={loading}
                        >
                            {loading ? (
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={1}
                                >
                                    <Stack>Submitting</Stack>
                                    <CircularProgress
                                        size={16}
                                        color="inherit"
                                        sx={{
                                            marginLeft: "6px",
                                        }}
                                    />
                                </Stack>
                            ) : mode === "create" ? (
                                "Publish"
                            ) : (
                                "Save"
                            )}
                        </PrimaryButton>
                    </Stack>
                ) : null}
            </Box>
        </Modal>
    );
};

export default ModalVariantTwo;
