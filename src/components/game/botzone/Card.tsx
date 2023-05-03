import React from "react";
import { Box } from "@mui/material";
import Empty from "./Empty";
import { TRANSITIONS } from "@/theme";
import { ZoneCard } from "@/types";
import { GameContext } from "@/context/GameContext";
import { api } from "@/utils/api";

interface Props {
  index: number;
  card: ZoneCard | null;
  myBoard: boolean;
}

const Card = (props: Props) => {
  const { card, index, myBoard } = props;
  const { myTurn, attack, setAttack } = React.useContext(GameContext);
  const { data: game } = api.games.getGame.useQuery();

  if (!card || !game)
    return (
      <Box sx={styles.root}>
        <Empty />
      </Box>
    );

  const { image } = card;

  const onAttack = () => {
    if (myBoard) {
      setAttack({
        attacker: index,
        defender: null,
        player: false,
      });
    } else {
      if (attack.attacker !== null) {
        setAttack({
          ...attack,
          defender: index,
          player: false,
        });
      }
    }
  };

  return (
    <Box sx={styles.root}>
      <Empty />

      <Box
        sx={{
          ...styles.card,
          backgroundImage: `url(${image})`,
        }}
        onClick={myTurn && game.step === 2 ? onAttack : () => {}}
        className="image"
      />
    </Box>
  );
};

const styles = {
  root: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    "& svg": { opacity: 0.66 },

    "&:hover": {
      "& .image": {
        transform: "scale(1.2)",
      },
    },
  },
  card: {
    position: "absolute",
    height: 230,
    width: 164,
    bgcolor: "rgba(0,0,0,0.5)",
    backgroundSize: "contain",
    borderRadius: 2,
    boxShadow: 2,
    transition: TRANSITIONS[120],
  },
};

export default Card;
