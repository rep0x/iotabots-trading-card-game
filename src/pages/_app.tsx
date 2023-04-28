import "@/globals.css";
import { THEME } from "@/theme";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider, CssBaseline } from "@mui/material";
import type { AppProps } from "next/app";

import { api } from "@/utils/api";
import { Toaster } from "react-hot-toast";
import { CardsProvider } from "@/context/CardsContext";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ClerkProvider {...pageProps}>
      <Toaster />
      <ThemeProvider theme={THEME}>
        <CardsProvider>
          <CssBaseline />
          <Component {...pageProps} />
        </CardsProvider>
      </ThemeProvider>
    </ClerkProvider>
  );
};

export default api.withTRPC(App);
