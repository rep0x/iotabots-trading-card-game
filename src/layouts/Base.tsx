import { Box, Typography } from "@mui/material";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const Base: React.FC<Props> = ({ children }) => {
  return (
    <Box>
      <Typography>Base Layout</Typography>
      {children}
    </Box>
  );
};

export default Base;
