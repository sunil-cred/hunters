import React from "react";
import { TextField } from "@mui/material";

const InputField = ({ onChange = () => {}, error = false, ...rest }) => {
  return (
    <>
      <TextField
        error={error}
        helperText={error && "Something went wrong. Please try again."}
        InputProps={{ sx: { borderRadius: "16px" } }}
        onChange={({ target: { value } }) => onChange(value)}
        {...rest}
      />
    </>
  );
};

export default InputField;
