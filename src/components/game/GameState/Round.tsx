import React from "react";
import { Box, Typography } from "@mui/material";

import { TRANSITIONS } from "@/theme";
import { api } from "@/utils/api";

import RoundBG from "./icons/RoundBG";
import { useUser } from "@clerk/nextjs";

const Round = () => {
  const { data: game } = api.games.getGame.useQuery();

  const { user } = useUser();

  if (!game || !user) return null;

  const myPlayerKey = game.player1Id === user.id ? "player1" : "player2";
  const myturn = game.currentPlayer === myPlayerKey;

  return (
    <Box sx={styles.root}>
      <Box
        sx={{
          ...styles.circle,

          "& svg": {
            transition: TRANSITIONS[300],
            color: myturn ? "info.main" : "background.paper",
            position: "absolute",
            transform: myturn
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
