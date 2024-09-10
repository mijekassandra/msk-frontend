import React from "react";
import { Grid, Stack, TextField, Button } from "@mui/material";

import { CloudUpload } from "@mui/icons-material";

//import component
import ModalVariantOne from "../../../modals/modalVariantOne";
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
                <Grid container spacing={3}>
                    <Grid item xs={6} width="100%">
                        <Stack spacing={2}>
                            <TextField id="outlined-basic" label="Firstname" variant="outlined" />
                            <TextField id="outlined-basic" label="Lastname" variant="outlined" />
                            <TextField id="outlined-basic" label="Middlename" variant="outlined" />
                            <TextField id="outlined-basic" label="Age" variant="outlined" />
                            <TextField id="outlined-basic" label="Gender" variant="outlined" />
                        </Stack>
                    </Grid>
                    <Grid item xs={6} width="100%">
                        <Stack spacing={2}>
                            <TextField id="outlined-basic" label="Email" variant="outlined" />

                            <CustomUpload label="Upload Avatar" />
                        </Stack>
                    </Grid>
                </Grid>
            }
        />
    );
};

export default CreateNewAdmin;
