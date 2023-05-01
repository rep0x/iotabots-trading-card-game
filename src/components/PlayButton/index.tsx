import React from "react";

import { Box, Typography } from "@mui/material";
import type { BoxProps } from "@mui/material";

import Svg from "./Svg";

interface Props extends BoxProps {
  disabled: boolean;
  label?: string;
  inQueue?: string;
}

const Play: React.FC<Props> = (props) => {
  const { disabled, label, inQueue, onClick } = props;
  return (
    <Box
      sx={{ ...styles.root, cursor: disabled ? "default" : "pointer" }}
      onClick={disabled ? () => {} : onClick}
      className="play-button"
    >
      <Svg state={disabled ? "disabled" : "default"} />
      <Box sx={styles.wrapper}>
        {label && (
          <Typography sx={{ opacity: disabled ? "0.5" : "1" }} variant="h3">
            {label}
          </Typography>
        )}
        {inQueue && (
          <>
            <Typography sx={styles.typo}>In Queue</Typography>
            <Typography
              sx={{ textAlign: "center", my: 1, letterSpacing: 4 }}
              variant="h3"
            >
              <>{inQueue}</>
            </Typography>
            <Typography sx={styles.typo}>Cancel</Typography>
          </>
        )}
      </Box>
    </Box>
  );
};

const styles = {
  root: {
    position: "relative",
  },
  wrapper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  typo: {
    opacity: 0.8,
    fontSize: 14,
    textTransform: "uppercase",
    letterSpacing: 1,
    fontWeight: "bold",
    textAlign: "center",
  },
};

export default Play;
