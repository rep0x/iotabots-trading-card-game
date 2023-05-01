import React from "react";
import { Box } from "@mui/material";
import { api } from "@/utils/api";
import { Player } from "@/types";
import Card from "./Card";

interface Props {
  me: boolean;
  player: "player1Id" | "player2Id";
}

const Hand = (props: Props) => {
  const { me, player } = props;
  const { data: game } = api.games.getGame.useQuery();

  if (!game) return null;
  const playerKey = player === "player1Id" ? "player1" : "player2";
  const currentPlayer = game[playerKey] as unknown as Player;

  return (
    <Box sx={styles.root} className={me ? "me" : "opponent"}>
      <Box sx={styles.grid}>
        {currentPlayer.hand.map((cardId, index) => (
          <Card key={index} index={index} id={cardId} me={me} />
        ))}
      </Box>
    </Box>
  );
};

export default Hand;

const styles = {
  root: {
    position: "relative",
    p: 2,
    textAlign: "center",
    borderRadius: 2,
    height: 140,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    "&.me": {
      mb: "-40px",
    },

    "&.opponent": {
      mt: "-40px",
      transform: "rotate(180deg)",
    },
  },

  grid: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    position: "absolute",
  },
  card: {
    height: 100,
    width: 70,
    bgcolor: "rgba(0,0,0,0.5)",
    backgroundSize: "contain",
  },
};