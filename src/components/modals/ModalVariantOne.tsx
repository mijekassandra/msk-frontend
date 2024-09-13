import React, { ReactNode, MouseEvent } from "react";
import { Modal, Box, Typography, Divider, Stack, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

// import components
import TwoChoice from "../buttons/TwoChoice";

// MODAL FOR FORMS
interface ModalVariantOneProps {
    content: ReactNode;
    headerTitle?: string;
    onClose: () => void;
    subheader?: ReactNode;
    onSubmit?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const ModalVariantOne: React.FC<ModalVariantOneProps> = ({
    content,
    headerTitle,
    onClose,
    subheader,
    onSubmit,
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
                    maxWidth: "500px",
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
                        pb: "10px",
                    }}
                >
                    <Typography variant="h3">{headerTitle}</Typography>
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
                <Stack>
                    <TwoChoice
                        leftText="Cancel"
                        rightText="Confirm"
                        color="error"
                        size="medium"
                        leftOnClick={onClose}
                        rightOnClick={onSubmit}
                    />
                </Stack>
            </Box>
        </Modal>
    );
};
export default ModalVariantOne;
