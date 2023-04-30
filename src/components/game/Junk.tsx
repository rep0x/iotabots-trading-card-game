import React from "react";
import { Box } from "@mui/material";

const Junk = () => {
  return <Box sx={styles.root}>Junk</Box>;
};

export default Junk;

const styles = {
  root: {
    bgcolor: "rgba(0,0,0,0.5)",
    p: 2,
    textAlign: "center",
    borderRadius: 2,
    width: "100%",
  },
};
