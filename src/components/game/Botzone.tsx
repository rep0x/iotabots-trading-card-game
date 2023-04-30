import React from "react";
import { Box } from "@mui/material";

const Botzone = () => {
  return <Box sx={styles.root}>Botzone</Box>;
};

export default Botzone;

const styles = {
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    bgcolor: "rgba(0,0,0,0.5)",
    p: 2,
    textAlign: "center",
    borderRadius: 2,
    width: "100%",
    flex: 1,
  },
};
