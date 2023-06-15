import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import TextField from "../TextField";

const InputTime = ({
  label = "Time",
  format = "hh:mm",
  views = ["hours", "minutes"],
  name,
  value = "",
  minTime,
  maxTime,
  disabled = false,
  onChange = () => {},
  helperText = null,
  inputFormat = "",
  defaultValue,
  sx,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        // className="custom-text-field custom-date-picker"
        inputFormat={inputFormat}
        minTime={minTime}
        maxTime={maxTime}
        disabled={disabled}
        // label={label}
        value={value}
        onChange={onChange}
        views={views}
        format={format}
        sx={sx}
        defaultValue={defaultValue}
        slotProps={{ textField: { size: "small", error: false } }}
        ampm={false}
        skipDisabled={true}
        renderInput={(params) => (
          <TextField
            {...params}
            name={name}
            size={"small"}
            variant={"standard"}
            helperText={helperText}
            error={false}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default InputTime;
