import React, { useState, useEffect } from "react";
import { Stack, TextField, Typography } from "@mui/material";
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
    attachment?: File | null;
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
    attachment: initialData.attachment || null,
  });
  const [fileName, setFileName] = useState<string | null>(
    initialData.attachment ? initialData.attachment.split(/[/\\]/).pop() : null // Extract file name from path
  );
  const [errorDisplay, setErrorDisplay] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    title: false,
    content: false,
  });

  // Function to handle file selection from CustomUpload2
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setFileName(file.name); // Update the file name in state
      setFormData((prev) => ({ ...prev, attachment: file })); // Update formData with the file
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field errors on input change
    setFieldErrors((prev) => ({ ...prev, [name]: false }));
  };

  const validateForm = () => {
    const errors = {
      title: !formData.title,
      content: !formData.content,
    };

    setFieldErrors(errors);

    // Check if any errors exist
    return !Object.values(errors).some((error) => error === true);
  };

  // submit button
  const handleSubmitPublication = async () => {
    const isValid = validateForm();

    if (!isValid) {
      setErrorDisplay("Please fill in all required fields");
      return;
    }

    try {
      const formSubmissionData = new FormData();
      formSubmissionData.append("title", formData.title);
      formSubmissionData.append("content", formData.content);

      // Attach the new file if uploaded; otherwise, attach the existing file
      if (formData.attachment instanceof File) {
        formSubmissionData.append("attachment", formData.attachment);
      }

      console.log("FormSubmissionData before submit:", [
        ...formSubmissionData.entries(),
      ]);

      if (mode === "create") {
        await addPublication(formSubmissionData);
      } else if (mode === "edit") {
        await editPublication({
          id: formData.id,
          publication: formSubmissionData,
        });
      }

      Swal.fire({
        title: "Success!",
        text: "The publication has been successfully created.",
        icon: "success",
        confirmButtonText: "OK",
      });

      onClose(); // Close modal after successful save
    } catch (error) {
      const typedError = error as {
        data: { status: string; message: string; error?: any };
      };
      const errorMessage =
        typedError?.data?.message || "An unexpected error occurred";
      setErrorDisplay(errorMessage);

      setTimeout(() => {
        setErrorDisplay("");
      }, 5000);
    }
  };

  useEffect(() => {
    if (mode === "create") {
      setFormData((prev) => ({
        ...prev,
        type: userDetail.role === "Federation" ? "Federation" : "Chairperson",
      }));
    }
  }, [mode, userDetail.role]);

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
            error={fieldErrors.title}
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
            error={fieldErrors.content}
            onChange={handleInputChange}
            disabled={mode === "view"}
          />
          {errorDisplay && (
            <Typography variant="caption" textAlign="right" color="error.main">
              {errorDisplay}
            </Typography>
          )}
          <CustomUpload2
            label="Attach Files"
            onChange={handleFileChange}
            accept="image/*,application/pdf"
            fileName={fileName} // Pass the file name
            mode={mode}
          />
        </Stack>
      }
    ></ModalVariantTwo>
  );
};

export default CreateNewPublication;
