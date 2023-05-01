import React from "react";
import { Box, Typography } from "@mui/material";

import { TRANSITIONS } from "@/theme";
import { api } from "@/utils/api";

import RoundBG from "./icons/RoundBG";

const MYTURN = true;

const Round = () => {
  const { data: game } = api.games.getGame.useQuery();

  if (!game) return null;

  return (
    <Box sx={styles.root}>
      <Box
        sx={{
          ...styles.circle,

          "& svg": {
            transition: TRANSITIONS[300],
            color: MYTURN ? "info.main" : "background.paper",
            position: "absolute",
            transform: MYTURN
              ? "scale(1) rotate(0)"
              : "scale(1) rotate(180deg)",
          },
        }}
      >
        <RoundBG />
        <Box position="relative">
          <Typography variant="h5">{`${String(game.round)}`}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

const styles = {
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    zIndex: 2,
    height: 100,
    width: 100,
  },
  circle: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 80,
    width: 80,
  },
};

export default Round;
