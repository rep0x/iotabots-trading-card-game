import React from "react";
import { Box } from "@mui/material";

const GameState = () => {
  return <Box sx={styles.root}>GameState</Box>;
};

export default GameState;

const styles = {
  root: {
    bgcolor: "rgba(0,0,0,0.5)",
    p: 2,
    textAlign: "center",
    borderRadius: 2,
  },
};
