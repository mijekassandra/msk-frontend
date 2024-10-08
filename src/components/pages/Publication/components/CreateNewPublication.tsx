import React, { useState } from "react";
import { Stack, TextField } from "@mui/material";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

//import components
import ModalVariantTwo from "../../../modals/ModalVariantTwo";
import CustomUpload2 from "../../../layout/CustomUpload2";

interface CreateNewPublicationProps {
  mode: "create" | "edit" | "view";
  initialData?: {
    id?: number;
    title?: string;
    content?: string;
    type?: "Federation" | "Chairperson";
    attachment?: string;
  };
  onClose: () => void;
  addPublication: any;
  editPublication: any;
}

const CreateNewPublication: React.FC<CreateNewPublicationProps> = ({
  mode,
  initialData = {},
  onClose,
  addPublication,
  editPublication,
}) => {
  // logged in user details
  const userDetail = useSelector((state: RootState) => state.auth.user);

  // form data to populate form with selected data
  const [formData, setFormData] = useState({
    id: initialData.id || "",
    title: initialData.title || "",
    content: initialData.content || "",
    type: initialData.type || "",
    attachment: initialData.attachment || "",
  });

  // handle changes the formdata state when there are input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // submit button
  const handleSubmitPublication = async () => {
    try {
      const publicationData = { ...formData, account_id: userDetail.id };

      if (mode === "create") {
        await addPublication(publicationData);

        Swal.fire({
          title: "Success!",
          text: "The publication has been successfully created.",
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
        await editPublication({
          id: publicationData.id,
          publication: publicationData,
        });

        Swal.fire({
          title: "Success!",
          text: "The publication has been successfully updated.",
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
    <ModalVariantTwo
      onClose={onClose}
      onSave={handleSubmitPublication}
      headerTitle={
        mode === "create"
          ? "Create Publication"
          : mode === "edit"
          ? "Edit Publication"
          : "View Publication"
      }
      mode={mode}
      content={
        <Stack spacing={2}>
          <TextField
            id="outlined-title"
            name="title"
            label="Title"
            variant="outlined"
            value={formData.title}
            onChange={handleInputChange}
            disabled={mode === "view"}
          />
          <TextField
            id="outlined-description"
            name="content"
            label="Description"
            variant="outlined"
            multiline
            minRows={5}
            maxRows={10}
            value={formData.content}
            onChange={handleInputChange}
            disabled={mode === "view"}
          />
          <CustomUpload2 label="Attach Files" />
        </Stack>
      }
    ></ModalVariantTwo>
  );
};

export default CreateNewPublication;
