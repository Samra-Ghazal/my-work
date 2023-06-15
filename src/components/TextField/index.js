import React from "react";
import { TextField } from "@mui/material";

const InputTextField = ({
  inputRef,
  label,
  max,
  value,
  onChange = () => {},
  name,
  size = "small",
  touch,
  error,
  helperText,
  type,
  disabled,
  placeholder,
  fieldType = "text",
  InputProps,
  multiline = false,
  variant = "standard",
  rows = 1,
  minRows = 1,
  maxRows = "",
  className = "custom-text-field",
  onKeyDown = () => {},
  ...props
}) => {
  const onHandleChange = (e, change) => {
    if ((type && type === "number") || fieldType === "number") {
      if (e && e.target && e.target.value && Number(e.target.value) <= 999999) {
        return change(e);
      }
      if (e && e.target && e.target.value === "") {
        return change(e);
      }
    } else {
      change(e);
    }
  };

  return (
    <TextField
      fullWidth
      multiline={multiline}
      // rows={rows}
      minRows={minRows}
      maxRows={maxRows}
      inputRef={inputRef}
      type={type || "Enter Your Text"}
      className={`${className}`}
      max={max}
      label={label}
      value={value}
      onKeyDown={onKeyDown}
      onChange={(e) => onHandleChange(e, onChange)}
      placeholder={placeholder || ""}
      size={size}
      name={name}
      InputProps={InputProps}
      helperText={helperText}
      disabled={disabled || false}
      variant={variant}
      {...props}
    />
  );
};

export default InputTextField;
