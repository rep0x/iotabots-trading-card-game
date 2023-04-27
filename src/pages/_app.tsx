import "@/styles/globals.css";
import { THEME } from "@/theme";
import { ThemeProvider, CssBaseline } from "@mui/material";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={THEME}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
