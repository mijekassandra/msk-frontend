import React, { ReactNode, MouseEvent } from "react";
import { Modal, Box, Typography, Divider, Stack, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

// import components
import PrimaryButton from "../buttons/PrimaryButton";

interface ModalVariantTwoProps {
    content: ReactNode;
    headerTitle?: string;
    onClose: () => void;
    subheader?: ReactNode;
    onSubmit?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const ModalVariantTwo: React.FC<ModalVariantTwoProps> = (props: ModalVariantTwoProps) => {
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
                    maxWidth: "400px",
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
                        {props.headerTitle}
                    </Typography>
                    <IconButton onClick={props.onClose}>
                        <Close
                            sx={{
                                fontSize: "20px",
                                fontWeight: "bold",
                            }}
                        />
                    </IconButton>
                </Stack>
                <Divider />
                <Stack marginBlock="20px">{props.content}</Stack>
                <Stack direction="row" spacing={3} width="100%" justifyContent="center">
                    <PrimaryButton
                        size="small"
                        variant="outlined"
                        width="150px"
                        onClick={props.onClose}
                    >
                        Cancel
                    </PrimaryButton>
                    <PrimaryButton size="small" width="150px" color="info">
                        Publish
                    </PrimaryButton>
                </Stack>
            </Box>
        </Modal>
    );
};

export default ModalVariantTwo;
