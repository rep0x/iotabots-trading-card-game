import React from "react";
import { Prisma } from "@prisma/client";
import { Box, Typography } from "@mui/material";

import { CardsContext } from "@/context/CardsContext";
import { RouterOutputs, api } from "@/utils/api";
import { CARDS } from "@/mocks/cards";
import DividerSvg from "@/icons/DividerSvg";
import { CountCard } from "@/mocks/deck";
import Button from "@/components/Button";

import DeckBox from "./DeckBox";

const Decks: React.FC = () => {
  const { setFormData, setFormActive } = React.useContext(CardsContext);
  const { data } = api.decks.getAll.useQuery();

  if (!data) return null;

  type Deck = RouterOutputs["decks"]["getAll"][number];
  const openDeck = (deck: Deck) => {
    const cards = deck.cards as Prisma.JsonArray;

    const newCards = cards.map((card) => {
      const test = card as {
        id: string;
        count: number;
      };
      if (!test) return null;
      const mockCard = CARDS[Number(test.id) - 1];
      return {
        ...mockCard,
        count: test.count,
      };
    });

    if (!newCards) return null;

    setFormData({
      name: deck.name,
      cards: newCards as CountCard[],
    });
    setFormActive(true);
  };

  return (
    <Box sx={styles.root}>
      <Box sx={styles.header}>
        <Typography variant="h5" mb={2}>
          My Decks
        </Typography>
        <DividerSvg />
      </Box>
      {data &&
        data.map((deck) => (
          <DeckBox key={deck.id} {...deck} onClick={() => openDeck(deck)} />
        ))}
      {data.length === 0 && (
        <Typography color="text.secondary">
          You dont have any decks yet.
        </Typography>
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
    bgcolor: "rgba(0,0,0,.66)",
    border: "2px solid",
    borderColor: "secondary.main",
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
