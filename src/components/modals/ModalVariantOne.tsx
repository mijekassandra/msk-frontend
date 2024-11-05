import React, { ReactNode, MouseEvent } from "react";
import {
    Modal,
    Box,
    Typography,
    Divider,
    Stack,
    IconButton,
} from "@mui/material";
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
    onSave: () => void;
    mode: "create" | "edit" | "view";
    maxWidth?: string;
    loading: boolean;
}

const ModalVariantOne: React.FC<ModalVariantOneProps> = (
    props: ModalVariantOneProps
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
                    maxWidth: props.maxWidth,
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
                    <Typography variant="h3">{props.headerTitle}</Typography>
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
                    paddingTop="5px"
                    marginBlock="20px"
                    sx={{
                        maxHeight: "330px",
                        overflowY: "auto",
                        paddingBottom: "15px",
                    }}
                >
                    {props.content}
                </Stack>
                {props.mode !== "view" ? (
                    <Stack>
                        <TwoChoice
                            leftText="Cancel"
                            rightText="Confirm"
                            disabled={props.loading}
                            loading={props.loading}
                            color="error"
                            size="medium"
                            leftOnClick={props.onClose}
                            rightOnClick={props.onSave}
                        />
                    </Stack>
                ) : null}
            </Box>
        </Modal>
    );
};
export default ModalVariantOne;
