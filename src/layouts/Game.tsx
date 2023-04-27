import React from "react";
import { Box, Typography } from "@mui/material";

interface Props {
  children: React.ReactNode;
}

const Game: React.FC<Props> = ({ children }) => {
  return (
    <Box>
      <Typography>Game Layout</Typography>
      {children}
    </Box>
  );
};

export default Game;
