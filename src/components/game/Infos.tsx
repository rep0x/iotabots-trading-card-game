import React from "react";
import { Typography, Box } from "@mui/material";
import StyledBox from "../StyledBox";
import { GameContext } from "@/context/GameContext";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import DisabledByDefaultRoundedIcon from "@mui/icons-material/DisabledByDefaultRounded";

const Infos = () => {
  const { game } = React.useContext(GameContext);
  const [open, setOpen] = React.useState(false);

  if (!game) return null;

  const infos = [
    { label: "id", value: game.id },
    { label: "status", value: game.status },
    { label: "currentPlayer", value: game.currentPlayer },
    { label: "step", value: game.step },
    { label: "round", value: game.round },
    { label: "player1", value: game.player1 },
    { label: "player2", value: game.player2 },
  ];

  return (
    <Box>
      <Box sx={styles.root} className={open ? "open" : ""}>
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
      <Box sx={styles.button} onClick={() => setOpen(!open)}>
        {open ? <DisabledByDefaultRoundedIcon /> : <InfoRoundedIcon />}
      </Box>
    </Box>
  );
};

const styles = {
  root: {
    position: "fixed",
    top: 16,
    right: 16,
    opacity: 0,

    "&.open": {
      opacity: 1,
    },
  },
  button: {
    position: "fixed",
    top: 28,
    right: 28,
    height: 40,
    width: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    bgcolor: "rgba(0,0,0,0.8)",
    borderRadius: 2,
    boxShadow: 1,
  },
};

export default Infos;
