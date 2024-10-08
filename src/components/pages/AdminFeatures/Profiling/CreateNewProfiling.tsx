import React, { useState, useEffect } from "react";
import "../../../../index.css";
import {
  Divider,
  Stack,
  TextField,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Swal from "sweetalert2";

// import components
import ModalVariantTwo from "../../../modals/ModalVariantTwo";
import CustomUpload2 from "../../../layout/CustomUpload2";
import ModalVariantOne from "../../../modals/ModalVariantOne";

interface CreateNewProfilingProps {
  mode: "create" | "edit" | "view";
  initialData?: {
    id?: number;
    first_name?: string;
    last_name?: string;
    middle_name?: string;
    date_of_birth?: string;
    civil_status?: string;
    sex?: string;
    religion?: string;
    contact_no?: string;
    email?: string;
    vote_status?: string;
    address?: string;
    educational_attainment?: string;
    skill?: string;
    interest?: string;
  };
  onClose: () => void;
  addYouthProfiling: any;
  editYouthProfiling: any;
  totalCount: number;
}

const CreateNewProfiling: React.FC<CreateNewProfilingProps> = ({
  mode,
  initialData = {},
  onClose,
  addYouthProfiling,
  editYouthProfiling,
  totalCount,
}) => {
  const [formData, setFormData] = useState({
    id: initialData.id || "",
    first_name: initialData.first_name,
    last_name: initialData.last_name,
    middle_name: initialData.middle_name,
    date_of_birth: initialData.date_of_birth,
    civil_status: initialData.civil_status,
    sex: initialData.sex,
    religion: initialData.religion,
    contact_no: initialData.contact_no,
    email: initialData.email,
    vote_status: initialData.vote_status,
    address: initialData.address,
    educational_attainment: initialData.educational_attainment,
    skill: initialData.skill,
    interest: initialData.interest,
  });

  const handleSubmitProfiling = async () => {
    console.log("Hello");
  };

  return (
    <ModalVariantOne
      onClose={onClose}
      onSave={handleSubmitProfiling}
      headerTitle={
        mode === "create"
          ? "Add KK Information"
          : mode === "edit"
          ? "Edit KK Information"
          : "View KK Information"
      }
      mode={mode}
      maxWidth={"60%"}
      content={
        <Stack spacing={2} height="auto">
          <Typography variant="h5">Personal Information</Typography>
          <Grid container rowGap={2}>
            <Grid container item spacing={2} xs={12}>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  name="last_name"
                  label="Last Name"
                  variant="outlined"
                  size="small"
                  fullWidth
                  disabled={mode === "view"}
                  value={formData.last_name}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  name="first_name"
                  label="First Name"
                  variant="outlined"
                  size="small"
                  fullWidth
                  disabled={mode === "view"}
                  value={formData.first_name}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  name="middle_name"
                  label="Middle Name"
                  variant="outlined"
                  size="small"
                  fullWidth
                  disabled={mode === "view"}
                  value={formData.middle_name}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  name="ext"
                  label="Ext."
                  variant="outlined"
                  size="small"
                  fullWidth
                  disabled={mode === "view"}
                  // value={formData}
                />
              </Grid>
            </Grid>

            <Grid container item spacing={2} xs={12}>
              <Grid item xs={12} sm={4}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    slotProps={{
                      textField: { size: "small", fullWidth: true },
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  name="age"
                  label="Age"
                  variant="outlined"
                  size="small"
                  fullWidth
                  disabled={mode === "view"}
                  // value={formData.age}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <FormControl variant="outlined" fullWidth size="small">
                  <InputLabel>Sex</InputLabel>
                  <Select name="sex" label="Sex" disabled={mode === "view"}>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">No Preference</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container item spacing={2} xs={12}>
              <Grid item xs={12} sm={4}>
                <FormControl variant="outlined" fullWidth size="small">
                  <InputLabel>Civil Status</InputLabel>
                  <Select
                    name="civil_status"
                    label="Civil Status"
                    disabled={mode === "view"}
                  >
                    <MenuItem value="Single">Single</MenuItem>
                    <MenuItem value="Married">Married</MenuItem>
                    <MenuItem value="Separated">Separated</MenuItem>
                    <MenuItem value="Divorced">Divorced</MenuItem>
                    <MenuItem value="Widowed">Widowed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  name="religion"
                  label="Religion"
                  variant="outlined"
                  size="small"
                  fullWidth
                  disabled={mode === "view"}
                  value={formData.religion}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  name="purok"
                  label="Purok"
                  variant="outlined"
                  size="small"
                  fullWidth
                  disabled={mode === "view"}
                  // value={formData.purok}
                />
              </Grid>
            </Grid>

            <Grid container item spacing={2} xs={12}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="Contact No"
                  label="Contact No."
                  variant="outlined"
                  size="small"
                  fullWidth
                  disabled={mode === "view"}
                  value={formData.contact_no}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="email_address"
                  label="Email Address"
                  variant="outlined"
                  size="small"
                  fullWidth
                  disabled={mode === "view"}
                  value={formData.email}
                />
              </Grid>
            </Grid>

            <Grid container item spacing={2} xs={12}>
              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" fullWidth size="small">
                  <InputLabel>Highest Educational Attainment</InputLabel>
                  <Select name="Level" label="Level" disabled={mode === "view"}>
                    <MenuItem value="Elementary Level">
                      Elementary Level
                    </MenuItem>
                    <MenuItem value="Elementary Graduate">
                      Elementary Graduate
                    </MenuItem>
                    <MenuItem value="High School Level">
                      High School Level
                    </MenuItem>
                    <MenuItem value="High School Graduate ">
                      High School Graduate{" "}
                    </MenuItem>
                    <MenuItem value="College Level">College Level</MenuItem>
                    <MenuItem value="College Graduate">
                      College Graduate
                    </MenuItem>
                    <MenuItem value="Masters Degree">Masters Degree</MenuItem>
                    <MenuItem value="Doctorate Degree">
                      Doctorate Degree
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="Out of School"
                  label="If out of School Youth, please indicate reason"
                  variant="outlined"
                  size="small"
                  fullWidth
                  disabled={mode === "view"}
                />
              </Grid>
            </Grid>

            <Grid container item spacing={2} xs={12}>
              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" fullWidth size="small">
                  <InputLabel>Working ?</InputLabel>
                  <Select name="Level" label="Level" disabled={mode === "view"}>
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="Government Agency"
                  label="If government, what agency?"
                  variant="outlined"
                  size="small"
                  fullWidth
                  disabled={mode === "view"}
                />
              </Grid>
            </Grid>
          </Grid>

          <Typography variant="h5">Other Information</Typography>

          <Grid container rowGap={2}>
            <Grid container item spacing={2} xs={12}>
              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" fullWidth size="small">
                  <InputLabel>Do you have disability/ies?</InputLabel>
                  <Select
                    name="Yes/No"
                    label="Yes/No"
                    disabled={mode === "view"}
                  >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" fullWidth size="small">
                  <InputLabel>Do you have medical condition?</InputLabel>
                  <Select
                    name="Yes/No"
                    label="Yes/No"
                    disabled={mode === "view"}
                  >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container item spacing={2} xs={12}>
              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" fullWidth size="small">
                  <InputLabel>
                    Are you a member of any youth organization
                  </InputLabel>
                  <Select
                    name="Yes/No"
                    label="Yes/No"
                    disabled={mode === "view"}
                  >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="Organization"
                  label="If YES, please specify what organization"
                  variant="outlined"
                  size="small"
                  fullWidth
                  disabled={mode === "view"}
                />
              </Grid>
            </Grid>

            <Grid container item spacing={2} xs={12}>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  name="skills"
                  label="Skills"
                  variant="outlined"
                  size="small"
                  fullWidth
                  disabled={mode === "view"}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <TextField
                  name="interests"
                  label="Interest"
                  variant="outlined"
                  size="small"
                  fullWidth
                  disabled={mode === "view"}
                />
              </Grid>
            </Grid>
          </Grid>
        </Stack>
      }
    />
  );
};

export default CreateNewProfiling;
