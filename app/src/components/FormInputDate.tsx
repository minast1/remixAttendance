import React from "react";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";
import { useField } from "remix-validated-form";

type FormInputProps = {
  name: string;
  label: string;
};
export const FormInputDate = ({ name, label }: FormInputProps) => {
  const [value, setValue] = React.useState<Date | null>(new Date());
  const { getInputProps } = useField(name);
  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };
  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <DatePicker
        label={label}
        inputFormat="MM/dd/yyyy"
        value={value}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            {...getInputProps({ id: name })}
          />
        )}
      />
    </LocalizationProvider>
  );
};
