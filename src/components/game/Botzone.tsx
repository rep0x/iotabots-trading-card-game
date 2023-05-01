import React from "react";
import { Box } from "@mui/material";
import { api } from "@/utils/api";
import { useUser } from "@clerk/nextjs";
import { Player } from "@/types";
import { CARDS } from "@/mocks/cards";

interface Props {
  me: boolean;
  player: "player1Id" | "player2Id";
}

const Botzone = (props: Props) => {
  const { me, player } = props;
  const { data: game } = api.games.getGame.useQuery();
  const { user } = useUser();

  if (!game || !user) return null;
  const playerKey = player === "player1Id" ? "player1" : "player2";
  const currentPlayer = game[playerKey] as unknown as Player;

  return (
    <Box sx={styles.root}>
      <Box sx={styles.grid}>
        {currentPlayer.zone.map((card, index) => {
          const image = CARDS[Number(card)].image;
          return (
            <Box
              key={index}
              sx={{
                ...styles.card,
                backgroundImage: `url(${image})`,
              }}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default Botzone;

const styles = {
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    p: 2,
    textAlign: "center",
    borderRadius: 2,
    width: "100%",
    flex: 1,
  },
  grid: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    position: "absolute",
  },
  card: {
    height: 200,
    width: 143,
    bgcolor: "rgba(0,0,0,0.5)",
    backgroundSize: "contain",
    borderRadius: 2,
    boxShadow: 2,
  },
};
