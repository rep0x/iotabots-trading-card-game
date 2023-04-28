import "@/globals.css";
import { THEME } from "@/theme";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider, CssBaseline } from "@mui/material";
import type { AppProps } from "next/app";

import { api } from "@/utils/api";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ClerkProvider {...pageProps}>
      <ThemeProvider theme={THEME}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </ClerkProvider>
  );
};

export default api.withTRPC(App);
