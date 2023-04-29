import React from "react";
import { Box, Typography } from "@mui/material";

import Avatar from "./Avatar";

interface PlayerInfoProps {
  avatar: string;
  name: string;
}

const PlayerInfo: React.FC<PlayerInfoProps> = ({ avatar, name }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
    }}
  >
    <Avatar avatar={avatar} />
  </Box>
);

export default PlayerInfo;
