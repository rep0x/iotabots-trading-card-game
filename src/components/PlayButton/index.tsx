import React from "react";

import { Box, Typography } from "@mui/material";
import type { BoxProps } from "@mui/material";

import Svg from "./Svg";

const Play: React.FC<BoxProps> = (props) => {
  return (
    <Box sx={styles.root} {...props}>
      <Svg />
      <Box sx={styles.wrapper}>
        <Typography variant="h3">PLAY</Typography>
      </Box>
    </Box>
  );
};

const styles = {
  root: {
    position: "relative",
    cursor: "pointer",
  },
  wrapper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
};

export default Play;
