import { createTheme } from "@mui/material/styles";

const theme = createTheme({

  palette: {

    mode: "light",

    primary: {
      main: "#2563eb",
    },

    secondary: {
      main: "#7c3aed",
    },

    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },

  },

  typography: {
    fontFamily: "Arial",
  },

  shape: {
    borderRadius: 14,
  },

});

export default theme;