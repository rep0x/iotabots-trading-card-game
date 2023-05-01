import React from "react";
import { Box } from "@mui/material";
import { Player } from "@/types";
import { api } from "@/utils/api";

interface Props {
  me: boolean;
  player: "player1Id" | "player2Id";
}

const Deck = (props: Props) => {
  const { player, me } = props;
  const { data: game, refetch } = api.games.getGame.useQuery();

  if (!game) return null;

  const playerKey = player === "player1Id" ? "player1" : "player2";
  const currentPlayer = game[playerKey] as unknown as Player;

  const count = currentPlayer.deck.length;

  return (
    <Box sx={{ ...styles.root, cursor: me ? "pointer" : "default" }}>
      Deck {count}
    </Box>
  );
};

export default Deck;

const styles = {
  root: {
    bgcolor: "rgba(0,0,0,0.5)",
    p: 2,
    textAlign: "center",
    borderRadius: 2,
    width: "100%",
  },
};
