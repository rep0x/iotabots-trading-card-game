import React from "react";
import { Typography, Box } from "@mui/material";

import StyledBox from "../StyledBox";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { TRANSITIONS } from "@/theme";
import { api } from "@/utils/api";

const Infos = () => {
  const { data: game } = api.games.getGame.useQuery();
  const [open, setOpen] = React.useState(false);

  if (!game) return null;

  const infos = [
    { label: "id", value: game.id },
    { label: "status", value: game.status },
    { label: "currentPlayer", value: game.currentPlayer },
    { label: "step", value: game.step },
    { label: "round", value: game.round },
    { label: "player1Id", value: game.player1Id },
    { label: "player2Id", value: game.player2Id },
  ];

  return (
    <Box>
      <Box sx={styles.infos} className={open ? "open" : ""}>
        <StyledBox>
          <Box display="flex" alignItems="center" mb={2}>
            <InfoRoundedIcon />
            <Typography variant="h5" fontSize="bold" ml={1}>
              Infos
            </Typography>
          </Box>
          {infos.map((info) => (
            <Box key={info.label} display="flex" justifyContent="space-between">
              <Typography mr={2}>{info.label}</Typography>
              <Typography>{info.value}</Typography>
            </Box>
          ))}
        </StyledBox>
      </Box>
      <Box
        sx={styles.button}
        onClick={() => setOpen(!open)}
        className={open ? "open" : ""}
      >
        {open ? <CloseRoundedIcon /> : <InfoRoundedIcon />}
      </Box>
    </Box>
  );
};

const styles = {
  infos: {
    position: "fixed",
    zIndex: 1000,
    top: 40,
    right: 40,
    opacity: 0,

    "&.open": {
      opacity: 1,
    },
  },
  button: {
    position: "fixed",
    zIndex: 1001,
    top: 32,
    right: 32,
    height: 40,
    width: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    bgcolor: "rgba(0,0,0,0.8)",
    borderRadius: 2,
    boxShadow: 1,
    cursor: "pointer",
    transition: TRANSITIONS[120],

    "& svg": {
      transition: TRANSITIONS[120],
    },

    "&.open": {
      bgcolor: "rgba(255,255,255,0.8)",
      borderRadius: "50%",
      transform: "rotate(180deg)",
      "& svg": {
        color: "background.paper",
      },
    },
  },
};

export default Infos;
