import React from "react";
import { Box } from "@mui/material";

const Deck = () => {
  return <Box sx={styles.root}>Deck</Box>;
};

export default Deck;

const styles = {
  root: {
    bgcolor: "rgba(0,0,0,0.5)",
    p: 2,
    textAlign: "center",
    borderRadius: 2,
    width: "100%",
  },
};
