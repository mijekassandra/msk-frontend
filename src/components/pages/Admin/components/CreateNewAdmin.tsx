import React, { useState } from "react";
import { Stack, TextField } from "@mui/material";
import Swal from "sweetalert2";

//import component
import ModalVariantOne from "../../../modals/ModalVariantOne";

interface CreateNewAdminProps {
  mode: "create" | "edit" | "view";
  initialData?: {
    id?: number;
    username?: string;
    email?: string;
    role?: string;
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
  const [formData, setFormData] = useState({
    id: initialData.id || "",
    username: initialData.username || "",
    email: initialData.email || "",
    role: initialData.role || "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "id" ? Number(value) : value,
    }));
  };

  const handleSubmitAccount = async () => {
    try {
      const accountData = {
        ...formData,
        user_type: "Chairperson",
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
        </Stack>
      }
    />
  );
};

export default CreateNewAdmin;
