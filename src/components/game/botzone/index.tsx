import React from "react";
import { Box } from "@mui/material";
import { api } from "@/utils/api";
import { useUser } from "@clerk/nextjs";
import { Player, ZoneCard } from "@/types";
import Card from "./Card";

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
  const zone = currentPlayer.zone;

  const fields = [0, 1, 2, 3, 4];

  return (
    <Box sx={styles.root}>
      <Box sx={styles.grid}>
        {fields.map((field) => {
          return (
            <Card key={field} index={field} card={zone[field]} myBoard={me} />
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
};
