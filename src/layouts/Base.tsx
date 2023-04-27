import React from "react";
import { Roboto_Serif } from "next/font/google";
import { Box } from "@mui/material";

import Navbar from "@/components/Navbar";
import Header from "@/components/Header";

interface Props {
  children: React.ReactNode;
}

const font = Roboto_Serif({
  weight: ["300", "700", "800"],
  subsets: ["latin"],
});

const Base: React.FC<Props> = ({ children }) => {
  return (
    <main className={`${font.className}`}>
      <Box sx={styles.root}>
        <Header />
        <Box sx={styles.video}>
          <video autoPlay muted loop>
            <source src="/background.mp4" type="video/mp4" />
          </video>
        </Box>
        <Box sx={styles.page}>{children}</Box>
        <Navbar />
      </Box>
    </main>
  );
};

const styles = {
  root: {
    height: "100vh",
    width: "100%",
    overflow: "hidden",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  video: {
    position: "fixed",
    zIndex: -1,
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    overflow: "hidden",
    display: "flex",
    alignedItems: "center",
    justifyContent: "center",

    "& video": {
      minWidth: "100%",
      minHeight: "100%",
      objectFit: "cover",
    },
  },
  page: {
    position: "fixed",
    top: 80,
    left: 0,
    width: "100%",
    pt: "80px",
    pb: "40px",
    height: "calc(100vh - 205px)",
    overflowY: "scroll",
  },
};

export default Base;
