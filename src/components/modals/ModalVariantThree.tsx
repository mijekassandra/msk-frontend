import React, { ReactNode } from "react";
import { Modal, Box, Typography, Divider, Stack, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

// import components

// MODAL FOR UPLOADS

interface ModalVariantThreeProps {
    content: ReactNode;
    headerTitle?: string;
    onClose: () => void;
    subheader?: ReactNode;
}

const ModalVariantThree: React.FC<ModalVariantThreeProps> = (props: ModalVariantThreeProps) => {
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
                    padding: "15px 20px",
                    borderRadius: "4px",
                }}
            >
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h4" fontWeight={600}>
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
                <Stack marginBlock="20px">{props.content}</Stack>
            </Box>
        </Modal>
    );
};

export default ModalVariantThree;
