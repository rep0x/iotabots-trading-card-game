import React from "react";
import { Box, Typography } from "@mui/material";
import DeckBox from "./DeckBox";
import DividerSvg from "../../icons/DividerSvg";
import { CountCard, DECKS } from "../../mocks/deck";
import Button from "../Button";
import { CardsContext } from "@/context/CardsContext";
import { RouterOutputs, api } from "@/utils/api";
import { useRouter } from "next/router";
import { Prisma } from "@prisma/client";
import { CARDS } from "@/mocks/cards";

const Decks: React.FC = () => {
  const { setFormData, setFormActive } = React.useContext(CardsContext);
  const { data, isLoading } = api.decks.getAll.useQuery();
  console.log("data decks", data);

  if (!data) return null;

  interface MockCard {
    id: string;
    count: number;
  }

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

    setFormData(newCards as CountCard[]);
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
        <Typography>You dont have any decks yet.</Typography>
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
