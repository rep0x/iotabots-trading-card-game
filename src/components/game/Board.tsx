import React from "react";
import { Box, Button } from "@mui/material";

import Player from "./Player";
import { useUser } from "@clerk/nextjs";
import { GameContext } from "@/context/GameContext";
import Deck from "./Deck";
import Hand from "./Hand";
import Junk from "./Junk";
import Botzone from "./Botzone";
import Surrender from "./Surrender";

interface Props {
  player: "player1" | "player2";
}

const Board = (props: Props) => {
  const { player } = props;
  const { user } = useUser();
  const { game } = React.useContext(GameContext);

  if (!game || !user) return null;

  const isMe = game[player] === user.id;

  return (
    <Box sx={styles.root} className={isMe ? "me" : "opponent"}>
      <Box sx={styles.left} className="column">
        <Player player={player} />
        <Deck />
        {!!isMe && <Surrender />}
      </Box>
      <Box sx={styles.center} className="column">
        <Hand me={isMe} />
        <Botzone />
      </Box>
      <Box sx={styles.right} className="column">
        <Junk />
      </Box>
    </Box>
  );
};

const styles = {
  root: {
    flex: 1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 4,

    "& .column": {
      display: "flex",
      flexDirection: "column",
      gap: 4,
      height: "100%",
    },

    "&.me": {
      alignItems: "flex-end",

      "& .column": {
        flexDirection: "column-reverse",
      },
    },
  },
  left: {
    width: 340,
  },
  center: {
    flex: 1,
  },
  right: {
    width: 340,
  },
};

export default Board;