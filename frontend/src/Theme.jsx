import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "'Open Sans', sans-serif",
  },
  palette: {
    mode: "dark", // optional if you're using a dark theme
  },
});

export default theme;
