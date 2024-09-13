import React from "react";
import { Grid, Stack, TextField, Button } from "@mui/material";

import { CloudUpload } from "@mui/icons-material";

//import component
import ModalVariantOne from "../../../modals/ModalVariantOne";
import CustomUpload from "../../../layout/CustomUpload";

interface CreateNewAdminProps {
    id: string;
    first_name: string;
    last_name: string;
    middle_name: string;
    age: number;
    gender: "female" | "male";
    email: string;
    avatar: string;
    onClose: () => void;
}

const CreateNewAdmin: React.FC<CreateNewAdminProps> = (props: CreateNewAdminProps) => {
    return (
        <ModalVariantOne
            onClose={props.onClose}
            headerTitle="ADD NEW ADMIN"
            content={
                <Stack spacing={1.5}>
                    <TextField id="outlined-basic" label="username" variant="outlined" />
                    <TextField id="outlined-basic" label="email" variant="outlined" />
                </Stack>
            }
        />
    );
};

export default CreateNewAdmin;
