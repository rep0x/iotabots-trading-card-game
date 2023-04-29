import React from "react";
import { Box, Typography } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

import { TRANSITIONS } from "@/theme";
import { RouterOutputs } from "@/utils/api";

type UserDeck = RouterOutputs["decks"]["getAll"][number];
interface Props extends UserDeck {
  onClick: () => void;
}

const DeckBox = (props: Props) => {
  const { name, onClick } = props;

  return (
    <Box onClick={onClick} sx={styles.root}>
      <Box className="name" sx={styles.header}>
        <Typography fontSize={18} fontWeight="bold">
          {name}
        </Typography>
      </Box>
      <Box className="edit" sx={styles.icon}>
        <ArrowForwardRoundedIcon />
      </Box>
    </Box>
  );
};

const styles = {
  root: {
    position: "relative",
    p: 3,
    width: "100%",
    height: 80,
    borderRadius: "8px",
    bgcolor: "rgba(0,0,0,.66)",
    border: "2px solid",
    borderColor: "secondary.main",
    overflow: "hidden",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    transition: TRANSITIONS[300],
    "&:hover": {
      "& .name": {
        left: 20,
        transform: "translate(0%,-50%)",
      },
      "& .edit": {
        opacity: 1,
      },
    },
  },
  header: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    transition: TRANSITIONS[300],
  },
  icon: {
    position: "absolute",
    top: "50%",
    right: 16,
    transform: "translate(0, -40%)",
    color: "text.primary",
    transition: TRANSITIONS[300],
    opacity: 0,
  },
};

export default DeckBox;
