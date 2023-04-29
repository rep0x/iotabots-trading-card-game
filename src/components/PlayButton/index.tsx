import React from "react";

import { Box, Typography } from "@mui/material";
import type { BoxProps } from "@mui/material";

import Svg from "./Svg";

interface Props extends BoxProps {
  disabled: boolean;
}

const Play: React.FC<Props> = (props) => {
  return (
    <Box sx={styles.root} {...props}>
      <Svg state={props.disabled ? "disabled" : "default"} />
      <Box sx={styles.wrapper}>
        <Typography sx={{ opacity: props.disabled ? "0.5" : "1" }} variant="h3">
          PLAY
        </Typography>
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
