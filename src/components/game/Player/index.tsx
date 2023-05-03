import React from "react";
import { Typography, Box } from "@mui/material";
import { useUser } from "@clerk/nextjs";

import { shortenAddress } from "@/utils/shortenAddress";
import { Player } from "@/types";

import Avatar from "../../Avatar";
import Energy from "./Energy";
import { api } from "@/utils/api";

interface Props {
  me: boolean;
  player: "player1Id" | "player2Id";
}

const Player = (props: Props) => {
  const { player, me } = props;
  const { data: game } = api.games.getGame.useQuery();
  const { user } = useUser();

  if (!game || !user) return null;

  const myPlayer = user.id === game.player1Id ? "player1" : "player2";
  const myOpponent = myPlayer === "player1" ? "player2" : "player1";

  const currentPlayer = (me
    ? game[myPlayer]
    : game[myOpponent]) as unknown as Player;

  const currentPlayerId = game[player];

  console.log(`${me ? "Is me" : "Is not me"}`);

  // TODO: Get these mocks from server
  const AVATAR =
    "https://assets.iotabots.io/compressed/1.png?auto=format&fit=max&w=828";

  return (
    <Box sx={styles.root}>
      <Box sx={styles.avatar}>
        <Avatar avatar={AVATAR} />
      </Box>
      <Box ml={2}>
        <Typography variant="h6" fontWeight="bold">
          {shortenAddress(currentPlayerId)}
        </Typography>
        <Box sx={styles.energy}>
          <Energy
            id={me ? "player" : "opponent"}
            type="health"
            value={currentPlayer.health}
          />
          <Energy
            id={me ? "player" : "opponent"}
            type="mana"
            value={currentPlayer.mana}
          />
        </Box>
      </Box>
    </Box>
  );
};

const styles = {
  root: {
    display: "flex",
    alignItems: "center",
    width: 340,
  },

  avatar: {
    height: 88,
    width: 88,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    "& .avatar": {
      transform: "scale(1.6) translateY(4px)",
    },
  },

  energy: {
    display: "flex",
    flexDirection: "column",
    transform: "translateX(-10px)",
  },
};

export default Player;
