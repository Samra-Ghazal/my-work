import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
const weeks = ["Week", "2 Week", "3 Week"];

export default function ComboBox() {
  return (
    <Autocomplete
      id="weeks"
      options={weeks}
      // sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Repeat every" />}
    />
  );
}
