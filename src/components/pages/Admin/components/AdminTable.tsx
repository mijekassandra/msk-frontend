import React, { useState } from "react";
import { Box, Typography, FormControlLabel, IconButton, Stack, Switch } from "@mui/material";
import { Visibility, BorderColor, Delete, AddCircle } from "@mui/icons-material";

//import components
import CustomDataGrid from "../../../layout/CustomDataGrid";
import PrimaryButton from "../../../buttons/PrimaryButton";
import CreateNewAdmin from "./CreateNewAdmin";

const adminData = [
    {
        id: 1,
        first_name: "Juan",
        last_name: "Dela Cruz",
        middle_name: "Batumbakal",
        age: 22,
        gender: "Male",
        email: "juan@gmail.com",
    },
    {
        id: 2,
        first_name: "Mara Lois",
        last_name: "Romo",
        middle_name: "Smith",
        age: 21,
        gender: "Female",
        email: "mara@gmail.com",
    },
    {
        id: 3,
        first_name: "Princess Nina",
        last_name: "Puzon",
        middle_name: "Lee",
        age: 20,
        gender: "Femail",
        email: "princess@gmail.com",
    },
    {
        id: 4,
        first_name: "Max",
        last_name: "Verstappen",
        middle_name: "Emilian",
        age: 26,
        gender: "Male",
        email: "maxv@gmail.com",
    },
    {
        id: 5,
        first_name: "Lewis",
        last_name: "Hamilton",
        middle_name: "Carl",
        age: 38,
        gender: "Male",
        email: "lewish@gmail.com",
    },
    {
        id: 6,
        first_name: "Charles",
        last_name: "Leclerc",
        middle_name: "Albert",
        age: 25,
        gender: "Male",
        email: "charlesl@gmail.com",
    },
    {
        id: 7,
        first_name: "Lando",
        last_name: "Norris",
        middle_name: "Percy",
        age: 23,
        gender: "Male",
        email: "landon@gmail.com",
    },
];

const AdminTable = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddUserClick = () => {
        setIsModalOpen(true); // Open the modal
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // Close the modal
    };

    const columns = [
        { field: "first_name", headerName: "First Name", minWidth: 200, flex: 1 },
        { field: "last_name", headerName: "Last Name", minWidth: 200, flex: 1 },
        { field: "middle_name", headerName: "Middle Name", minWidth: 200, flex: 1 },
        { field: "age", headerName: "Age", maxWidth: 80, flex: 1 },
        { field: "gender", headerName: "Gender", maxWidth: 100, flex: 1 },
        { field: "email", headerName: "Email", minWidth: 200, flex: 1 },
        {
            field: "action",
            headerName: "Action",
            maxWidth: 160,
            renderCell: (params: any) => (
                <Box>
                    <IconButton aria-label="view">
                        <Visibility
                            sx={{
                                color: "primary.dark",
                                fontSize: "22px",
                            }}
                        />
                    </IconButton>
                    <IconButton aria-label="edit">
                        <BorderColor
                            sx={{
                                color: "secondary.light",
                                fontSize: "22px",
                            }}
                        />
                    </IconButton>
                    <IconButton aria-label="folder">
                        <Delete
                            sx={{
                                color: "error.main",
                                fontSize: "22px",
                            }}
                        />
                    </IconButton>
                </Box>
            ),
        },
    ];

    return (
        <>
            <CustomDataGrid
                rows={adminData}
                columns={columns}
                totalCount={adminData.length}
                tableLabel="LIST OF SANGGUNIANG KABATAAN CHAIRPERSON"
                actionButton={
                    <PrimaryButton
                        size="small"
                        startIcon={<AddCircle />}
                        onClick={handleAddUserClick}
                    >
                        ADD USER
                    </PrimaryButton>
                }
            />
            {isModalOpen && (
                <CreateNewAdmin
                    id=""
                    first_name=""
                    last_name=""
                    middle_name=""
                    age={0}
                    gender="male"
                    email=""
                    avatar=""
                    onClose={handleCloseModal}
                />
            )}
        </>
    );
};

export default AdminTable;
