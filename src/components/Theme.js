import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9", // light blue
    },
    secondary: {
      main: "#f48fb1", // pink
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
      secondary: "#aaaaaa",
    },
  },
  typography: {
    fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,
  },

  components: {
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: "1rem", // slightly larger for readability
          color: "#d32f2f", // match MUI's default "error.main"
          marginTop: "4px", // spacing from input
          marginBottom: "4px"
        },
      },
    },
  },
});

export default darkTheme;
