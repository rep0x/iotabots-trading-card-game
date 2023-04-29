import React from "react";
import { useRouter } from "next/router";
import { Box } from "@mui/material";

import { TRANSITIONS } from "@/theme";

import PlayButton from "../PlayButton";
import Menu from "./Menu";

const Navbar = () => {
  const { pathname } = useRouter();
  const isHome = pathname === "/";

  return (
    <Box sx={styles.root}>
      <Menu />
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
};

export default Navbar;
