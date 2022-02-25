import React from "react";
import TextField from "@mui/material/TextField";
import { useField } from "remix-validated-form";
import SxProps from "@mui/material/styles";

type FormInputProps = {
  name: string;
  label: string;
  styles?: {};
};
export const FormInputText = ({ name, label, styles }: FormInputProps) => {
  const { error, getInputProps, defaultValue } = useField(name);
  const [value, setValue] = React.useState<any>(defaultValue);

  /*React.useEffect(() => {
       setValue(defaultValue)
     }, [defaultValue])*/

  return (
    <TextField
      helperText={error ? <span style={{ color: "red" }}>{error}</span> : null}
      error={error ? true : false}
      key={defaultValue}
      size="small"
      {...getInputProps({ id: name })}
      fullWidth
      sx={styles}
      label={label}
      variant="outlined"
    />
  );
};
