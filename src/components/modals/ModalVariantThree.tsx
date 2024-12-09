import React, { ReactNode } from "react";
import {
    Modal,
    Box,
    Typography,
    Divider,
    Stack,
    IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";

// MODAL FOR UPLOADS

interface ModalVariantThreeProps {
    content: ReactNode;
    headerTitle?: string;
    onClose: () => void;
    subheader?: ReactNode;
    headerIcon?: ReactNode | string;
}

const ModalVariantThree: React.FC<ModalVariantThreeProps> = (
    props: ModalVariantThreeProps
) => {
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
                    padding: "15px 20px",
                    borderRadius: "4px",
                }}
            >
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    marginBottom={1}
                >
                    <Stack direction="row" gap={1}>
                        <IconButton
                            sx={{
                                backgroundColor: "black",
                                borderRadius: "50%",
                                width: "28px",
                                height: "28px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "white",
                                fontSize: "16px",
                            }}
                        >
                            {props.headerIcon}
                        </IconButton>

                        <Typography variant="h4" fontWeight={600}>
                            {props.headerTitle}
                        </Typography>
                    </Stack>

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
                <Stack
                    marginBlock="20px"
                    sx={{ overflowY: "auto", maxHeight: "350px" }}
                >
                    {props.content}
                </Stack>
            </Box>
        </Modal>
    );
};

export default ModalVariantThree;
