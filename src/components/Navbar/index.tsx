import React from "react";

import { Box } from "@mui/material";

import PlayButton from "../PlayButton";
import Menu from "./Menu";
import { TRANSITIONS } from "@/theme";

const Navbar = () => {
  const isHome = true;

  return (
    <Box sx={styles.root}>
      <Menu />
      <Box
        sx={{
          transform: isHome ? "scale(1)" : "scale(0.8)",
          ...styles.wrapper,
        }}
      >
        <PlayButton />
      </Box>
    </Box>
  );
};

const styles = {
  root: {
    position: "fixed",
    bottom: 0,
    left: 0,
    height: 125,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.8)",
    borderTop: "2px solid",
    borderColor: "secondary.main",
  },
  wrapper: {
    position: "fixed",
    bottom: 40,
    right: 40,

    transformOrigin: "bottom right",
    transition: TRANSITIONS[300],
  },
};

export default Navbar;
