import React from "react";
import { Box, Typography } from "@mui/material";

import Progress from "../icons/Progress";
import { shortenAddress } from "../utils/shortenAddress";
import Avatar from "./Avatar";

interface PlayerInfoProps {
  avatar: string;
  name: string;
}

const PlayerInfo: React.FC<PlayerInfoProps> = ({ avatar, name }) => (
  <Box
    sx={{
      display: "flex",
    }}
  >
    <Avatar avatar={avatar} />
    <Box mt={2}>
      <Typography ml={2} mb={0.5} variant="h5">
        {name}
      </Typography>
      <Box
        sx={{
          transform: "translate(0)",
        }}
      >
        <Progress progress={0.66} />
      </Box>
    </Box>
  </Box>
);

export default PlayerInfo;
