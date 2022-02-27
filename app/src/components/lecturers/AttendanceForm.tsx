import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import { useLoaderData } from "remix";
import { lecturerSessionData } from "~/controllers/lecturerController";
import Typography from "@mui/material/Typography";
import { FormInputDropdown } from "../FormInputDropdown";
import { ValidatedForm } from "remix-validated-form";
import { FormInputDate } from "../FormInputDate";
import { lecturerAttendanceValidator } from "~/lib/constants";
import SubmitButton from "../SubmitButton";

const AttendanceForm = () => {
  const data = useLoaderData<lecturerSessionData>();
  const [toggle, setToggle] = React.useState(false);
  return (
    <Card>
      <CardHeader
        subheader={
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            {`NEW ATTENDANCE FOR ${data.course?.code} ${data.session} SESSION`}
          </Typography>
        }
      />

      <CardContent sx={{ borderTop: "1px solid lightgray" }}>
        <Box
          component={ValidatedForm}
          validator={lecturerAttendanceValidator}
          id="attendance"
          defaultValues={{ group: "ONE" }}
          sx={{
            "& .MuiTextField-root": { m: 1, width: "30ch" },
          }}
          method="post"
        >
          <div>
            <FormInputDropdown
              name="group"
              label="Group"
              options={[
                { label: "One", value: "ONE" },
                { label: "Two", value: "TWO" },
                { label: "Three", value: "THREE" },
              ]}
              styles={{ mb: 3 }}
            />

            <FormInputDate name="date" label="Attendance Date" />

            <Divider />

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <SubmitButton
                title="Submit"
                formId="attendance"
                styles={{ width: "10%" }}
              />
            </Box>
          </div>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AttendanceForm;
