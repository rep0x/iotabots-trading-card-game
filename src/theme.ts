import { createTheme } from "@mui/material/styles";

export const transitions = {
  300: "all 300ms cubic-bezier(0.65, 0, 0.35, 1) 0s",
  120: "all 120ms cubic-bezier(0.65, 0, 0.35, 1) 0s",
};

const TYPE_SPACING = [10, 12, 14, 16, 20, 24, 32, 40, 48, 62, 124];

const BASE_HEADLINE_STYLES = {
  fontWeight: 700,
  lineHeight: 1.2,
  letterSpacing: "0em",
};
const BASE_BODY_STYLES = {
  fontWeight: 300,
  lineHeight: 1.5,
  letterSpacing: "0em",
};
const BASE_BUTTON_STYLES = {
  fontWeight: 600,
  lineHeight: 1,
  letterSpacing: "0em",
};

export const THEME = createTheme({
  typography: {
    fontFamily: [
      "Inter",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    h1: { ...BASE_HEADLINE_STYLES, fontSize: TYPE_SPACING[9] },
    h2: { ...BASE_HEADLINE_STYLES, fontSize: TYPE_SPACING[8] },
    h3: { ...BASE_HEADLINE_STYLES, fontSize: TYPE_SPACING[7] },
    h4: { ...BASE_HEADLINE_STYLES, fontSize: TYPE_SPACING[6] },
    h5: { ...BASE_HEADLINE_STYLES, fontSize: TYPE_SPACING[5] },
    h6: { ...BASE_HEADLINE_STYLES, fontSize: TYPE_SPACING[4] },
    subtitle1: { ...BASE_BODY_STYLES, fontSize: TYPE_SPACING[4] },
    subtitle2: { ...BASE_BODY_STYLES, fontSize: TYPE_SPACING[3] },
    body1: { ...BASE_BODY_STYLES, fontSize: TYPE_SPACING[3] },
    body2: {
      ...BASE_BODY_STYLES,
      fontSize: TYPE_SPACING[2],
      textTransform: "none",
      fontWeight: 700,
    },
    button: { ...BASE_BUTTON_STYLES, fontSize: TYPE_SPACING[3] },
    caption: { ...BASE_BODY_STYLES, fontSize: TYPE_SPACING[1] },
    overline: { ...BASE_BODY_STYLES, fontSize: TYPE_SPACING[1] },
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#0FD698",
      contrastText: "#fff",
    },
    secondary: {
      main: "#121212",
      contrastText: "#fff",
    },
    background: {
      paper: "#121212",
      default: "#1d1d1d",
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textDecoration: "none",
          textTransform: "none",
          "&.MuiButton-containedPrimary": {
            color: "#ffffff",
          },
        },
      },
    },
  },
});
