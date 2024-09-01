import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

//import mui themeprovider
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#030A59",
      light: "#040d72",
      dark: "#020740",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#FBD11D",
      light: "#fbd636",
      dark: "#facc04",
      contrastText: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: ["Poppins", "Helvetica Neue", "Roboto", "sans-serif"].join(","),
    button: {
      fontWeight: 400,
      fontSize: 16,
      letterSpacing: 0.75,
    },
    h1: {
      fontSize: 36,
      fontWeight: 400,
      lineHeight: "46px",
    },
    h2: {
      fontSize: 26,
      fontWeight: 400,
      lineHeight: "36px",
    },
    h3: {
      fontSize: 20,
      fontWeight: 400,
      lineHeight: "30px",
    },
    h4: {
      fontSize: 18,
      fontWeight: 400,
      lineHeight: "28px",
    },
    subtitle1: {
      fontSize: 16,
      fontWeight: 400,
      lineHeight: "20px",
    },
    subtitle2: {
      fontSize: 16,
      fontWeight: 500,
      lineHeight: "20px",
    },
    body1: {
      fontSize: 12,
      fontWeight: 400,
      lineHeight: "18px",
      letterSpacing: "0.14px",
    },
    body2: {
      fontSize: 12,
      fontWeight: 500,
      lineHeight: "18px",
      letterSpacing: "0.14px",
    },
    caption: {
      fontSize: 10,
      fontWeight: 400,
      lineHeight: "16px",
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>
);
