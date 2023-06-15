import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import "./index.scss";
import SideNavOne from "../src/components/NavBar";
import App from "./App";
const theme = createTheme({
  typography: {
    fontFamily: "inherit",
  },
});
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <SideNavOne>
          <App />
        </SideNavOne>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
