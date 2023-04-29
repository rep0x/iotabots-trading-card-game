import React from "react";
import { Box, IconButton, Typography } from "@mui/material";

import ManaImage from "@/icons/Mana.png";
import MinusSvg from "@/icons/MinusSvg";
import PlusSvg from "@/icons/PlusSvg";
import { TRANSITIONS } from "@/theme";

interface DeckItemProps {
  id: string;
  mana: number;
  name: string;
  count: number;
  changeCount: (id: string, number: number) => void;
}

const DeckItem: React.FC<DeckItemProps> = (props) => {
  const { mana, name, count, id, changeCount } = props;

  return (
    <Box sx={styles.root}>
      <Box sx={styles.mana}>{mana}</Box>
      <Typography sx={styles.name}>{name}</Typography>

      <Box className="counter" sx={styles.actions}>
        <IconButton onClick={() => changeCount(id, -1)} sx={styles.button}>
          <MinusSvg />
        </IconButton>
        <Typography sx={styles.count}>{count}</Typography>
        <IconButton
          disabled={count === 3}
          onClick={() => changeCount(id, 1)}
          sx={styles.button}
        >
          <PlusSvg />
        </IconButton>
      </Box>
    </Box>
  );
};

const styles = {
  root: {
    display: "flex",
    alignItems: "center",
    p: 2,
    border: "1px solid",
    borderColor: "rgba(255,255,255,0.0)",
    borderRadius: "8px",

    "&:hover": {
      borderColor: "rgba(255,255,255,0.2)",
      bgcolor: "rgba(0,0,0,0.5)",
      "& .counter": {
        maxWidth: 95,
      },
    },
  },
  mana: {
    backgroundImage: `url(${ManaImage.src})`,
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    width: 44,
    height: 44,
    mr: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
  name: {
    flexGrow: 1,
    mr: 2,
    fontWeight: "bold",
  },
  actions: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    maxWidth: 30,
    transition: TRANSITIONS[120],
  },
  button: {
    transition: TRANSITIONS[120],
    opacity: 0.5,
    "&:hover": {
      opacity: 1,
      "& svg": {
        color: "white",
      },
    },
  },
  count: {
    bgcolor: "white",
    color: "background.paper",
    width: 24,
    height: 24,
    minWidth: 24,
    borderRadius: "50%",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
};

export default DeckItem;
