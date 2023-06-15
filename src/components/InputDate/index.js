import * as React from "react";
import TextField from "../TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { defaultFormat } from "moment";

const InputDate = ({
  label = "Date",
  name,
  value = "",
  minDate,
  maxDate,
  disabled = false,
  onChange = () => {},
  helperText = null,
  inputFormat = "YYYY-MM-DD",
  defaultValue = new Date(),
  defaultCalendarMonth,
  sx,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        className="custom-text-field custom-date-picker"
        inputFormat={inputFormat}
        minDate={minDate}
        maxDate={maxDate}
        disabled={disabled}
        defaultCalendarMonth={defaultCalendarMonth}
        label={label}
        value={value}
        onChange={onChange}
        defaultValue={defaultValue}
        sx={sx}
        // sx={{
        //   ".css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input": {
        //     height: "15px",
        //     width: "150px",
        //     backgroundColor: "hwb(187 78% 5%)",
        //     border: 0,
        //     borderRadius: "2px",
        //   },
        //   ".css-1unc4a9-MuiInputBase-root-MuiOutlinedInput-root": {
        //     backgroundColor: "hwb(187 78% 5%)",
        //     width: "180px",
        //   },
        // }}
        slotProps={{
          textField: {
            size: "small",
            error: false,
          },
        }}
        // classes={{
        //   root: "!bg-primary !text-secondary custom-date-picker-popup",
        // }}
        renderInput={(params) => (
          <TextField
            {...params}
            name={name}
            size={"small"}
            variant={"standard"}
            helperText={helperText}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default InputDate;
