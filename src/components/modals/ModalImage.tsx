import React from "react";
import { Modal } from "@mui/material";

interface ModalImageProps {
    image: string;
    altText?: string;
    open: boolean;
    onClose: () => void;
}

const ModalImage: React.FC<ModalImageProps> = ({
    image,
    altText,
    open,
    onClose,
}) => {
    return (
        <Modal
            open={open}
            onClose={onClose} // Close modal when clicking outside
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                outline: 1,
            }}
        >
            <img
                src={image}
                alt={altText || "Full View"}
                style={{
                    maxWidth: "450px",
                    minWidth: "250px",
                    maxHeight: "350px",
                    minHeight: "250px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
                    objectFit: "contain",
                }}
            />
        </Modal>
    );
};

export default ModalImage;
