import React from "react";
import { Box, Typography } from "@mui/material";
import DeckBox from "./DeckBox";
import DividerSvg from "../../icons/DividerSvg";
import { DECKS } from "../../mocks/deck";
import Button from "../Button";
import { CardsContext } from "@/context/CardsContext";

const Decks: React.FC = () => {
  const { setFormActive } = React.useContext(CardsContext);

  return (
    <Box sx={styles.root}>
      <Box sx={styles.header}>
        <Typography variant="h5" mb={2}>
          My Decks
        </Typography>
        <DividerSvg />
      </Box>
      {!!DECKS &&
        DECKS.map((deck) => (
          <DeckBox {...deck} onClick={() => console.log("open deck")} />
        ))}
      {DECKS.length === 0 && (
        <Typography>You don't have any decks yet.</Typography>
      )}
      <Button
        sx={{ mt: 4 }}
        color="secondary"
        onClick={() => setFormActive(true)}
      >
        Create Deck
      </Button>
    </Box>
  );
};

const styles = {
  root: {
    bgcolor: "background.paper",
    border: "2px solid",
    borderColor: "text.primary",
    borderRadius: "8px",
    p: 5,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minWidth: 400,
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    mb: 2,
  },
};

export default Decks;
