import React from "react";
import { Box } from "@mui/material";
import Empty from "./Empty";
import { TRANSITIONS } from "@/theme";
import { ZoneCard } from "@/types";
import { GameContext } from "@/context/GameContext";
import { api } from "@/utils/api";
import AttackIcon from "./AttackIcon";

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

  const canAttack =
    game.step === 2 && myBoard && card.deployed && card.hits > 0;

  const canDefend = game.step === 2 && !myBoard && attack.attacker !== null;

  const selected = game.step === 2 && myBoard && index === attack.attacker;

  const onAttack = () => {
    if (canAttack) {
      setAttack({
        attacker: index,
        defender: null,
        player: false,
      });
    }
    if (canDefend) {
      setAttack({
        ...attack,
        defender: index,
        player: false,
      });
    }
  };

  return (
    <Box
      sx={styles.root}
      className={`
        ${myBoard ? "myboard" : "opponentBoard"}
        ${card.deployed ? "deployed" : ""} 
        ${canAttack ? "attack" : ""}
        ${canDefend ? "defend" : ""}
        ${selected ? "selected" : ""}
      `}
    >
      <Empty />

      <Box sx={styles.attacks} className="attack">
        {card.hits >= 1 && <AttackIcon />}
        {card.hits >= 2 && <AttackIcon />}
      </Box>

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

    "& .image": {
      transform: "rotate(90deg) scale(0.7)",
    },

    "&.deployed": {
      "& .image": {
        transform: "rotate(0deg) scale(1)",
      },
    },

    "& .empty": { opacity: 0.66 },

    "&.myboard": {
      "& .attack": {
        opacity: 0,
      },

      "&.attack": {
        "& .attack": {
          opacity: 1,
        },
      },
    },

    "&.opponentBoard": {
      "& .attack": {
        opacity: 0,
      },

      "&.defend": {
        "& .attack": {
          bottom: 0,
          top: "auto",
          transform: "translateY(50%)",
          opacity: 1,
        },
      },
    },

    "&:hover": {
      "& .image": {
        transform: "rotate(0deg) scale(1.2)",
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
  attacks: {
    position: "absolute",
    zIndex: 10,
    top: 0,
    transform: "translateY(-50%)",
    display: "flex",
    gap: 1,
  },
};

export default Card;
