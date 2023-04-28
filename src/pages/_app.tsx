import "@/styles/globals.css";
import { THEME } from "@/theme";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider, CssBaseline } from "@mui/material";
import type { AppProps } from "next/app";

import { api } from "@/utils/api";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={THEME}>
      <ClerkProvider {...pageProps}>
        <CssBaseline />
        <Component {...pageProps} />
      </ClerkProvider>
    </ThemeProvider>
  );
};

export default api.withTRPC(App);
