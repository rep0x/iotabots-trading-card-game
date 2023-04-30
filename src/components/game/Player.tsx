import React from "react";
import { Typography, Box } from "@mui/material";

import { GameContext } from "@/context/GameContext";
import Avatar from "../Avatar";
import { shortenAddress } from "@/utils/shortenAddress";
import Energy from "./Energy";

interface Props {
  player: "player1" | "player2";
}

const Player = (props: Props) => {
  const { player } = props;

  const { game } = React.useContext(GameContext);

  if (!game) return null;

  const currentPlayer = game[player];

  // TODO: Get these mocks from server
  const AVATAR =
    "https://assets.iotabots.io/compressed/1.png?auto=format&fit=max&w=828";
  const HEALTH = 20;
  const MANA = 1;

  return (
    <Box sx={styles.root}>
      <Box sx={styles.avatar}>
        <Avatar avatar={AVATAR} />
      </Box>
      <Box ml={2}>
        <Typography variant="h6" fontWeight="bold" boxShadow={2}>
          {shortenAddress(currentPlayer)}
        </Typography>
        <Box sx={styles.energy}>
          <Energy type="health" value={HEALTH} />
          <Energy type="mana" value={MANA} />
        </Box>
      </Box>
    </Box>
  );
};

const styles = {
  root: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    height: 88,
    width: 88,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    "& .avatar": {
      transform: "scale(1.6)",
    },
  },
  energy: {
    display: "flex",
    flexDirection: "column",
    transform: "translateX(-10px)",
  },
};

export default Player;
