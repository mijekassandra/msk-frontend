import React from "react";
import { Stack, TextField } from "@mui/material";

//import components
import ModalVariantTwo from "../../../modals/ModalVariantTwo";
import CustomUpload2 from "../../../layout/CustomUpload2";

interface CreateNewPublicationProps {
    id: string;
    publication_title: string;
    publication_content: string;
    onClose: () => void;
}

const CreateNewPublication: React.FC<CreateNewPublicationProps> = (
    props: CreateNewPublicationProps
) => {
    return (
        <ModalVariantTwo
            onClose={props.onClose}
            headerTitle="Create Publication"
            content={
                <Stack spacing={2}>
                    <TextField id="outlined-multiline-static" label="Title" variant="outlined" />
                    <TextField
                        id="outlined-basic"
                        label="Description"
                        variant="outlined"
                        multiline
                        minRows={5}
                        maxRows={10}
                    />
                    <CustomUpload2 label="Attach Files" />
                </Stack>
            }
        ></ModalVariantTwo>
    );
};

export default CreateNewPublication;
