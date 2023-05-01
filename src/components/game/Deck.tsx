import React from "react";
import { Box } from "@mui/material";
import { GameContext } from "@/context/GameContext";

interface Props {
  player: "player1Id" | "player2Id";
}

interface Player {
  mana: number;
  health: number;
  deck: string[];
}

const Deck = (props: Props) => {
  const { player } = props;
  const { game } = React.useContext(GameContext);

  if (!game) return null;

  const playerKey = player === "player1Id" ? "player1" : "player2";
  const currentPlayer = game[playerKey] as unknown as Player;

  const count = currentPlayer.deck.length;

  return <Box sx={styles.root}>Deck {count}</Box>;
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
