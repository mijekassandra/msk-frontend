import React, { useState, useEffect } from "react";
import { Stack, TextField, MenuItem } from "@mui/material";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

//import component
import ModalVariantOne from "../../../modals/ModalVariantOne";

interface CreateNewAdminProps {
  mode: "create" | "edit" | "view";
  initialData?: {
    id?: number;
    username?: string;
    email?: string;
    role?: string;
    barangay?: string;
  };
  onClose: () => void;
  addAccount: any;
  editAccount: any;
}

const CreateNewAdmin: React.FC<CreateNewAdminProps> = ({
  mode,
  initialData = {},
  onClose,
  addAccount,
  editAccount,
}) => {
  // logged in user details
  const userDetail = useSelector((state: RootState) => state.auth.user);

  console.log("userdetail:", userDetail.role);

  const [formData, setFormData] = useState({
    username: initialData.username || "",
    email: initialData.email || "",
    role: initialData.role || "",
    barangay: initialData.barangay || "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitAccount = async () => {
    try {
      const accountData = {
        ...formData,
        role:
          userDetail?.role === "Chairperson"
            ? "User"
            : userDetail?.role === "Federation" ||
              userDetail?.role === "Super Admin"
            ? "Chairperson"
            : "Default Role",
      };

      if (mode === "create") {
        await addAccount(accountData);

        Swal.fire({
          title: "Success!",
          text: "The account has been successfully created.",
          icon: "success",
          confirmButtonText: "OK",
          customClass: {
            title: "my-swal-title",
            htmlContainer: "my-swal-text",
            popup: "my-swal-popup",
            confirmButton: "my-swal-button",
          },
        });
      } else if (mode === "edit") {
        await editAccount({
          id: String(accountData.id),
          account: accountData,
        });

        Swal.fire({
          title: "Success!",
          text: "The account has been successfully updated.",
          icon: "success",
          confirmButtonText: "OK",
          customClass: {
            title: "my-swal-title",
            htmlContainer: "my-swal-text",
            popup: "my-swal-popup",
            confirmButton: "my-swal-button",
          },
        });
      }
      onClose(); // Close modal after successful save
    } catch (error) {
      console.error("Error saving publication:", error);
    }
  };

  return (
    <ModalVariantOne
      onClose={onClose}
      onSave={handleSubmitAccount}
      headerTitle={
        mode === "create"
          ? "Create Account"
          : mode === "edit"
          ? "Edit Account"
          : "View Account"
      }
      mode={mode}
      maxWidth="400px"
      content={
        <Stack rowGap={2}>
          <TextField
            id="outlined-username"
            name="username"
            label="Username"
            variant="outlined"
            value={formData.username}
            onChange={handleInputChange}
            disabled={mode === "view"}
          />
          <TextField
            id="outlined-email"
            name="email"
            label="Email"
            variant="outlined"
            value={formData.email}
            onChange={handleInputChange}
            disabled={mode === "view"}
          />
          <TextField
            fullWidth
            label="Barangay"
            select
            variant="outlined"
            name="barangay"
            placeholder="Select Barangay"
            value={formData.barangay}
            onChange={handleInputChange}
            disabled={mode === "view"}
          >
            <MenuItem value="">Select Barangay</MenuItem>
            <MenuItem value="Poblacion">Poblacion</MenuItem>
            <MenuItem value="Kabulawan">Kabulawan</MenuItem>
            <MenuItem value="Dampil">Dampil</MenuItem>
            <MenuItem value="Manaol">Manaol</MenuItem>
            <MenuItem value="Banglay">Banglay</MenuItem>
            <MenuItem value="Tabok">Tabok</MenuItem>
            <MenuItem value="Kauswagan">Kauswagan</MenuItem>
            <MenuItem value="Gaston">Gaston</MenuItem>
            <MenuItem value="Lumbo">Lumbo</MenuItem>
            <MenuItem value="Umagos">Umagos</MenuItem>
          </TextField>
        </Stack>
      }
    />
  );
};

export default CreateNewAdmin;
