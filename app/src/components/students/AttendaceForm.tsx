import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Alert from "@mui/material/Alert";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import { ValidatedForm } from "remix-validated-form";
import { FormInputText } from "../FormInputText";
import SubmitButton from "../SubmitButton";
import { studentAttendanceValidator } from "~/lib/constants";

export default function AttendanceForm() {
  return (
    <Box
      component={ValidatedForm}
      validator={studentAttendanceValidator}
      id="attendance_code"
      method="post"
      defaultValues={{
        code: "",
      }}
      //onSubmit={handleSubmit(onSubmit)}
    >
      <div style={{ paddingBottom: 6 }}>
        <Alert severity="warning">
          Enter the Pin Code provided by the lecturer inorder to authenticate
          your attendance status.
        </Alert>
      </div>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={8}>
          <FormInputText
            name="code"
            label="Attendance Code"
            styles={{ mt: 1 }}
          />
        </Grid>
        <Grid item xs={4}>
          <SubmitButton
            title="Submit"
            formId="attendance_code"
            styles={{ width: "50%", mb: 2 }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
