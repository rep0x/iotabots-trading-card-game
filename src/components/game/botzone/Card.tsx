import React from "react";
import { Box } from "@mui/material";
import Empty from "./Empty";
import { TRANSITIONS } from "@/theme";
import { ZoneCard } from "@/types";
import { GameContext } from "@/context/GameContext";
import { api } from "@/utils/api";
import AttackIcon from "./AttackIcon";
import { CARDS } from "@/mocks/cards";

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

  let hits: number[] = [1];

  if (myBoard && card.hits === 2) hits = [1, 2];

  return (
    <Box
      sx={{
        ...styles.root,
        cursor: canAttack || canDefend ? "pointer" : "default",
      }}
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
        {hits &&
          hits.map((hit) => (
            <AttackIcon
              key={`${hit}-${myBoard ? "player" : "opponent"}`}
              id={`${myBoard ? "player" : "opponent"}${index}-hit-${hit}`}
              active={selected}
            />
          ))}
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

    "& .empty": {
      transition: TRANSITIONS[180],
      opacity: 0.66,
    },

    "&.deployed": {
      "& .image": {
        transform: "rotate(0deg) scale(1)",
      },
    },

    "&.myboard": {
      "& .attack": {
        opacity: 0,
      },

      "&.attack": {
        "& .attack": {
          opacity: 1,
        },
      },

      "&.selected": {
        "& .attack": {
          color: "blue",
        },
      },
    },

    "&.opponentBoard": {
      "& .attack": {
        opacity: 0,
      },

      "&.defend": {
        "& .empty": {
          opacity: 1,
        },
        "&:hover": {
          "& .empty": {
            borderRadius: 4,
            boxShadow: "0px 0px 8px 4px #238FDEBF",
            opacity: 1,
          },
        },

        "& .attack": {
          bottom: 0,
          top: "auto",
          transform: "translateY(50%)",
          opacity: 1,
        },
      },
    },

    "&.selected": {
      "& .empty": {
        opacity: 1,
        boxShadow: "0px 0px 8px 4px #238FDEBF",
        borderRadius: 4,
      },
    },

    "&:hover": {
      "& .image": {
        transform: "rotate(0deg) scale(1)",
      },
      "& .attack-icon svg": {
        color: "#229BEC !important",
        "& .sword": {
          fill: "white",
        },
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
    transform: "rotate(90deg) scale(0.7)",
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
