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

  const isCurrentPlayer = playerKey === game.currentPlayer;
  const canPlay = (game.step === 1 || game.step === 3) && isCurrentPlayer;

  return (
    <Box
      sx={styles.root}
      className={`${me ? "me" : "opponent"} ${canPlay ? "active" : ""}`}
    >
      <Box sx={styles.gradient} className="gradient" />
      <Box className="hand" sx={styles.grid}>
        {currentPlayer.hand.map((card, index) => (
          <Card key={index} index={index} id={card} me={me} />
        ))}
      </Box>
    </Box>
  );
};

export default Hand;

const styles = {
  root: {
    position: "relative",
    zIndex: 100,
    p: 2,
    textAlign: "center",
    borderRadius: 2,
    height: 140,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    "&.active": {
      "& .gradient": {
        background:
          "radial-gradient(50% 50% at 50% 50%, rgba(38, 238, 176, .66) 0%, rgba(40, 255, 189, 0) 100%);",
      },
    },

    "&.me": {
      mb: "-60px",
    },

    "&.opponent": {
      mt: "-60px",
      transform: "rotate(180deg) translateY(20px)",
    },
  },

  grid: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    mb: 6,
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "150%",
    width: "100%",
    transform: "translateY(0%)",
  },
};
